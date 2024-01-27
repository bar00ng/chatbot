"use client";

import AddEditNoteDialog from "@/components/AddEditNoteDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  UserButton,
  auth,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import AIChatButton from "@/components/AIChatButton";

export default function NavBar() {
  const { userId } = useAuth();
  const { theme } = useTheme();

  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-bold">Chatbot AI</span>
          </Link>

          <div className="flex items-center gap-2">
            {userId && (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    avatarBox: { width: "2.5rem", height: "2.5rem" },
                  },
                }}
              />
            )}
            <ThemeToggleButton />
            {userId && (
              <Button onClick={() => setShowAddEditNoteDialog(true)}>
                <Plus size={20} className="mr-2" />
                Add Knowledge
              </Button>
            )}
            <AIChatButton />
          </div>
        </div>
      </div>

      <AddEditNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      />
    </>
  );
}
