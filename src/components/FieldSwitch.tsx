"use client";
import type { Field } from "@/types/Field";
import SortableItem from "@/components/ui/sortableItem";
import { componentRegistry } from "@/config/componentRegistry";
import { useTranslations } from "next-intl";
import AddButton from "./AddButton";

export default function FieldSwitch({ type, id, index }: Field & { index: number }) {
  const t = useTranslations();
  const registryItem = componentRegistry[type];

  if (!registryItem) {
    return null;
  }

  const Component = registryItem.component;

  return (
    <>
      <SortableItem itemId={id}>
        <Component fieldId={id} legend={t(registryItem.labelKey)} />
      </SortableItem>
      <AddButton index={index + 1} />
    </>
  );
}
