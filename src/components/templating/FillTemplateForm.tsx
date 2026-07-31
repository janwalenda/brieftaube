"use client";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { TemplateKey } from "@/types/TemplateKey";

interface FillTemplateFormProps {
  keys: TemplateKey[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  missing: string[];
}

function inputType(keyType: TemplateKey["type"]) {
  if (keyType === "date") return "date";
  if (keyType === "url") return "url";
  return "text";
}

export function FillTemplateForm({
  keys,
  values,
  onChange,
  missing,
}: FillTemplateFormProps) {
  const t = useTranslations();

  if (keys.length === 0) {
    return (
      <p className="text-sm text-base-content/60">
        {t("templating.fill.noKeys")}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {keys.map((key) => {
        const isMissing = missing.includes(key.id);
        return (
          <div key={key.id}>
            <Label htmlFor={`fill-${key.id}`}>
              {key.label}
              {(key.required ?? true) && " *"}
            </Label>
            <Input
              id={`fill-${key.id}`}
              type={inputType(key.type)}
              value={values[key.id] ?? ""}
              onChange={(event) =>
                onChange({ ...values, [key.id]: event.target.value })
              }
              className="mt-1 w-full"
              variant={isMissing ? "error" : undefined}
            />
            {isMissing && (
              <p className="text-xs text-error mt-1">
                {t("templating.fill.required")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
