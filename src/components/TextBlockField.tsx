"use client"
import { useField } from "@/hooks/useField";
import { type UniqueIdentifier } from "@dnd-kit/core";
import Field from "@/components/ui/field";
import Select from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function TextBlockField({
  fieldId: id,
}: {
  fieldId: UniqueIdentifier;
}) {
  const { setFieldProperty, getFieldProperty } = useField();
  const t = useTranslations();

  return (
    <Field legend="Text Block" fieldId={id}>
      <Select tooltip={{
        content: "Style",
      }} value={getFieldProperty(id, "style")} onChange={(event) => setFieldProperty(id, "style", event.target.value)}>
        <option value="default">{t("text-block.style.default")}</option>
        <option value="signature">{t("text-block.style.signatur")}</option>
        <option value="disclaimer">{t("text-block.style.disclaimer")}</option>
      </Select>
      <Textarea
        className="w-full"
        value={getFieldProperty(id, "content")}
        preview="edit"
        onChange={(value) => setFieldProperty(id, "content", value || "")}
        tooltip={{ content: t("text-block.textarea") }}
      />
    </Field>
  )
}
