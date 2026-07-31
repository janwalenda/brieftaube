"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { InputVariant } from "@/types/inputVariant";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/types/inputForm";
import { IoClose } from "react-icons/io5";

const modalVariants = cva("modal", {
  variants: {
    modifier: { open: "modal-open" },
    placement: {
      top: "modal-top",
      middle: "modal-middle",
      bottom: "modal-bottom",
      left: "modal-start",
      right: "modal-end",
    },
  },
  defaultVariants: { placement: "middle" },
});

type ModalProps = React.ComponentProps<"dialog"> &
  VariantProps<typeof modalVariants> & {
    asChild?: boolean;
    backdrop?: boolean;
    title?: React.ReactNode;
  };

export function Modal({
  placement,
  children,
  className,
  asChild,
  backdrop = false,
  title,
  ...props
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const Comp = asChild ? Slot : "dialog";

  const node = (
    <Comp className={cn(modalVariants({ placement }))} {...props}>
      <div className={cn("modal-box", className)}>
        {title ? <h3 className="font-bold text-lg mb-2">{title}</h3> : null}
        {children}
        <form method="dialog">
          <Button
            variant={InputVariant.Neutral}
            className="absolute top-1 right-1"
            modifier={InputForm.Circle}
            buttonStyle={InputVariant.Ghost}
            title="Close"
          >
            <IoClose />
          </Button>
        </form>
      </div>
      {backdrop && (
        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      )}
    </Comp>
  );

  if (!mounted) return null;
  return createPortal(node, document.body);
}

export { ModalAction } from "./modalAction";
