"use client"
import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import { commands, MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { IoCode } from "react-icons/io5";
import { FaBold, FaItalic, FaLine, FaRulerHorizontal, FaStrikethrough } from "react-icons/fa";
import { FaHeading } from "react-icons/fa6";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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
        extraCommands={[]}
        className={cx('textarea', className, {
          [variantClasses[variant || InputVariant.Neutral]]: true
        })}
        preview="edit"
        {...props}
      />
    </Tooltip>
  );
}
