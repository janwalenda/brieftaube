"use client"
import { IoAdd, IoImage, IoText } from "react-icons/io5";
import { useField } from "../../hooks/useField";
import { FieldType } from "../../types/FieldType";
import Button from "../UI/Button/Button";
import { TooltipPosition } from "../UI/Shared/TooltipPosition";
import Tooltip from "../UI/Tooltip/Tooltip";
import { InputVariant } from "../UI/Shared/InputVariant";
import { useTranslate } from "@/hooks/useTranslate";

export default function FAB() {
  const { addField } = useField();
  const { t } = useTranslate();

  const handleAddTextBlock = () => {
    addField(FieldType.TextBlock);
  }

  const handleAddImage = () => {
    addField(FieldType.Image);
  }

  return (
    <div className="fab">
      {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <Tooltip variant={InputVariant.Secondary} tooltipPosition={TooltipPosition.Left} tooltip={t('fab.plus')}>
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-secondary" aria-label={t('fab.plus')}>
          <IoAdd className="size-6" />
        </div>
      </Tooltip>
      {/* buttons that show up when FAB is open */}
      <Button variant={InputVariant.Primary} 
        className="btn btn-lg btn-circle" 
        onClick={handleAddTextBlock} 
        tooltip={t('fab.textblock')} 
        tooltipPosition={TooltipPosition.Left}
      >
        <IoText className="size-6" />
      </Button>
      <Button variant={InputVariant.Primary} 
        className="btn btn-lg btn-circle" 
        onClick={handleAddImage} 
        tooltip={t('fab.image')} 
        tooltipPosition={TooltipPosition.Left}
      >
        <IoImage className="size-6" />
      </Button>
    </div>
  );
}
