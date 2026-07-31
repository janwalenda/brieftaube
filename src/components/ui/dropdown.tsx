"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef, useEffect } from "react";

const dropdownVariants = cva("dropdown", {
  variants: {
    placement: {
      default: "",
      start: "dropdown-start",
      center: "dropdown-center",
      end: "dropdown-end",
      bottom: "dropdown-bottom",
      top: "dropdown-top",
      left: "dropdown-left",
      right: "dropdown-right",
    },
    defaultVariants: {
      placement: "default",
    },
  },
});

export function Dropdown({
  asChild,
  className,
  placement,
  ...props
}: React.ComponentProps<"details"> &
  VariantProps<typeof dropdownVariants> & { asChild?: boolean }) {
  "use client";
  const Comp = asChild ? Slot : "details";
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.removeAttribute("open");
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && ref.current) {
        ref.current.removeAttribute("open");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Comp
      ref={ref}
      className={cn(dropdownVariants({ placement, className }))}
      {...props}
    />
  );
}

export { DropdownButton, DropdownContent } from "./dropdownMenu";
