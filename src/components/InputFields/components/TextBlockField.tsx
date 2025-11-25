"use client"
import { useField } from "../../../hooks/useField";
import { Field, Select, Textarea} from "@/components/UI"
import { UniqueIdentifier } from "@dnd-kit/core";
import { useTranslate } from "@/hooks/useTranslate";

export default function TextBlockField({
  fieldId: id,
}: {
  fieldId: UniqueIdentifier;
}) {
  const { setFieldProperty, getFieldProperty } = useField();
  const { t } = useTranslate();

  return (
    <Field legend="Text Block" fieldId={id}>
      <Select tooltip="Style" value={getFieldProperty(id, 'style')} onChange={(event) => setFieldProperty(id, 'style', event.target.value)}>
        <option value="default">{t('text-block.style.default')}</option>
        <option value="signature">{t('text-block.style.signatur')}</option>
        <option value="disclaimer">{t('text-block.style.disclaimer')}</option>
      </Select>
      <Textarea
        className="w-full"
        value={getFieldProperty(id, 'content')}
        preview="edit"
        onChange={(value) => setFieldProperty(id, 'content', value || "")}
        tooltip={t('text-block.textarea')}
      >
      </Textarea>
    </Field>
  )
}