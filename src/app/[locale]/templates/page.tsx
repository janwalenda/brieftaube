"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useTemplatesList } from "@/hooks/useTemplatesList";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplatesEmptyState } from "@/components/templates/TemplatesEmptyState";
import { TemplatesHeader } from "@/components/templates/TemplatesHeader";
import { FillTemplateModal } from "@/components/templating/FillTemplateModal";

export default function TemplatesPage() {
  const t = useTranslations("templates");
  const fillRef = useRef<HTMLDialogElement>(null);
  const {
    isPending,
    loading,
    error,
    templates,
    fillMail,
    handleDelete,
    handleLoad,
    handleFill,
  } = useTemplatesList();

  async function openFill(templateId: string) {
    await handleFill(templateId);
    fillRef.current?.showModal();
  }

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-3xl">
      <div className="w-full max-w-4xl">
        <TemplatesHeader title={t("title")} />

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {templates.length === 0 ? (
          <TemplatesEmptyState />
        ) : (
          <div className="space-y-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onLoad={() => handleLoad(template.id)}
                onFill={() => openFill(template.id)}
                onDelete={() => handleDelete(template.id)}
              />
            ))}
          </div>
        )}
      </div>
      <FillTemplateModal mail={fillMail} ref={fillRef} />
    </div>
  );
}
