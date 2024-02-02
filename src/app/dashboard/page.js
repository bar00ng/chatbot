import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export default async function NotesPage() {
  const { userId } = auth();

  return (
    // TODO : FIX Note visibility for user and admin
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {userId ? (
        // Check user id terlebih dahulu sebelum melakukan map pada allNotes
        <div className="col-span-full text-center">{"Hello, admin!"}</div>
      ) : (
        // Tampilkan pesan jika userId salah atau tidak ada
        <div className="col-span-full text-center">{"Hello, guest!"}</div>
      )}
    </div>
  );
}
