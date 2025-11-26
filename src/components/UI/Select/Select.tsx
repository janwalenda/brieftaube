import classNames from "classnames";
import { InputVariant } from "../Shared/InputVariant";
import Tooltip from "../Tooltip/Tooltip";
import { SelectProps } from "./SelectProps";

export default function Select({
  variant,
  className,
  children,
  tooltip,
  tooltipPosition,
  ...props
}: SelectProps) {
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
