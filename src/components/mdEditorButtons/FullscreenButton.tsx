"use client";
import { FaExpand } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";
import { commands } from "@uiw/react-md-editor";

export function FullscreenButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    <FaExpand />
  </EditorButton>;
}
