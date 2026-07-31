"use client";
import { useField } from "@/hooks/useField";
import { type UniqueIdentifier } from "@dnd-kit/core";
import Field from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { TooltipPosition } from "@/types/tooltipPosition";
import LoggedIn from "@/components/LoggedIn";
import { TemplateKeyBindButton } from "@/components/templating/TemplateKeyBindButton";

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
      <div className="flex gap-2 w-full items-center">
        <Input
          className="w-full"
          value={getFieldProperty(id, "content")}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldProperty(id, "content", event.target.value)
          }
          placeholder="Button Text"
          tooltip={{
            content: t("button-field.tooltip"),
            placement: TooltipPosition.Left,
          }}
        />
        <LoggedIn>
          <TemplateKeyBindButton fieldId={id} property="content" />
        </LoggedIn>
      </div>
      <div className="flex gap-2 w-full items-center">
        <Input
          className="w-full"
          value={getFieldProperty(id, "href")}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldProperty(id, "href", event.target.value)
          }
          placeholder="Button Link"
          tooltip={{
            content: t("button-field.tooltip"),
            placement: TooltipPosition.Left,
          }}
        />
        <LoggedIn>
          <TemplateKeyBindButton fieldId={id} property="href" />
        </LoggedIn>
      </div>
    </Field>
  );
}
