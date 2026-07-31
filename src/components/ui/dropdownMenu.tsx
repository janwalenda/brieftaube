"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Button, type ButtonProps } from "./button";

export function DropdownButton({
  asChild,
  children,
  ...props
}: ButtonProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "summary";
  return (
    <Button {...props} asChild>
      <Comp>{children}</Comp>
    </Button>
  );
}

export function DropdownContent({
  asChild,
  className,
  ...props
}: React.ComponentProps<"ul"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "ul";
  return (
    <Comp
      className={cn(
        "menu",
        "dropdown-content",
        "bg-base-100",
        "rounded-box",
        "z-1",
        "w-52",
        "p-2",
        "shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
