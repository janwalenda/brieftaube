import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "card bg-base-100",
  {
    variants: {
      cardStyle: {
        border: "card-border",
        dash: "card-dash",
      },
      modifier: {
        side: "card-side",
        fullImage: "image-full",
      },
      size: {
        default: "card-md",
        xs: "card-xs",
        sm: "card-sm",
        lg: "card-lg",
        xl: "card-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Card({
  className,
  size,
  cardStyle,
  modifier,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean,
  }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="div"
      className={cn(cardVariants({ size, modifier, cardStyle, className }))}
      {...props}
    >
      {props.children}
    </Comp>
  )
}

function CardBody({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("card-body", className)}>
      {children}
    </div>
  )
}

function CardTitle({ children, className }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("card-title", className)}>
      {children}
    </h2>
  )
}

function CardAction({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("card-actions justify-end", className)}>
      {children}
    </div>
  )
}

export { Card, CardBody, CardTitle, CardAction, cardVariants }
