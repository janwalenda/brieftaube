"use client";
import { type commands } from "@uiw/react-md-editor";
import { EditorButton } from "./EditorButton";

export function HRButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    -
  </EditorButton>;
}
