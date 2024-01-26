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

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 4,
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
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes." +
        "The relevant notes for this query are:\n" +
        relevantNotes
          .map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`)
          .join("\n\n") +
        "If you can find the notes related with the question. look for the link inside of the notes, if you found the link inside the note, then you must put the link after the answer, and the link must be clickable. " +
        "And make sure each time you answer, ask if the answer is clear enough with this text: 'Apakah informasi yang saya berikan sudah jelas?'" +
        "And if the user answer with something positive such as 'Yes', 'Y','Ya', etc say thank you for it." +
        "There is three emergency contact: first, named Jakarta and the number is 08123456789. Second, named Bekasi and the number is 0987654321. Third, named Tangerang and the number is 13578024579." +
        "If the user answer with somethin negative such as 'No', 'N', 'Tidak', etc or you cannot give a correct answer for more than 2 times say:'Mohon maaf atas keterbatasan informasi yang dapat kami berikan. Untuk bantuan lebih lanjut, mohon hubungi admin kami melalui WhatsApp untuk informasi yang lebih detail.' and make sure to add the emergency contact after the text, The format for the emergency contact is: name - number and a linebreak after each emergency contact " +
        "If you cannot find the relevant notes for the query, then answer with: 'Maaf, sepertinya saya tidak memiliki jawaban yang tepat untuk pertanyaan Anda saat ini. Apakah anda masih ingin bertanya hal lain?'",
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
