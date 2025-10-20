"use client";
import { commands } from "@uiw/react-md-editor";
import { FaHeading } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";

export function HeadingButton({
  disabled, executeCommand, command
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
}) {
  return <EditorButton
    command={command}
    disabled={disabled}
    executeCommand={executeCommand}
  >
    <FaHeading />
  </EditorButton>;
}
