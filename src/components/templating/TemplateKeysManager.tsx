"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaKey } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { InputVariant } from "@/types/inputVariant";
import { InputForm } from "@/types/inputForm";
import { TooltipPosition } from "@/types/tooltipPosition";
import { useField } from "@/hooks/useField";
import type { TemplateKey } from "@/types/TemplateKey";
import { TemplateKeyModal } from "./TemplateKeyModal";
import { TemplateKeyListItem } from "./TemplateKeyListItem";

export function TemplateKeysManager() {
  const t = useTranslations();
  const { mail, removeKey } = useField();
  const listRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLDialogElement>(null);
  const [editingKey, setEditingKey] = useState<TemplateKey | null>(null);

  const keys = mail.keys ?? [];

  function openCreate() {
    setEditingKey(null);
    formRef.current?.showModal();
  }

  function openEdit(key: TemplateKey) {
    setEditingKey(key);
    formRef.current?.showModal();
  }

  return (
    <>
      <Button
        variant={InputVariant.Primary}
        modifier={InputForm.Circle}
        onClick={() => listRef.current?.showModal()}
        className="rounded-full"
        tooltip={{
          content: t("templating.manager.tooltip"),
          placement: TooltipPosition.Top,
        }}
      >
        <FaKey className="size-4" />
      </Button>

      <Modal title={t("templating.manager.title")} ref={listRef}>
        <div className="space-y-2">
          {keys.length === 0 && (
            <p className="text-sm text-base-content/60">
              {t("templating.manager.empty")}
            </p>
          )}
          {keys.map((key) => (
            <TemplateKeyListItem
              key={key.id}
              templateKey={key}
              onEdit={() => openEdit(key)}
              onDelete={() => removeKey(key.id)}
            />
          ))}
          <Button
            variant={InputVariant.Secondary}
            onClick={openCreate}
            className="w-full"
          >
            {t("templating.manager.add")}
          </Button>
        </div>
      </Modal>

      <TemplateKeyModal
        ref={formRef}
        editingKey={editingKey}
        onSaved={() => formRef.current?.close()}
      />
    </>
  );
}
