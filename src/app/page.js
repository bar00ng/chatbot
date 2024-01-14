import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <main className="flex flex-col items-center h-screen justify-center gap-5">
      <div className="flex items-center gap-4">
        <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">
          Chatbot AI
        </span>
      </div>

      <Button size="lg" asChild>
        <Link href="/notes">Start</Link>
      </Button>
    </main>
  );
}
