"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { forwardRef } from "react";

interface PreviewModalProps {
  html: string;
}

export const PreviewModal = forwardRef<HTMLDialogElement, PreviewModalProps>(({ html }, ref) => {
  const t = useTranslations();

  return (
    <Modal title={t("dock.preview.title")} ref={ref} className="max-w-full md:max-w-3/4 lg:max-w-2/3">
      <div className="sm:mockup-window bg-base-100 sm:border border-base-200">
        <div className="sm:p-4">
          <iframe srcDoc={html} className="w-full h-[80vh] border-0" title="E-Mail Vorschau" />
        </div>
      </div>
    </Modal>
  );
});

PreviewModal.displayName = "PreviewModal";
