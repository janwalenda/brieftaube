"use client";
import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import type { TemplateKey } from "@/types/TemplateKey";
import { TemplateKeyPickerMenu } from "./TemplateKeyPickerMenu";

interface TemplateKeyPickerModalProps {
  keys: TemplateKey[];
  onSelect: (key: TemplateKey) => void;
  onCreateNew: () => void;
  onClear?: () => void;
}

export const TemplateKeyPickerModal = forwardRef<
  HTMLDialogElement,
  TemplateKeyPickerModalProps
>(function TemplateKeyPickerModal(
  { keys, onSelect, onCreateNew, onClear },
  ref,
) {
  const t = useTranslations();

  return (
    <Modal title={t("templating.picker.title")} ref={ref}>
      <TemplateKeyPickerMenu
        keys={keys}
        onSelect={onSelect}
        onCreateNew={onCreateNew}
        onClear={onClear}
      />
    </Modal>
  );
});
