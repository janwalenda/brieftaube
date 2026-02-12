"use client";

import { useTranslations } from "next-intl";
import { Modal, ModalAction } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputVariant } from "@/types/inputVariant";
import { Spinner } from "@/components/ui/spinner";
import { IoSave } from "react-icons/io5";
import { forwardRef } from "react";

interface SaveModalProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  onSave: () => void;
  loading: boolean;
  message: { type: "success" | "error"; text: string } | null;
}

export const SaveModal = forwardRef<HTMLDialogElement, SaveModalProps>(
  ({ templateName, setTemplateName, onSave, loading, message }, ref) => {
    const t = useTranslations();

    return (
      <Modal title={t("dock.save.title")} ref={ref}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="template-name">{t("dock.save.nameLabel")}</Label>
            <Input
              id="template-name"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder={t("dock.save.namePlaceholder")}
              disabled={loading}
              className="mt-1"
            />
          </div>
          {message && (
            <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
              <span>{message.text}</span>
            </div>
          )}
        </div>
        <ModalAction>
          <Button
            variant={InputVariant.Primary}
            onClick={onSave}
            disabled={loading || !templateName.trim()}
          >
            {loading ? (
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
    );
  }
);

SaveModal.displayName = "SaveModal";
