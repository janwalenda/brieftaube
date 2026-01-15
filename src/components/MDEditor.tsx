"use client"
import MarkdownEditor, { commands, type MDEditorProps as MarkdownEditorProps } from "@uiw/react-md-editor"
import { type CSSProperties, type HTMLAttributes, useEffect } from "react"
import { ItalicButton } from "@/components/mdEditorButtons/ItalicButton"
import { BoldButton } from "@/components/mdEditorButtons/BoldButton"
import { HRButton } from "@/components/mdEditorButtons/HRButton"
import { HeadingButton } from "@/components/mdEditorButtons/HeadingButton"
import { LinkButton } from "@/components/mdEditorButtons/LinkButton"
import { StrikethroughButton } from "@/components/mdEditorButtons/StrikethroughButton"
import { QuoteButton } from "@/components/mdEditorButtons/QuoteButton"
import { CodeButton } from "@/components/mdEditorButtons/CodeButton"
import { ImageButton } from "@/components/mdEditorButtons/ImageButton"
import { TableButton } from "@/components/mdEditorButtons/TableButton"
import { ListButton } from "@/components/mdEditorButtons/ListButton"
import { HelpButton } from "@/components/mdEditorButtons/HelpButton"
import { FullscreenButton } from "@/components/mdEditorButtons/FullscreenButton"
import { editorCommands } from "@/config/editorCommands"
import { useState } from "react"
import { cn } from "@/lib/utils"

export type MDEditorProps = MarkdownEditorProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> & {

}

export default function MDEditor({
  components,
  className,
  commands: incomingCommands,
  ...props
}: MDEditorProps) {
  if (incomingCommands) {
    editorCommands.push(...incomingCommands)
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, []);

  if (!isClient) {
    return null
  }

  return (
    <MarkdownEditor
      style={{
        "--md-editor-background-color": "var(--color-base-100)",
        "color": "color-mix(in oklab, currentcolor 50%, transparent)",
        borderRadius: "var(--radius-field)",
        boxShadow: "0",
      } as CSSProperties}
      commands={editorCommands}
      extraCommands={[
        commands.fullscreen
      ]}
      className={cn(`
        [&>.w-md-editor-bar]:pr-4
        [&_.w-md-editor-toolbar]:!border-none
        [&_.w-md-editor-toolbar]:!bg-base-200
        [&_.w-md-editor-toolbar]:!rounded-field
        [&_.w-md-editor-toolbar>ul>li>div]:!p-0
        [&_.w-md-editor-toolbar>ul]:menu 
        [&_.w-md-editor-toolbar>ul]:menu-horizontal
        [&_.w-md-editor-toolbar>ul]:bg-base-200
        [&_.w-md-editor-toolbar>ul]:mt-6
        [&_.w-md-editor-text]:h-full
        [&_.w-md-editor-text]:text-base-content
      `, className)}

      preview="edit"
      components={{
        textarea: (props) => {
          return <textarea className="h-full" {...props as HTMLAttributes<HTMLTextAreaElement>} />;
        },
        toolbar: (command, disabled, executeCommand) => {
          switch (command.name) {
          case "bold":
            return (
              <BoldButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "italic":
            return (
              <ItalicButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "strikethrough":
            return (
              <StrikethroughButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "hr":
            return (
              <HRButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "title":
            return (
              <HeadingButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "link":
            return (
              <LinkButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "quote":
            return (
              <QuoteButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "code":
            return (
              <CodeButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "image":
            return (
              <ImageButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "table":
            return (
              <TableButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "list":
            return (
              <ListButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "help":
            return (
              <HelpButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          case "fullscreen":
            return (
              <FullscreenButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          }
        },
        ...components,
      }} {...props} />
  )
}
