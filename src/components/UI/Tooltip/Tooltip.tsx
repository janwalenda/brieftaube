
import cx from "classnames";
import { InputVariant } from "../Shared/InputVariant";
import { TooltipPosition } from "../Shared/TooltipPosition";
import { useField } from "@/hooks/useField";
import { TooltipProps } from "./TooltipProps";

export default function Tooltip({
  variant,
  tooltip,
  className,
  children,
  tooltipPosition,
  ...props
}: TooltipProps) {
  const { mail } = useField()
  const variants = {
    [InputVariant.Neutral]: '',
    [InputVariant.Primary]: 'tooltip-primary',
    [InputVariant.Secondary]: 'tooltip-secondary',
    [InputVariant.Ghost]: '',
  };

  const position = {
    [TooltipPosition.Left]: 'tooltip-left',
    [TooltipPosition.Right]: 'tooltip-right',
    [TooltipPosition.Top]: 'tooltip-top',
    [TooltipPosition.Bottom]: 'tooltip-bottom',
  };

  return (
    <div className={cx([
        className,
      ], {
        'tooltip': mail.tooltip && typeof tooltip === "string",
        [variants[variant || InputVariant.Neutral]]: mail.tooltip && typeof tooltip === "string",
        [position[tooltipPosition || TooltipPosition.Top]]: mail.tooltip  && typeof tooltip === "string",
      })} {...props} data-tip={tooltip}>
      {children}
    </div>
  );
}
