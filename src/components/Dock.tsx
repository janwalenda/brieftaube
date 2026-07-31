"use client";
import Dock from "@/components/ui/dock";
import { useIsClient } from "@/hooks/useIsClient";
import { useActionDock } from "@/hooks/useActionDock";
import { PreviewModal } from "./PreviewModal";
import { SaveModal } from "./SaveModal";
import { DockPrimaryButtons } from "./dock/DockPrimaryButtons";

export interface ActionDockProps {
  mode: "create" | "edit";
}

export default function ActionDock({ mode }: ActionDockProps) {
  const isClient = useIsClient();
  const {
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
  } = useActionDock(mode);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Dock>
        <DockPrimaryButtons
          mode={mode}
          templateId={templateId}
          copying={copying}
          saveLoading={saveLoading}
          onReset={handleReset}
          onCopy={handleCopyClick}
          onPreview={handlePreviewClick}
          onSave={handleSaveClick}
        />
      </Dock>
      <PreviewModal html={html} ref={previewRef} />
      <SaveModal
        templateName={templateName}
        setTemplateName={setTemplateName}
        onSave={() => handleSaveTemplate()}
        loading={saveLoading}
        ref={saveRef}
      />
    </>
  );
}
