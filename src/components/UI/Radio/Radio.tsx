import classNames from "classnames";
import { InputVariant } from "../Shared/InputVariant";
import { RadioProps } from "./RadioProps";

export default function Radio({
  variant,
  className: _className,
  ...props
}: RadioProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'radio-primary',
    [InputVariant.Secondary]: 'radio-secondary',
    [InputVariant.Neutral]: 'radio-neutral',
    [InputVariant.Ghost]: 'radio-ghost',
  };


  const className = classNames('radio', _className, {
    [variantClasses[variant || InputVariant.Neutral]]: true
  })

  return (
    <input {...props} className={className} />
  )
}
