"use client"
import { IoClipboard, IoCode, IoDownload, IoColorPalette } from "react-icons/io5";
import { IoMdPaper } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useField } from "@/hooks/useField";
import { useTranslations } from "next-intl";
import Dock from "@/components/ui/dock";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { Modal, ModalAction } from "@/components/ui/modal";
import { InputForm } from "@/types/inputForm";
import { TooltipPosition } from "@/types/tooltipPosition";
import { Link } from "@/i18n/navigation";

export default function ActionDock() {
  const [html, setHTML] = useState<string>("");
  const { renderHTML } = useField();
  const t = useTranslations();

  const htmlRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Dock>
        <Button
          variant={InputVariant.Primary}
          modifier={InputForm.Circle}
          onClick={handleHTMLClick}
          className="rounded-full"
          tooltip={{
            content: t("dock.code"),
            placement: TooltipPosition.Top,
          }}
        >
          <IoCode className="size-4" />
        </Button>
        <Button
          variant={InputVariant.Primary}
          modifier={InputForm.Circle}
          onClick={handlePreviewClick}
          className="rounded-full"
          tooltip={{
            content: t("dock.preview.tooltip"),
            placement: TooltipPosition.Top,
          }}
        >
          <IoMdPaper className="size-4" />
        </Button>
        <Link href="/design">
          <Button
            variant={InputVariant.Primary}
            modifier={InputForm.Circle}
            className="rounded-full"
            tooltip={{
              content: t("design.tooltip"),
              placement: TooltipPosition.Top,
            }}
          >
            <IoColorPalette className="size-4" />
          </Button>
        </Link>
      </Dock>
      <Modal title={t("dock.copy.title")} ref={htmlRef} className="max-w-full md:max-w-3/4 lg:max-w-2/3">
        <div className="mockup-code w-full mb-4">
          <div className="p-4 flex flex-row items-center justify-between">
            <code>
              {html}
            </code>
          </div>
        </div>
        <ModalAction>
          <Button variant={InputVariant.Primary}
            title={t("copy")}
            onClick={handleCopyClick}
            tooltip={{
              content: t("copy"),
              placement: TooltipPosition.Top,
            }}
          >
            <IoClipboard />
          </Button>
          <Button variant={InputVariant.Secondary}
            title={t("download")}
            onClick={() => {
              const anchor = document.createElement("a");
              const emailBlob = new Blob([`data:message/rfc822 eml,\nSubject: Mail\nX-Unsent: 1\nContent-Type: text/html;charset="utf-8"\n\n${html}`], {
                type: "message/rfc822"
              });
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
      <Modal title={t("dock.preview.title")} ref={previewRef} className="max-w-full md:max-w-3/4 lg:max-w-2/3">
        <div className="sm:mockup-window bg-base-100 sm:border border-base-200">
          <div className="sm:p-4">
            <iframe srcDoc={html} className="w-full h-[80vh] border-0" title="E-Mail Vorschau" />
          </div>
        </div>
      </Modal>
    </>
  )

  function handleCopyClick() {
    navigator.clipboard.writeText(html);
  }

  function handleHTMLClick() {
    const generatedHTML = renderHTML();
    setHTML(generatedHTML);

    if (htmlRef.current) {
      htmlRef.current.showModal();
    }
  }

  function handlePreviewClick() {
    const generatedHTML = renderHTML();
    setHTML(generatedHTML);

    if (previewRef.current) {
      previewRef.current.showModal();
    }

  }
}
