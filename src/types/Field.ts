import type { FieldType } from "./FieldType";
import type { ImageWidth } from "./ImageWidth";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TextBlockStyle } from "./TextBlockStyle";

interface BaseField {
  id: UniqueIdentifier;
  type: FieldType;
}

export interface TextBlock extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.TextBlock;
  style?: TextBlockStyle;
  content?: string;
}

export interface ImageField extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.Image;
  url?: string;
  width?: ImageWidth;
}

export interface ButtonField extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.Button;
  content?: string;
  href?: string;
}

export type FieldKeys = keyof ImageField | keyof TextBlock | keyof ButtonField;

export type Field = TextBlock | ImageField | ButtonField;
