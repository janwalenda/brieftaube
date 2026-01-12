"use client";
import { UniqueIdentifier } from "@dnd-kit/core";

export type SortableItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  itemId: UniqueIdentifier;
  children: React.ReactNode;
};
