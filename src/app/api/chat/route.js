import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const messagesTruncated = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join("\n"),
    );

    const { userId } = auth();

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log("Knowledge yang relevan: ", relevantNotes);

    const systemMessage = {
      role: "system",
      content:
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes. If in their notes there is a link that related to a note than put the link in the answers too." +
        "The relevant notes for this query are:\n" +
        relevantNotes
          .map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`)
          .join("\n\n") +
        "If you cannot find the relevant notes for the query, then answer with: 'Maaf, sepertinya saya tidak memiliki jawaban yang tepat untuk pertanyaan Anda saat ini. Apakah anda masih ingin bertanya hal lain?'" +
        "If you still cannot find the relevant notes for the query, at least in 2 times then answer with: 'Mohon maaf atas keterbatasan informasi yang dapat kami berikan. Untuk bantuan lebih lanjut, mohon hubungi admin kami melalui WhatsApp untuk informasi yang lebih detail.'",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
