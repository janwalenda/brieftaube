"use client"
import { IoCode, IoSave, IoColorPalette, IoRefresh } from "react-icons/io5";
import { IoMdPaper } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useField } from "@/hooks/useField";
import { useTranslations } from "next-intl";
import Dock from "@/components/ui/dock";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { InputForm } from "@/types/inputForm";
import { TooltipPosition } from "@/types/tooltipPosition";
import { Link } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import { saveTemplate } from "@/actions/templates";
import LoggedIn from "./LoggedIn";
import { Spinner } from "./ui/spinner";
import { HtmlModal } from "./HtmlModal";
import { PreviewModal } from "./PreviewModal";
import { SaveModal } from "./SaveModal";

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
      <HtmlModal html={html} ref={htmlRef} />
      <PreviewModal html={html} ref={previewRef} />
      <SaveModal
        templateName={templateName}
        setTemplateName={setTemplateName}
        onSave={() => handleSaveTemplate()}
        loading={saveLoading}
        message={saveMessage}
        ref={saveRef}
      />
    </>
  )
}
