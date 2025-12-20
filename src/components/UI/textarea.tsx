import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MDEditor } from "../MDEditor"
import { MDEditorProps } from "../MDEditor/MDEditor/MDEditor"
import { Tooltip, TooltipProps } from "./tooltip"


const textareaVariants = cva(
  "textarea",
  {
    variants: {
      variant: {
        default: "textarea-primary",
        primary: "textarea-primary",
        secondary: "textarea-secondary",
        neutral: "textarea-neutral",
        accent: "textarea-accent",
        info: "textarea-info",
        success: "textarea-success",
        warning: "textarea-warning",
        error: "textarea-error",
      },
      textareaStyle: {
        ghost: "textarea-ghost",
      },
      sizeVariant: {
        default: "textarea-md",
        md: "textarea-md",
        xs: "textarea-xs",
        sm: "textarea-sm",
        lg: "textarea-lg",
        xl: "textarea-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
    },
  }
)

type Variant = VariantProps<typeof textareaVariants>

type TextareaProps = MDEditorProps & Variant & {
  tooltip?: TooltipProps
}

function Textarea({
  className,
  variant,
  sizeVariant,
  textareaStyle,
  tooltip,
  ...props
}: TextareaProps) {

  return (
    <Tooltip {...tooltip}>
      <MDEditor
        data-slot="textarea"
        className={cn(textareaVariants({ variant, sizeVariant, textareaStyle, className }))}
        {...props}
      />
    </Tooltip>
  )
}

export { Textarea, textareaVariants }
