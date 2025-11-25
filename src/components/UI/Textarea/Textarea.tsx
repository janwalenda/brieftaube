"use client"
import cx from "classnames";
import { InputVariant } from "../Shared/InputVariant";
import Tooltip from "../Tooltip/Tooltip";
import dynamic from "next/dynamic";
import { TextareaProps } from "./TextareaProps";
const MDEditor = dynamic(() => import('@/components/MDEditor/MDEditor/MDEditor'), { ssr: false })

export default function Textarea({
  variant,
  className,
  tooltip,
  ...props
}: TextareaProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'textarea-primary',
    [InputVariant.Secondary]: 'textarea-secondary',
    [InputVariant.Neutral]: 'textarea-neutral',
    [InputVariant.Ghost]: 'textarea-ghost',
  };

  return (
    <Tooltip variant={variant} tooltip={tooltip} className="w-[inherit]">
      <MDEditor
        aria-label={tooltip}
        className={cx('textarea', className, {
          [variantClasses[variant || InputVariant.Neutral]]: true
        })}
        {...props}
      />
    </Tooltip>
  );
}
