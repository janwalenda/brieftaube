"use client"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { SortableItemProps } from "@/types/sortableItemProps";

export default function SortableItem({
  itemId: id,
  children
}: SortableItemProps) {
  const {
    attributes,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children}
    </div>
  )
}