"use client";
import { Button } from "@/components/Base";
import { InputSize } from "@/components/Base/types/InputSize";
import { InputVariant } from "@/components/Base/types/InputVariant";
import { TooltipPosition } from "@/components/Base/types/TooltipPosition";
import { commands } from "@uiw/react-md-editor";

export function EditorButton({
  disabled, executeCommand, command, children
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
  children: React.ReactNode;
}) {
  return <Button
    variant={InputVariant.Ghost}
    size={InputSize.XS}
    disabled={disabled}
    tooltip={command.name}
    tooltipPosition={TooltipPosition.Bottom}
    onClick={(env) => {
      env.stopPropagation();
      executeCommand(command, command.groupName);
    }}
  >
    {children}
  </Button>;
}
