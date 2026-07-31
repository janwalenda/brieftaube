"use client";

import { useTranslations } from "next-intl";
import { Modal, ModalAction } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { IoClipboard, IoDownload } from "react-icons/io5";
import { forwardRef } from "react";
import { useHtmlModalActions } from "@/hooks/useHtmlModalActions";

interface HtmlModalProps {
  html: string;
}

export const HtmlModal = forwardRef<HTMLDialogElement, HtmlModalProps>(
  ({ html }, ref) => {
    const t = useTranslations();
    const { handleCopyClick, handleDownloadClick } = useHtmlModalActions(html);

    return (
      <Modal
        title={t("dock.copy.title")}
        ref={ref}
        className="max-w-full md:max-w-3/4 lg:max-w-2/3"
      >
        <div className="mockup-code w-full mb-4">
          <div className="p-4 flex flex-row items-center justify-between">
            <code>{html}</code>
          </div>
        </div>
        <ModalAction>
          <Button
            variant={InputVariant.Primary}
            title={t("copy")}
            onClick={handleCopyClick}
            tooltip={{
              content: t("copy"),
              placement: TooltipPosition.Top,
            }}
          >
            <IoClipboard />
          </Button>
          <Button
            variant={InputVariant.Secondary}
            title={t("download")}
            onClick={handleDownloadClick}
            tooltip={{
              content: t("download"),
              placement: TooltipPosition.Top,
            }}
          >
            <IoDownload />
          </Button>
        </ModalAction>
      </Modal>
    );
  },
);

HtmlModal.displayName = "HtmlModal";
