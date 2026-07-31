"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaKey } from "react-icons/fa6";
import { type commands } from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { InputSize } from "@/types/inputSize";
import { useField } from "@/hooks/useField";
import { toPlaceholder } from "@/helpers/templateKeys";
import type { TemplateKey } from "@/types/TemplateKey";
import { TemplateKeyPickerModal } from "./TemplateKeyPickerModal";
import { TemplateKeyModal } from "./TemplateKeyModal";

export function TemplateKeyInsertButton({
  executeCommand,
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void;
  command: commands.ICommand<string>;
}) {
  const t = useTranslations();
  const { mail } = useField();
  const pickerRef = useRef<HTMLDialogElement>(null);
  const createRef = useRef<HTMLDialogElement>(null);
  const [pendingInsert, setPendingInsert] = useState(false);

  function insert(id: string) {
    executeCommand({
      name: "insertTemplateKey",
      execute: (_state, api) => api.replaceSelection(toPlaceholder(id)),
    });
    pickerRef.current?.close();
  }

  function handleCreated(id: string) {
    if (pendingInsert) insert(id);
    setPendingInsert(false);
    createRef.current?.close();
  }

  return (
    <>
      <Button
        buttonStyle={InputVariant.Ghost}
        className="md:btn-sm"
        size={InputSize.XS}
        onClick={() => pickerRef.current?.showModal()}
        tooltip={{ content: t("templating.insertButton.tooltip") }}
      >
        <FaKey />
      </Button>
      <TemplateKeyPickerModal
        ref={pickerRef}
        keys={mail.keys ?? []}
        onSelect={(key: TemplateKey) => insert(key.id)}
        onCreateNew={() => {
          setPendingInsert(true);
          pickerRef.current?.close();
          createRef.current?.showModal();
        }}
      />
      <TemplateKeyModal ref={createRef} onSaved={handleCreated} />
    </>
  );
}
