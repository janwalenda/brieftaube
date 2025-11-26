"use client";
import { FaQuestion } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";
import { commands } from "@uiw/react-md-editor";

export function HelpButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    <FaQuestion />
  </EditorButton>;
}
