"use client";
import { HexColorPicker } from "react-colorful";
import { LabeledInput } from "./labeledInput";
import { Button } from "./button";
import { Modal, ModalAction } from "./modal";
import { useEffect, useRef, useState } from "react";
import { Pipette } from "lucide-react";
import { inputVariants } from "./input";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type ColorInputProps = {
  className?: string;
  color: string;
  onChange: (newColor: string) => void;
} & VariantProps<typeof inputVariants> & React.ComponentProps<'div'>;


export function ColorInput({
  className,
  color,
  onChange,
  variant,
  sizeVariant,
  inputStyle,
  ...props
}: ColorInputProps) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalClose = () => modalRef.current?.close();
  const handleModalOpen = () => modalRef.current?.showModal();

  if (!client) return null;

  return (
    <div className={cn("join", className)} {...props}>
      <LabeledInput startIcon={(
        <span>HEX</span>
      )} endIcon={(
        <span className="size-6" style={{ backgroundColor: color }} />
      )}
        onChange={(event) => onChange(event.target.value)}
        value={color}
        className="join-item"
        variant={variant}
        sizeVariant={sizeVariant}
        inputStyle={inputStyle}
      />
      <Button onClick={handleModalOpen}
        variant={variant}
        modifier={"square"}
        className="join-item"
      >
        <Pipette className="size-4" />
      </Button>
      <Modal ref={modalRef} backdrop>
        <HexColorPicker color={color}
          onChange={onChange}
          style={{ width: "100%" }}
        />
        <ModalAction>
          <Button onClick={handleModalClose}>Done</Button>
        </ModalAction>
      </Modal>
    </div>
  )
} 