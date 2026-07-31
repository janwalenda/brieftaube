"use client";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import type { TemplateKeyType } from "@/types/TemplateKey";

export interface TemplateKeyFormValues {
  label: string;
  type: TemplateKeyType;
  required: boolean;
  defaultValue: string;
}

interface TemplateKeyFormProps {
  values: TemplateKeyFormValues;
  onChange: (values: TemplateKeyFormValues) => void;
}

export function TemplateKeyForm({ values, onChange }: TemplateKeyFormProps) {
  const t = useTranslations();

  function update(patch: Partial<TemplateKeyFormValues>) {
    onChange({ ...values, ...patch });
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="key-label">{t("templating.modal.labelField")}</Label>
        <Input
          id="key-label"
          value={values.label}
          onChange={(event) => update({ label: event.target.value })}
          placeholder={t("templating.modal.labelPlaceholder")}
          className="mt-1 w-full"
        />
      </div>
      <div>
        <Label htmlFor="key-type">{t("templating.modal.typeField")}</Label>
        <Select
          id="key-type"
          value={values.type}
          onChange={(event) =>
            update({ type: event.target.value as TemplateKeyType })
          }
          className="mt-1 w-full"
        >
          <option value="text">{t("templating.types.text")}</option>
          <option value="date">{t("templating.types.date")}</option>
          <option value="url">{t("templating.types.url")}</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="key-default">
          {t("templating.modal.defaultField")}
        </Label>
        <Input
          id="key-default"
          value={values.defaultValue}
          onChange={(event) => update({ defaultValue: event.target.value })}
          className="mt-1 w-full"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={values.required}
          onChange={(event) => update({ required: event.target.checked })}
        />
        {t("templating.modal.requiredField")}
      </label>
    </div>
  );
}
