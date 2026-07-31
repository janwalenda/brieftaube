"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function ModalAction({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={cn("modal-action", className)} {...props}>
      {children}
    </Comp>
  );
}
