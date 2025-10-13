import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import { InputForm } from "../types/InputForm";
import { InputSize } from "../types/InputSize";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  variant?: InputVariant,
  tooltip?: string,
  size?: InputSize,
  form?: InputForm,
}

export default function ColorInput({
  variant,
  className,
  tooltip,
  size,
  form,
  ...props
}: InputProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'input-primary',
    [InputVariant.Secondary]: 'input-secondary',
    [InputVariant.Neutral]: 'input-neutral',
    [InputVariant.Ghost]: 'input-ghost',
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
    <Tooltip tooltip={tooltip} variant={variant} className="w-[inherit]">
      <label className={cx([
        'input',
        'validator',
        variantClasses[variant || InputVariant.Neutral],
        sizeClasses[size || InputSize.MD],
        formClasses[form || InputForm.Default],
        className,
      ])}>
        <div className="size-4 rounded-full" style={{background: props.value as string ?? '#ffffff'}} />
        <input type="text" {...props} />
      </label>
    </Tooltip>
  )
}