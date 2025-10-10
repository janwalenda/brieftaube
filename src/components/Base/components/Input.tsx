import classNames from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode,
  variant?: InputVariant,
  tooltip?: string,
}

export default function Input({
  startIcon,
  endIcon,
  variant,
  className: _className,
  tooltip,
  ...props
}: InputProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'input-primary',
    [InputVariant.Secondary]: 'input-secondary',
    [InputVariant.Neutral]: 'input-neutral',
    [InputVariant.Ghost]: 'input-ghost',
  };

  const className = classNames([
    'input',
    _className,
    variantClasses[variant || InputVariant.Neutral]
  ])

  return (
    <Tooltip tooltip={tooltip} variant={variant} className="w-[inherit]">
      <label className={className}>
        {startIcon && startIcon}
        <input {...props} />
        {endIcon && endIcon}
    </label>
    </Tooltip>
  )
}
