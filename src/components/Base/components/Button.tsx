import { InputVariant } from "../types/InputVariant";
import cx from "classnames";
import Tooltip from "./Tooltip";
import { TooltipPosition } from "../types/TooltipPosition";
import { InputForm } from "../types/InputForm";
import { InputSize } from "../types/InputSize";

type ButtonProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: InputVariant,
  form?: InputForm,
  size?: InputSize,
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode,
  children?: React.ReactNode,
  tooltipPosition?: TooltipPosition,
  tooltip?: string,
}

export default function Button({
  variant = InputVariant.Neutral,
  form = InputForm.Default,
  size = InputSize.MD,
  startIcon,
  endIcon,
  children,
  className,
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

  const formClasses = {
    [InputForm.Circle]: 'btn-circle',
    [InputForm.Square]: 'btn-square',
    [InputForm.Block]: 'btn-block',
    [InputForm.Default]: '',
  }

  const sizeClasses = {
    [InputSize.XS]: 'btn-xs',
    [InputSize.SM]: 'btn-sm',
    [InputSize.MD]: 'btn-md',
    [InputSize.LG]: 'btn-lg',
    [InputSize.XL]: 'btn-xl'
  }

  return (
    <Tooltip variant={variant} tooltip={tooltip} tooltipPosition={tooltipPosition}>
      <button className={cx([
          'btn',
          variantClasses[variant],
          formClasses[form],
          sizeClasses[size],
          className
        ], {})} 
        {...props} 
        aria-label={tooltip}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </button>
    </Tooltip>
  )
}
