"use client"
import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import('@/components/MDEditor/components/MDEditor'), { ssr: false })

type InputProps = MDEditorProps & {
  variant?: InputVariant,
  tooltip?: string,
}

export default function Textarea({
  variant,
  className,
  tooltip,
  ...props
}: InputProps) {
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
