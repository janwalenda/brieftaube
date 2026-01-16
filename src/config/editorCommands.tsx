"use client";
import { commands } from "@uiw/react-md-editor";

export const editorCommands = [
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.hr,
  commands.group([
    commands.heading1,
    commands.heading2,
    commands.heading3,
    commands.heading4,
    commands.heading5,
    commands.heading6
  ], {
    name: "title",
    groupName: "title",
    buttonProps: { "aria-label": "Insert title" }
  }),
  commands.divider,
  commands.link,
  commands.quote,
  commands.code,
  commands.image,
  commands.table,
  commands.divider,
  commands.group([
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
  ], {
    name: "list",
    groupName: "list",
    buttonProps: { "aria-label": "Insert list" }
  }),
  commands.divider,
  commands.help,
];
