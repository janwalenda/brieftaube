import { InputVariant } from "../types/InputVariant";
import cx from "classnames";
import Tooltip from "./Tooltip";
import { TooltipPosition } from "../types/TooltipPosition";

type ButtonProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: InputVariant,
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode,
  children?: React.ReactNode,
  tooltipPosition?: TooltipPosition,
  tooltip?: string,
}

export default function Button({
  variant = InputVariant.Neutral,
  startIcon,
  endIcon,
  children,
  className: _className,
  tooltipPosition,
  tooltip,
  ...props
}: Omit<ButtonProps, 'type'> & React.ButtonHTMLAttributes<HTMLButtonElement>) {

  const variantClasses = {
    [InputVariant.Primary]: 'btn-primary',
    [InputVariant.Secondary]: 'btn-secondary',
    [InputVariant.Neutral]: 'btn-neutral',
    [InputVariant.Ghost]: 'btn-ghost',
  };

  const className = cx([
    'btn',
    variantClasses[variant],
    _className
  ]);

  return (
    <Tooltip variant={variant} tooltip={tooltip} tooltipPosition={tooltipPosition}>
      <button className={className} {...props} aria-label={tooltip}>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </button>
    </Tooltip>
  )
}
