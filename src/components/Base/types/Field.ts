import type { FieldType } from "./FieldType";
import type { ImageWidth } from "../../../types/ImageWidth";
import { UniqueIdentifier } from "@dnd-kit/core";

interface BaseField {
  id: UniqueIdentifier;
  type: FieldType;
}

export interface ListField extends BaseField {
    id: UniqueIdentifier;
    type: FieldType.List;
    title?: string;
    content?: string;
}

export interface FooterField extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.Footer;
  name?: string;
  position?: string;
  disclaimer?: string;
}

export interface TextBlock extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.TextBlock;
  title?: string;
  content?: string;
  contentHTML?: string;
}

export interface ImageField extends BaseField {
  id: UniqueIdentifier;
  type: FieldType.Image;
  url?: string;
  width?: ImageWidth;
}

export type FieldKeys = keyof ImageField | keyof ListField | keyof FooterField | keyof TextBlock;

export type Field = ListField | TextBlock | ImageField | FooterField;
