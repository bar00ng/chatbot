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
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <span className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Chatbot
        </span>
        <span className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Universitas Esa Unggul
        </span>
      </div>

      <div className="relative z-10">
        <Link href="/dashboard">
          <Button size="lg">
            <span className="text-white">Masuk</span>
          </Button>
        </Link>
      </div>

      <div className="relative z-10">
        <SignInButton className="text-white hover:underline">
          Lanjutkan sebagai admin
        </SignInButton>
      </div>
    </main>
  );
}
