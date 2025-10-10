import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import MDEditor, { commands, MDEditorProps } from "@uiw/react-md-editor";
import { useEffect, useRef } from "react";

type InputProps = MDEditorProps & {
  variant?: InputVariant,
  tooltip?: string,
  onHTMLChange: (html: string) => void,
}

export default function Textarea({
  variant,
  className: _className,
  tooltip,
  onHTMLChange,
  ...props
}: InputProps) {
  const variantClasses = {
    [InputVariant.Primary]: 'textarea-primary',
    [InputVariant.Secondary]: 'textarea-secondary',
    [InputVariant.Neutral]: 'textarea-neutral',
    [InputVariant.Ghost]: 'textarea-ghost',
  };

  const className = cx('textarea', _className, {
    [variantClasses[variant || InputVariant.Neutral]]: true
  });

  const outPutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(outPutRef.current) {
      const wrapper = outPutRef.current;

      wrapper.querySelectorAll('strong').forEach(el => {
        el.style.color = '#ff0000';
      });

      onHTMLChange(wrapper.innerHTML);
    }
  }, [onHTMLChange, props.value]);

  return (
    <Tooltip variant={variant} tooltip={tooltip} className="w-[inherit]">
      <MDEditor
        className={className} {...props}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.heading,
          commands.table
        ]}
        preview="edit"
      />
      <MDEditor.Markdown source={props.value || ""} style={{ display: "none" }} wrapperElement={{
        ref: outPutRef
      }} />
    </Tooltip>
  )
}
