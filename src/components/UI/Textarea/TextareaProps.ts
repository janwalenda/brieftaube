"use client";
import { MDEditorProps } from "@uiw/react-md-editor";
import { InputVariant } from "../Shared/InputVariant";

export type TextareaProps = MDEditorProps & {
  variant?: InputVariant;
  tooltip?: string;
};
