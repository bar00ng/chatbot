import { Button } from "@/components/ui/button";
import { SignInButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <main className="relative flex h-screen flex-col items-center justify-center gap-5">
      {/* Gambar dengan ukuran satu halaman */}
      <div className="absolute inset-0">
        <Image
          src="/images/LandingPageBg.jpeg"
          alt="Esa Unggul University"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Esa Unggul Chatbot
        </span>
      </div>

      <div className="relative z-10">
        <SignInButton>
          <Button size="lg">Sign In</Button>
        </SignInButton>
      </div>
    </main>
  );
}
