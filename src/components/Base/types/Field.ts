import type { FieldType } from "./FieldType";
import type { ImageWidth } from "../../../types/ImageWidth";
import { UniqueIdentifier } from "@dnd-kit/core";

interface BaseField {
  id: UniqueIdentifier;
  type: FieldType;
}

export interface TextBlock extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.TextBlock;
  title?: string;
  content?: string;
}

export interface ImageField extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.Image;
  url?: string;
  width?: ImageWidth;
}

export type FieldKeys = keyof ImageField | keyof TextBlock;

export type Field = TextBlock | ImageField;
