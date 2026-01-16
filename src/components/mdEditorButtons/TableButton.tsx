"use client";
import { type commands } from "@uiw/react-md-editor";
import { FaTable } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";

export function TableButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    <FaTable />
  </EditorButton>;
}
