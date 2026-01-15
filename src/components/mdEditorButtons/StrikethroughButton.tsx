"use client";
import { FaStrikethrough } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";
import { type commands } from "@uiw/react-md-editor";

export function StrikethroughButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    <FaStrikethrough />
  </EditorButton>;
}
