"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useField } from "@/hooks/useField";
import { useSession } from "@/lib/auth-client";
import { saveTemplate } from "@/actions/templates";
import { useToast } from "@/store/useToastStore";

export function useActionDock(mode: "create" | "edit") {
  const [html, setHTML] = useState<string>("");
  const { renderHTML, mail, templateId, resetMail } = useField();
  const t = useTranslations();
  const { data: session } = useSession();
  const previewRef = useRef<HTMLDialogElement>(null);
  const saveRef = useRef<HTMLDialogElement>(null);

  const [templateName, setTemplateName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [copying, setCopying] = useState(false);
  const { addToast } = useToast();

  async function handleSaveTemplate(name?: string) {
    const templateNameToUse = name || templateName;
    if (mode === "create" && !templateNameToUse.trim()) return;

    setSaveLoading(true);
    const idToUpdate = mode === "edit" ? templateId : undefined;
    const result = await saveTemplate(
      templateNameToUse,
      mail,
      idToUpdate ?? undefined,
    );

    if (result.error) {
      addToast(result.error, "error");
      setSaveLoading(false);
      return;
    }

    addToast(t("dock.save.success"), "success");
    if (mode === "create") {
      setTemplateName("");
    }
    setTimeout(() => {
      saveRef.current?.close();
    }, 1500);
    setSaveLoading(false);
  }

  async function handleSaveClick() {
    if (!session?.user) {
      window.location.href = "/login";
      return;
    }
    if (mode === "edit" && templateId) {
      await handleSaveTemplate();
      return;
    }
    saveRef.current?.showModal();
  }

  function handleReset() {
    if (confirm(t("dock.resetConfirm"))) {
      resetMail();
    }
  }

  async function handleCopyClick() {
    setCopying(true);
    try {
      const type = "text/html";
      const clipboardItemData = {
        [type]: renderHTML(),
      };
      const clipboardItem = new ClipboardItem(clipboardItemData);

      await navigator.clipboard.write([clipboardItem]);
      addToast(t("dock.copy.success"), "success");
      setTimeout(() => setCopying(false), 1500);
    } catch (error) {
      console.error("Failed to copy HTML:", error);
      addToast(t("dock.copy.error"), "error");
      setCopying(false);
    }
  }

  function handlePreviewClick() {
    setHTML(renderHTML());
    previewRef.current?.showModal();
  }

  return {
    html,
    templateId,
    previewRef,
    saveRef,
    templateName,
    setTemplateName,
    saveLoading,
    copying,
    handleSaveTemplate,
    handleSaveClick,
    handleReset,
    handleCopyClick,
    handlePreviewClick,
  };
}
