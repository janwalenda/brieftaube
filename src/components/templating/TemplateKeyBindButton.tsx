"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaKey } from "react-icons/fa6";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { InputForm } from "@/types/inputForm";
import { useField } from "@/hooks/useField";
import { PLACEHOLDER_RE, toPlaceholder } from "@/helpers/templateKeys";
import type { TemplateKey } from "@/types/TemplateKey";
import { TemplateKeyPickerModal } from "./TemplateKeyPickerModal";
import { TemplateKeyModal } from "./TemplateKeyModal";

interface TemplateKeyBindButtonProps {
  fieldId: UniqueIdentifier;
  property: "url" | "content" | "href";
}

export function TemplateKeyBindButton({
  fieldId,
  property,
}: TemplateKeyBindButtonProps) {
  const t = useTranslations();
  const { mail, getFieldProperty, setFieldProperty } = useField();
  const pickerRef = useRef<HTMLDialogElement>(null);
  const createRef = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);

  const currentValue = (getFieldProperty(fieldId, property) ?? "").trim();
  const isBound = new RegExp(`^${PLACEHOLDER_RE.source}$`).test(currentValue);

  function bind(id: string) {
    setFieldProperty(fieldId, property, toPlaceholder(id));
    pickerRef.current?.close();
  }

  function handleCreated(id: string) {
    if (pending) bind(id);
    setPending(false);
    createRef.current?.close();
  }

  return (
    <>
      <Button
        variant={isBound ? InputVariant.Primary : InputVariant.Neutral}
        modifier={InputForm.Circle}
        onClick={() => pickerRef.current?.showModal()}
        tooltip={{ content: t("templating.bindButton.tooltip") }}
      >
        <FaKey />
      </Button>
      <TemplateKeyPickerModal
        ref={pickerRef}
        keys={mail.keys ?? []}
        onSelect={(key: TemplateKey) => bind(key.id)}
        onCreateNew={() => {
          setPending(true);
          pickerRef.current?.close();
          createRef.current?.showModal();
        }}
        onClear={
          isBound
            ? () => {
                setFieldProperty(fieldId, property, "");
                pickerRef.current?.close();
              }
            : undefined
        }
      />
      <TemplateKeyModal ref={createRef} onSaved={handleCreated} />
    </>
  );
}
