"use client"
import { IoAdd, IoImage, IoText } from "react-icons/io5";
import { useField } from "../../hooks/useField";
import { FieldType } from "../../types/FieldType";
import { Button } from "@/components/ui/button";
import { TooltipPosition } from "../ui/Shared/TooltipPosition";
import { InputVariant } from "../ui/Shared/InputVariant";
import { useTranslateStore } from "@/store/useTranslateStore";
import { Tooltip } from "../ui/tooltip";
import { useEffect, useState } from "react";

export default function FAB() {
  const { addField } = useField();
  const { t } = useTranslateStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddTextBlock = () => {
    addField(FieldType.TextBlock);
  }

  const handleAddImage = () => {
    addField(FieldType.Image);
  }

  if (!isClient) {
    return null;
  }

  return (
    <div className="fab">
      {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <Tooltip variant={InputVariant.Secondary} placement={TooltipPosition.Left} content={t('fab.plus')}>
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-secondary" aria-label={t('fab.plus')}>
          <IoAdd className="size-6" />
        </div>
      </Tooltip>
      {/* buttons that show up when FAB is open */}
      <Button variant={"primary"}
        className="btn btn-lg btn-circle"
        onClick={handleAddTextBlock}
        tooltip={{
          content: t('fab.textblock'),
          placement: TooltipPosition.Left
        }}
      >
        <IoText className="size-6" />
      </Button>
      <Button variant={"primary"}
        className="btn btn-lg btn-circle"
        onClick={handleAddImage}
        tooltip={{
          content: t('fab.image'),
          placement: TooltipPosition.Left
        }}
      >
        <IoImage className="size-6" />
      </Button>
    </div>
  );
}
