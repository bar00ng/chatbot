import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />

      {/* Tambahkan tautan ke /notes */}
      <Link href="/notes" className="text-blue-500 hover:underline">
        Lanjutkan sebagai user
      </Link>
    </div>
  );
}
