"use client"
import { Tooltip } from "@/components/ui/tooltip";
import { InputVariant } from "@/components/ui/Shared/InputVariant";
import { useField } from "@/hooks/useField";
import { useTranslateStore } from "@/store/useTranslateStore";
import { IoClose, IoHelp } from "react-icons/io5";
import { TooltipPosition } from "@/components/ui/Shared/TooltipPosition";
import { useEffect, useState } from "react";

export default function TooltipToggle() {
  const { mail, toggleTooltip } = useField();
  const { t } = useTranslateStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const tooltipButtonTitle = mail.tooltip ?
    t('dock.deactivate-tooltips.title') :
    t('dock.activate-tooltips.title');

  return (
    <Tooltip variant={InputVariant.Secondary}
      content={tooltipButtonTitle}
      placement={TooltipPosition.Left}
    >
      <label className="toggle toggle-xl toggle-secondary text-base-content">
        <input type="checkbox" checked={mail.tooltip} onChange={toggleTooltip} />
        <IoHelp aria-label="enabled" />
        <IoClose aria-label="disabled" />
      </label>
    </Tooltip>
  )
}