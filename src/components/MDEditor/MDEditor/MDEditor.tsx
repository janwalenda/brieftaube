"use client"
import MarkdownEditor, {commands, MDEditorProps as MarkdownEditorProps} from "@uiw/react-md-editor"
import { CSSProperties, HTMLAttributes } from "react"
import cx from "classnames"
import { ItalicButton } from "../Buttons/ItalicButton"
import { BoldButton } from "../Buttons/BoldButton"
import { HRButton } from "../Buttons/HRButton"
import { HeadingButton } from "../Buttons/HeadingButton"
import { LinkButton } from "../Buttons/LinkButton"
import { StrikethroughButton } from "../Buttons/StrikethroughButton"
import { QuoteButton } from "../Buttons/QuoteButton"
import { CodeButton } from "../Buttons/CodeButton"
import { ImageButton } from "../Buttons/ImageButton"
import { TableButton } from "../Buttons/TableButton"
import { ListButton } from "../Buttons/ListButton"
import { HelpButton } from "../Buttons/HelpButton"
import { FullscreenButton } from "../Buttons/FullscreenButton"
import { editorCommands } from "./editorCommands"

type MDEditorProps = MarkdownEditorProps & {

}

export default function MDEditor({
  components,
  className,
  commands: incomingCommands,

  ...props
}: MDEditorProps) {
  if(incomingCommands) {
    editorCommands.push(...incomingCommands)
  }

  return (
    <MarkdownEditor 
      style={{
        '--md-editor-background-color': 'var(--color-base-100)',
        'color': 'color-mix(in oklab, currentcolor 50%, transparent)',
        borderRadius: 'var(--radius-field)',
        boxShadow: '0',
      } as CSSProperties}
      commands={editorCommands}
      extraCommands={[
        commands.fullscreen
      ]}
      className={cx([
        '[&>.w-md-editor-bar]:pr-4',
        '[&_.w-md-editor-toolbar]:!border-none',
        '[&_.w-md-editor-toolbar]:!bg-base-200',
        '[&_.w-md-editor-toolbar]:!rounded-field', 
        '[&_.w-md-editor-text]:h-full',
        '[&_.w-md-editor-text]:text-base-content',
        className
      ])}
      preview="edit"
      components={{
        textarea: (props) => {
          return <textarea className="h-full" {...props as HTMLAttributes<HTMLTextAreaElement>} />;
        },
        toolbar: (command, disabled, executeCommand) => {
          switch(command.name) {
            case 'bold':
              return (
                <BoldButton command={command} disabled={disabled} executeCommand={executeCommand} />
              )
            case 'italic':
              return (
                <ItalicButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'strikethrough':
              return (
                <StrikethroughButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'hr':
              return (
                <HRButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'title':
              return (
                <HeadingButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'link':
              return (
                <LinkButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'quote':
              return (
                <QuoteButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'code':
              return (
                <CodeButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'image':
              return (
                <ImageButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'table':
              return (
                <TableButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'list':
              return (
                <ListButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'help':
              return (
                <HelpButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
            case 'fullscreen':
              return (
                <FullscreenButton command={command} disabled={disabled} executeCommand={executeCommand} />
            )
          }
        },
        ...components,
    }} {...props}>
    
    </MarkdownEditor>
  )
}
