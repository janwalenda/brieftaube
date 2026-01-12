import { cn } from "@/lib/utils";

export default function Fieldset({
  className,
  children,
  legend,
  ...props
}: React.ComponentProps<'fieldset'> & {
  legend?: React.ReactNode;
}) {

  return (
    <fieldset className={cn([
      "fieldset p-4 rounded-field bg-base-200 relative",
      className,
    ])}
      {...props}
    >
      {legend && (
        <legend className="fieldset-legend bg-neutral text-neutral-content px-4 rounded-field hover:bg-neutral/30 backdrop-blur-2xl transition-all">{legend}</legend>
      )}
      {children}
    </fieldset>
  )
}