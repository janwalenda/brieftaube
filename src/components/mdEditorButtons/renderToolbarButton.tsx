"use client";
import { type commands } from "@uiw/react-md-editor";
import { BoldButton } from "./BoldButton";
import { ItalicButton } from "./ItalicButton";
import { StrikethroughButton } from "./StrikethroughButton";
import { HRButton } from "./HRButton";
import { HeadingButton } from "./HeadingButton";
import { LinkButton } from "./LinkButton";
import { QuoteButton } from "./QuoteButton";
import { CodeButton } from "./CodeButton";
import { ImageButton } from "./ImageButton";
import { TableButton } from "./TableButton";
import { ListButton } from "./ListButton";
import { HelpButton } from "./HelpButton";
import { FullscreenButton } from "./FullscreenButton";

type ToolbarButtonProps = {
  command: commands.ICommand<string>;
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void;
};

export function renderMdToolbarButton({
  command,
  disabled,
  executeCommand,
}: ToolbarButtonProps) {
  const props = { command, disabled, executeCommand };

  switch (command.name) {
    case "bold":
      return <BoldButton {...props} />;
    case "italic":
      return <ItalicButton {...props} />;
    case "strikethrough":
      return <StrikethroughButton {...props} />;
    case "hr":
      return <HRButton {...props} />;
    case "title":
      return <HeadingButton {...props} />;
    case "link":
      return <LinkButton {...props} />;
    case "quote":
      return <QuoteButton {...props} />;
    case "code":
      return <CodeButton {...props} />;
    case "image":
      return <ImageButton {...props} />;
    case "table":
      return <TableButton {...props} />;
    case "list":
      return <ListButton {...props} />;
    case "help":
      return <HelpButton {...props} />;
    case "fullscreen":
      return <FullscreenButton {...props} />;
  }
}
