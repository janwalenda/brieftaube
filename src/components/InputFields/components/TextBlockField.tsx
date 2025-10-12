"use client"
import { useField } from "../../../hooks/useField";
import { ChangeEvent, useRef } from "react";
import { Field, Input, Textarea} from "@/components/Base"
import { UniqueIdentifier } from "@dnd-kit/core";
import { useTranslate } from "@/hooks/useTranslate";
import { IoText } from "react-icons/io5";

export default function TextBlockField({
  fieldId: id,
}: {
  fieldId: UniqueIdentifier;
}) {
  const { setFieldProperty, getFieldProperty } = useField();
  const { t } = useTranslate();
  const outputRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldProperty(id, 'title' , e.target.value);
  }

  return (
    <Field legend="Text Block" fieldId={id}>
      <Input className="w-full" 
        startIcon={<IoText />}
        value={getFieldProperty(id, 'title')} 
        onChange={handleTitleChange} 
        tooltip={t('text-block.heading')}
      />
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