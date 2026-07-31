"use client";
import MarkdownEditor, {
  commands,
  type MDEditorProps as MarkdownEditorProps,
} from "@uiw/react-md-editor";
import { type CSSProperties, type HTMLAttributes } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { editorCommands } from "@/config/editorCommands";
import { cn } from "@/lib/utils";
import { renderMdToolbarButton } from "@/components/mdEditorButtons/renderToolbarButton";

export type MDEditorProps = MarkdownEditorProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value"
  > & {};

export default function MDEditor({
  components,
  className,
  ...props
}: MDEditorProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <MarkdownEditor
      style={
        {
          "--md-editor-background-color": "var(--color-base-100)",
          color: "color-mix(in oklab, currentcolor 50%, transparent)",
          borderRadius: "var(--radius-field)",
          boxShadow: "0",
        } as CSSProperties
      }
      commands={editorCommands}
      extraCommands={[commands.fullscreen]}
      className={cn(
        `
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
      `,
        className,
      )}

      preview="edit"
      components={{
        textarea: (props) => {
          return (
            <textarea
              className="h-full"
              {...(props as HTMLAttributes<HTMLTextAreaElement>)}
            />
          );
        },
        toolbar: (command, disabled, executeCommand) =>
          renderMdToolbarButton({ command, disabled, executeCommand }),
        ...components,
      }}
      {...props}
    />
  );
}
