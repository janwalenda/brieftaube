import { Tooltip } from "@/components/UI";
import { InputVariant } from "@/components/UI/Shared/InputVariant";
import { useField } from "@/hooks/useField";
import { useTranslate } from "@/hooks/useTranslate";
import { IoClose, IoHelp } from "react-icons/io5";

export default function TooltipToggle() {
  const { mail, toggleTooltip } = useField();
  const { t } = useTranslate();

  const tooltipButtonTitle = mail.tooltip ?
    t('dock.deactivate-tooltips.title') :
    t('dock.activate-tooltips.title');

  return (
    <Tooltip tooltip={tooltipButtonTitle} variant={InputVariant.Secondary}>
      <label className="toggle toggle-xl toggle-secondary text-base-content">
        <input type="checkbox" checked={mail.tooltip} onChange={toggleTooltip} />
        <IoHelp aria-label="enabled" />
        <IoClose aria-label="disabled" />
      </label>
    </Tooltip>
  )
}