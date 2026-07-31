"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { IoPencil, IoTrash } from "react-icons/io5";
import { InputVariant } from "@/types/inputVariant";
import { InputSize } from "@/types/inputSize";
import type { TemplateKey } from "@/types/TemplateKey";

interface TemplateKeyListItemProps {
  templateKey: TemplateKey;
  onEdit: () => void;
  onDelete: () => void;
}

export function TemplateKeyListItem({
  templateKey,
  onEdit,
  onDelete,
}: TemplateKeyListItemProps) {
  const t = useTranslations();
  const required = templateKey.required ?? true;

  return (
    <div className="flex items-center justify-between gap-2 rounded-field bg-base-200 p-2">
      <div>
        <p className="font-medium">{templateKey.label}</p>
        <p className="text-xs text-base-content/60">
          {t(`templating.types.${templateKey.type}`)}
          {" · {{"}
          {templateKey.id}
          {"}}"}
          {required && ` · ${t("templating.modal.requiredField")}`}
        </p>
      </div>
      <div className="flex gap-1">
        <Button
          size={InputSize.XS}
          variant={InputVariant.Neutral}
          onClick={onEdit}
        >
          <IoPencil />
        </Button>
        <Button
          size={InputSize.XS}
          variant={InputVariant.Neutral}
          onClick={onDelete}
        >
          <IoTrash />
        </Button>
      </div>
    </div>
  );
}
