"use client"
import { IoClipboard, IoCode, IoDownload, IoSave, IoColorPalette, IoRefresh } from "react-icons/io5";
import { IoMdPaper } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useField } from "@/hooks/useField";
import { useTranslations } from "next-intl";
import Dock from "@/components/ui/dock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputVariant } from "@/types/inputVariant";
import { Modal, ModalAction } from "@/components/ui/modal";
import { InputForm } from "@/types/inputForm";
import { TooltipPosition } from "@/types/tooltipPosition";
import { Link } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import { saveTemplate } from "@/actions/templates";
import LoggedIn from "./LoggedIn";
import { Spinner } from "./ui/spinner";

export interface ActionDockProps {
  mode: "create" | "edit";
}

export default function ActionDock({ mode }: ActionDockProps) {
  const [html, setHTML] = useState<string>("");
  const { renderHTML, mail, templateId, resetMail } = useField();
  const t = useTranslations();
  const { data: session } = useSession();

  const htmlRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  const saveRef = useRef<HTMLDialogElement>(null);

  const [isClient, setIsClient] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  async function handleSaveTemplate(name?: string) {
    const templateNameToUse = name || templateName;

    // In create mode, we need a name. In edit mode, we don't.
    if (mode === "create" && !templateNameToUse.trim()) return;

    setSaveLoading(true);
    setSaveMessage(null);

    // If mode is edit, we update the existing template (templateId must be present)
    // If mode is create, we create a new one (pass undefined as id)
    const idToUpdate = mode === "edit" ? templateId : undefined;

    const result = await saveTemplate(templateNameToUse, mail, idToUpdate ?? undefined);

    if (result.error) {
      setSaveMessage({ type: "error", text: result.error });
      setSaveLoading(false);
      return;
    }

    setSaveMessage({ type: "success", text: t("dock.save.success") });
    if (mode === "create") {
      setTemplateName("");
    }
    setTimeout(() => {
      saveRef.current?.close();
      setSaveMessage(null);
    }, 1500);

    setSaveLoading(false);
  }

  async function handleSaveClick() {
    if (!session?.user) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }

    // Edit mode: save directly
    if (mode === "edit" && templateId) {
      await handleSaveTemplate();
      return;
    }

    // Create mode: always show modal
    saveRef.current?.showModal();
  }

  function handleReset() {
    if (confirm(t("dock.resetConfirm"))) {
      resetMail();
    }
  }

  return (
    <>
      <Dock>
        {mode === "create" && (
          <Button
            variant={InputVariant.Neutral}
            modifier={InputForm.Circle}
            onClick={handleReset}
            className="rounded-full"
            tooltip={{
              content: t("dock.resetTooltip"),
              placement: TooltipPosition.Top,
            }}
          >
            <IoRefresh className="size-4" />
          </Button>
        )}
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
        <LoggedIn>
          <Button
            variant={InputVariant.Primary}
            modifier={InputForm.Circle}
            onClick={handleSaveClick}
            className="rounded-full"
            tooltip={{
              content: t("dock.save.tooltip"),
              placement: TooltipPosition.Top,
            }}
          >
            {saveLoading ? <Spinner /> : <IoSave className="size-4" />}
          </Button>
        </LoggedIn>
        <Link href={mode === "edit" ? `/templates/${templateId}/design` : "/design"}>
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
      <Modal title={t("dock.save.title")} ref={saveRef}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="template-name">{t("dock.save.nameLabel")}</Label>
            <Input
              id="template-name"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder={t("dock.save.namePlaceholder")}
              disabled={saveLoading}
              className="mt-1"
            />
          </div>
          {saveMessage && (
            <div className={`alert ${saveMessage.type === "success" ? "alert-success" : "alert-error"}`}>
              <span>{saveMessage.text}</span>
            </div>
          )}
        </div>
        <ModalAction>
          <Button
            variant={InputVariant.Primary}
            onClick={() => handleSaveTemplate()}
            disabled={saveLoading || !templateName.trim()}
          >
            {saveLoading ? (
              <Spinner />
            ) : (
              <>
                <IoSave className="size-4 mr-1" />
                {t("dock.save.button")}
              </>
            )}
          </Button>
        </ModalAction>
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
