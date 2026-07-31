"use client";
import { IoSave, IoColorPalette, IoRefresh, IoCopy } from "react-icons/io5";
import { IoMdPaper } from "react-icons/io";
import { InputVariant } from "@/types/inputVariant";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LoggedIn from "@/components/LoggedIn";
import { Spinner } from "@/components/ui/spinner";
import { DockIconButton } from "./DockIconButton";

interface DockPrimaryButtonsProps {
  mode: "create" | "edit";
  templateId: string | null;
  copying: boolean;
  saveLoading: boolean;
  onReset: () => void;
  onCopy: () => void;
  onPreview: () => void;
  onSave: () => void;
}

export function DockPrimaryButtons({
  mode,
  templateId,
  copying,
  saveLoading,
  onReset,
  onCopy,
  onPreview,
  onSave,
}: DockPrimaryButtonsProps) {
  const t = useTranslations();

  return (
    <>
      {mode === "create" && (
        <DockIconButton
          variant={InputVariant.Neutral}
          tooltip={t("dock.resetTooltip")}
          onClick={onReset}
        >
          <IoRefresh className="size-4" />
        </DockIconButton>
      )}
      <DockIconButton tooltip={t("dock.code")} onClick={onCopy}>
        {copying ? <Spinner /> : <IoCopy className="size-4" />}
      </DockIconButton>
      <DockIconButton tooltip={t("dock.preview.tooltip")} onClick={onPreview}>
        <IoMdPaper className="size-4" />
      </DockIconButton>
      <LoggedIn>
        <DockIconButton tooltip={t("dock.save.tooltip")} onClick={onSave}>
          {saveLoading ? <Spinner /> : <IoSave className="size-4" />}
        </DockIconButton>
      </LoggedIn>
      <Link
        href={mode === "edit" ? `/templates/${templateId}/design` : "/design"}
      >
        <DockIconButton tooltip={t("design.tooltip")}>
          <IoColorPalette className="size-4" />
        </DockIconButton>
      </Link>
    </>
  );
}
