import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toastVariants = cva(
  "toast",
  {
    variants: {
      placement: {
        start: "toast-start",
        center: "toast-center",
        end: "toast-end",
        top: "toast-top",
        middle: "toast-middle",
        bottom: "toast-bottom",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
)

type ToastProps = React.ComponentProps<"div"> & VariantProps<typeof toastVariants> & {
  asChild?: boolean
}

function Toast({ className, placement, asChild, ...props }: ToastProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={cn(toastVariants({ placement }), className)} {...props} />
  )
}

export { Toast, toastVariants, type ToastProps }
