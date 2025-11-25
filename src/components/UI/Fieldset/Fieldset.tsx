import cx from "classnames"
import { FieldsetProps } from "./FieldsetProps";

export default function Fieldset({
  className,
  children,
  legend,
  ...props
}: FieldsetProps) {
  
  return (
    <fieldset className={cx([
      "fieldset p-4 rounded-field bg-base-200 relative",
      className,
    ])}
      {...props}
    >
      {legend && (
        <legend className="fieldset-legend bg-neutral text-neutral-content px-4 rounded-field">{legend}</legend>
      )}
      {children}
    </fieldset>
  )
}