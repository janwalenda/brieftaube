"use client";
import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalAction } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { IoClipboard, IoEye } from "react-icons/io5";
import type { Mail } from "@/types/Mail";
import { useFillTemplate } from "@/hooks/useFillTemplate";
import { FillTemplateForm } from "./FillTemplateForm";
import { FillTemplatePreview } from "./FillTemplatePreview";

interface FillTemplateModalProps {
  mail: Mail | null;
}

export const FillTemplateModal = forwardRef<
  HTMLDialogElement,
  FillTemplateModalProps
>(({ mail }, ref) => {
  const t = useTranslations();
  const {
    keys,
    values,
    setValues,
    missing,
    preview,
    handlePreview,
    handleCopy,
  } = useFillTemplate(mail);

  return (
    <Modal
      title={t("templating.fill.title")}
      ref={ref}
      className="max-w-full md:max-w-3/4 lg:max-w-2/3"
    >
      <FillTemplateForm
        keys={keys}
        values={values}
        onChange={setValues}
        missing={missing}
      />
      {preview && <FillTemplatePreview html={preview} />}
      <ModalAction>
        <Button variant={InputVariant.Secondary} onClick={handlePreview}>
          <IoEye className="size-4" /> {t("templating.fill.preview")}
        </Button>
        <Button variant={InputVariant.Primary} onClick={handleCopy}>
          <IoClipboard className="size-4" /> {t("templating.fill.copy")}
        </Button>
      </ModalAction>
    </Modal>
  );
});

FillTemplateModal.displayName = "FillTemplateModal";
