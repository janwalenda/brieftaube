
import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import { TooltipPosition } from "../types/TooltipPosition";

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
    'tooltip',
    variants[variant || InputVariant.Neutral],
    position[tooltipPosition || TooltipPosition.Top]
  ]);
  return (
    <div className={classN} {...props} data-tip={tooltip}>
      {children}
    </div>
  );
}
