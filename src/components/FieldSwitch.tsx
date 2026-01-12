import { FieldType } from "@/types/FieldType";
import TextBlockField from "./TextBlockField";
import ImageField from "./ImageField";
import type { Field } from "@/types/Field";
import SortableItem from "@/components/ui/sortableItem";
import { useTranslations } from "next-intl";

export default function FieldSwitch({ type, id }: Field & { index: number }) {
  const t = useTranslations();
  switch (type) {
    case FieldType.TextBlock:
      return (
        <SortableItem itemId={id}>
          <TextBlockField fieldId={id} key={id} />
        </SortableItem>
      );
    case FieldType.Image:
      return (
        <SortableItem itemId={id}>
          <ImageField fieldId={id} key={id} legend={t('image-field.legend')} />
        </SortableItem>
      );
    default:
      return null;
  }
}