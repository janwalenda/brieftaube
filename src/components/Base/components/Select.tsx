import classNames from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import { TooltipPosition } from "../types/TooltipPosition";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  variant?: InputVariant
  children?: React.ReactNode
  tooltip?: string
  tooltipPosition?: TooltipPosition
}

export default function Select({
  variant,
  className,
  children,
  tooltip,
  tooltipPosition,
  ...props
}: InputProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'select-primary',
    [InputVariant.Secondary]: 'select-secondary',
    [InputVariant.Neutral]: 'select-neutral',
    [InputVariant.Ghost]: 'select-ghost',
  };

  const classN = classNames('select', className, {
    [variantClasses[variant || InputVariant.Neutral]]: true
  })

  return (
    <Tooltip tooltip={tooltip} tooltipPosition={tooltipPosition} variant={variant}>
      <select {...props} className={classN} aria-label={tooltip}>
        {children}
      </select>
    </Tooltip>
  )
}
