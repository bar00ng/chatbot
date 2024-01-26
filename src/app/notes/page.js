import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export default async function NotesPage() {
  const { userId } = auth();

  // if (!userId) throw Error("userId undefined");

  const allNotes = await prisma.note.findMany();

  return (
    // TODO : FIX Note visibility for user and admin
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {userId ? (
        // Check user id terlebih dahulu sebelum melakukan map pada allNotes
        allNotes.length > 0 ? (
          // Map jika userId benar dan allNotes tidak kosong
          allNotes.map((note) => <Note note={note} key={note.id} />)
        ) : (
          // Tampilkan pesan jika userId benar tapi allNotes kosong
          <div className="col-span-full text-center">
            {"Knowledge database masih kosong"}
          </div>
        )
      ) : (
        // Tampilkan pesan jika userId salah atau tidak ada
        <div className="col-span-full text-center">{"Hello, guest!"}</div>
      )}
    </div>
  );
}
