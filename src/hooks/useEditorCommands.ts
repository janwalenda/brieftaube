"use client";

import { useSession } from "@/lib/auth-client";
import { editorCommands, guestEditorCommands } from "@/config/editorCommands";

export function useEditorCommands() {
  const { data: session } = useSession();
  return session?.user ? editorCommands : guestEditorCommands;
}
