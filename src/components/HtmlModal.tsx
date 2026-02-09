"use client";

import { useTranslations } from "next-intl";
import { Modal, ModalAction } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { IoClipboard, IoDownload } from "react-icons/io5";
import { forwardRef } from "react";

interface HtmlModalProps {
  html: string;
}

export const HtmlModal = forwardRef<HTMLDialogElement, HtmlModalProps>(({ html }, ref) => {
  const t = useTranslations();

  async function setClipboard(text: string) {
    const type = "text/html";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);

    await navigator.clipboard.write([clipboardItem]);
  }

  function handleCopyClick() {
    setClipboard(html).catch((error) => {
      console.error("Failed to copy HTML:", error);
    });
  }

  return (
    <Modal title={t("dock.copy.title")} ref={ref} className="max-w-full md:max-w-3/4 lg:max-w-2/3">
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
          onClick={() => {
            const anchor = document.createElement("a");
            const emailBlob = new Blob(
              [`data:message/rfc822 eml,\nSubject: Mail\nX-Unsent: 1\nContent-Type: text/html;charset="utf-8"\n\n${html}`],
              {
                type: "message/rfc822",
              }
            );
            const url = URL.createObjectURL(emailBlob);

            anchor.href = url;
            anchor.download = "email.eml";

            document.body.appendChild(anchor);

            anchor.click();
            anchor.remove();
          }}
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
});

HtmlModal.displayName = "HtmlModal";
