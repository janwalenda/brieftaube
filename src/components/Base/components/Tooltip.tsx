
import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import { TooltipPosition } from "../types/TooltipPosition";
import { useField } from "@/hooks/useField";

export type TooltipProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  variant?: InputVariant,
  tooltip?: string,
  tooltipPosition?: TooltipPosition,
  children: React.ReactNode,
}


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

  const classN = cx([
    className,
  ], {
    'tooltip': mail.tooltip  || tooltip,
    [variants[variant || InputVariant.Neutral]]: mail.tooltip && typeof tooltip === "string",
    [position[tooltipPosition || TooltipPosition.Top]]: mail.tooltip  && typeof tooltip === "string",
  });
  return (
    <div className={classN} {...props} data-tip={tooltip}>
      {children}
    </div>
  );
}
