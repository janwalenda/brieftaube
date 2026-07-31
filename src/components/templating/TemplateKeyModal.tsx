"use client";
import { forwardRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalAction } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { useField } from "@/hooks/useField";
import type { TemplateKey } from "@/types/TemplateKey";
import { TemplateKeyForm, type TemplateKeyFormValues } from "./TemplateKeyForm";

const emptyValues: TemplateKeyFormValues = {
  label: "",
  type: "text",
  required: true,
  defaultValue: "",
};

interface TemplateKeyModalProps {
  editingKey?: TemplateKey | null;
  onSaved?: (id: string) => void;
}

export const TemplateKeyModal = forwardRef<
  HTMLDialogElement,
  TemplateKeyModalProps
>(({ editingKey, onSaved }, ref) => {
  const t = useTranslations();
  const { addKey, updateKey } = useField();
  const [values, setValues] = useState<TemplateKeyFormValues>(emptyValues);

  useEffect(() => {
    setValues(
      editingKey
        ? {
            label: editingKey.label,
            type: editingKey.type,
            required: editingKey.required ?? true,
            defaultValue: editingKey.defaultValue ?? "",
          }
        : emptyValues,
    );
  }, [editingKey]);

  function handleSave() {
    if (!values.label.trim()) return;

    if (editingKey) {
      updateKey(editingKey.id, values);
      onSaved?.(editingKey.id);
    } else {
      const id = addKey(values);
      onSaved?.(id);
    }
    setValues(emptyValues);
  }

  return (
    <Modal
      title={
        editingKey
          ? t("templating.modal.editTitle")
          : t("templating.modal.createTitle")
      }
      ref={ref}
    >
      <TemplateKeyForm values={values} onChange={setValues} />
      <ModalAction>
        <Button
          variant={InputVariant.Primary}
          onClick={handleSave}
          disabled={!values.label.trim()}
        >
          {t("templating.modal.save")}
        </Button>
      </ModalAction>
    </Modal>
  );
});

TemplateKeyModal.displayName = "TemplateKeyModal";
