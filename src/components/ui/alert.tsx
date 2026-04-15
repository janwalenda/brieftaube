import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "alert",
  {
    variants: {
      alertStyle: {
        outline: "alert-outline",
        dashed: "alert-dashed",
        soft: "alert-soft",
      },
      variant: {
        info: "alert-info",
        success: "alert-success",
        warning: "alert-warning",
        error: "alert-error",
      },
      direction: {
        horizontal: "alert-horizontal",
        vertical: "alert-vertical",
      }
    },
    defaultVariants: {
      alertStyle: "soft",
      variant: "info",
      direction: "horizontal",
    },
  }
)

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants> & {
  asChild?: boolean
}

function Alert({ className, alertStyle, variant, direction, asChild, ...props }: AlertProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={cn(alertVariants({ alertStyle, variant, direction }), className)} {...props} />
  )
}

export { Alert, alertVariants, type AlertProps }
