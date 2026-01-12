import { FieldType } from "@/types/FieldType";
import { IoAdd, IoImage, IoText } from "react-icons/io5";
import TextBlockField from "@/components/TextBlockField";
import ImageField from "@/components/ImageField";
import ButtonField from "@/components/ButtonField";
import { TextBlockStyle } from "@/types/TextBlockStyle";
import { ImageWidth } from "@/types/ImageWidth";
import type { Field, ImageField as ImageFieldType, TextBlock as TextBlockType, ButtonField as ButtonFieldType } from "@/types/Field";
import type { IconType } from "react-icons";
import type { ComponentType } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";

export interface ComponentRegistryItem {
  type: FieldType;
  labelKey: string;
  icon: IconType;
  component: ComponentType<{ fieldId: UniqueIdentifier, legend?: React.ReactNode }>;
  create: (id: number) => Field;
}

export const componentRegistry: Record<FieldType, ComponentRegistryItem> = {
  [FieldType.TextBlock]: {
    type: FieldType.TextBlock,
    labelKey: 'fab.textblock',
    icon: IoText,
    component: TextBlockField,
    create: (id: number) => ({
      id,
      type: FieldType.TextBlock,
      style: TextBlockStyle.Default,
      content: 'Schreib was du willst',
    } as TextBlockType),
  },
  [FieldType.Image]: {
    type: FieldType.Image,
    labelKey: 'fab.image',
    icon: IoImage,
    component: ImageField,
    create: (id: number) => ({
      id,
      type: FieldType.Image,
      url: 'https://placehold.co/600x150/000000/ffffff?text=Kein+Bild+angegeben',
      width: ImageWidth.SM,
    } as ImageFieldType),
  },
  [FieldType.Button]: {
    type: FieldType.Button,
    labelKey: 'fab.button', // Ensure this translation key exists or is added
    icon: IoAdd,
    component: ButtonField,
    create: (id: number) => ({
      id,
      type: FieldType.Button,
      content: 'Button Text',
      href: '#',
    } as ButtonFieldType),
  },
};
