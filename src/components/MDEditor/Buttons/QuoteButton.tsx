"use client";
import { commands } from "@uiw/react-md-editor";
import { FaQuoteRight } from "react-icons/fa6";
import { EditorButton } from "./EditorButton";

export function QuoteButton({ command, executeCommand, disabled }: { command: commands.ICommand<string>; disabled: boolean; executeCommand: (command: commands.ICommand<string>, name?: string) => void; }) {
  return <EditorButton
    command={command} disabled={disabled} executeCommand={executeCommand}
  >
    <FaQuoteRight />
  </EditorButton>;
}
