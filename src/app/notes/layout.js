"use client";

import Image from "next/image";
import NavBar from "./NavBar";
import { Button } from "@/components/ui/button";
import { BadgePlus, Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "@/components/AddEditNoteDialog";

export default function Layout({ children }) {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  return (
    <>
      <main className="relative m-auto max-w-full p-4">
        <NavBar />
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/images/HomeBg.jpeg"
            alt="Esa Unggul University"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 mt-16 text-white">{children}</div>
      </main>

      <div className="fixed bottom-0 left-0 z-20 w-full max-w-[500px] p-1 xl:right-36">
        <Button size="icon_lg" onClick={() => setShowAddEditNoteDialog(true)}>
          <Plus size={20} />
        </Button>
      </div>

      <AddEditNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      />
    </>
  );
}
