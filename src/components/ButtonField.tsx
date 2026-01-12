"use client"
import { useField } from "@/hooks/useField";
import { UniqueIdentifier } from "@dnd-kit/core";
import Field from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { TooltipPosition } from "@/types/tooltipPosition";

export default function ButtonField({
  fieldId: id,
  legend,
}: {
  fieldId: UniqueIdentifier;
  legend?: React.ReactNode;
}) {
  const { setFieldProperty, getFieldProperty } = useField();
  const t = useTranslations();

  return (
    <Field legend={legend || "Button"} fieldId={id}>
      <Input
        className="w-full"
        value={getFieldProperty(id, 'content')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldProperty(id, 'content', event.target.value)}
        placeholder="Button Text"
        tooltip={{
          content: t('button-field.tooltip'),
          placement: TooltipPosition.Left
        }}
      />
      <Input
        className="w-full"
        value={getFieldProperty(id, 'href')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldProperty(id, 'href', event.target.value)}
        placeholder="Button Link"
        tooltip={{
          content: t('button-field.tooltip'),
          placement: TooltipPosition.Left
        }}
      />
    </Field>
  )
}