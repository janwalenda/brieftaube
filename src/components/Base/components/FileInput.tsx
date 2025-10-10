import classNames from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  variant?: InputVariant
  tooltip?: string
}

export default function FileInput({
  variant,
  className: _className,
  tooltip,
  ...props
}: InputProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'file-input-primary',
    [InputVariant.Secondary]: 'file-input-secondary',
    [InputVariant.Neutral]: 'file-input-neutral',
    [InputVariant.Ghost]: 'file-input-ghost'
  };

  const className = classNames('file-input', _className, {
    [variantClasses[variant || InputVariant.Neutral]]: true
  })

  return (
    <Tooltip variant={variant} tooltip={tooltip}>
      <input {...props} className={className} type="file" />
    </Tooltip>
  )
}
