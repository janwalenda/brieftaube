import { FieldType } from "@/components/Base/types/FieldType";
import TextBlockField from "./TextBlockField";
import ImageField from "./ImageField";
import type { Field } from "@/components/Base/types/Field";
import SortableItem from "@/components/Base/components/SortableItem";
import { useTranslate } from "@/hooks/useTranslate";

export default function FieldSwitch({ type, id, index }: Field & { index: number}) {
  const { t } = useTranslate();
  switch (type) {
    case FieldType.TextBlock:
      return (
        <SortableItem id={id}>
          <TextBlockField id={id} key={id} />
        </SortableItem>
      );
    case FieldType.Image:
      return (
        <SortableItem id={id}>
          <ImageField id={id} key={id} legend={t('image-field.legend')} />
        </SortableItem>
      );
    default:
      return null;
  }
}