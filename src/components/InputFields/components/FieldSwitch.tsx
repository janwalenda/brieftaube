import { FieldType } from "@/components/Base/types/FieldType";
import TextBlockField from "./TextBlockField";
import ImageField from "./ImageField";
import type { Field } from "@/components/Base/types/Field";
import SortableItem from "@/components/Base/components/SortableItem";
import { useTranslate } from "@/hooks/useTranslate";

export default function FieldSwitch({ type, id }: Field & { index: number}) {
  const { t } = useTranslate();
  switch (type) {
    case FieldType.TextBlock:
      return (
        <SortableItem id={id}>
          <TextBlockField fieldId={id} key={id} />
        </SortableItem>
      );
    case FieldType.Image:
      return (
        <SortableItem id={id}>
          <ImageField fieldId={id} key={id} legend={t('image-field.legend')} />
        </SortableItem>
      );
    default:
      return null;
  }
}