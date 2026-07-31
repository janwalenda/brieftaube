"use client";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { InputForm } from "@/types/inputForm";
import { TooltipPosition } from "@/types/tooltipPosition";

interface DockIconButtonProps {
  variant?: InputVariant.Primary | InputVariant.Neutral;
  tooltip: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function DockIconButton({
  variant = InputVariant.Primary,
  tooltip,
  onClick,
  children,
}: DockIconButtonProps) {
  return (
    <Button
      variant={variant}
      modifier={InputForm.Circle}
      onClick={onClick}
      className="rounded-full"
      tooltip={{ content: tooltip, placement: TooltipPosition.Top }}
    >
      {children}
    </Button>
  );
}
