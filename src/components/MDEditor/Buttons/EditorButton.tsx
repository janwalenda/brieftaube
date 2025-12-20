"use client";
import { Button } from "@/components/ui/button";
import { InputSize } from "@/components/ui/Shared/InputSize";
import { InputVariant } from "@/components/ui/Shared/InputVariant";
import { TooltipPosition } from "@/components/ui/Shared/TooltipPosition";
import { commands } from "@uiw/react-md-editor";

export function EditorButton({
  disabled, executeCommand, command, children
}: {
  disabled: boolean;
  executeCommand: (command: commands.ICommand<string>, name?: string) => void; command: commands.ICommand<string>;
  children: React.ReactNode;
}) {
  return <Button
    buttonStyle={InputVariant.Ghost}
    className="md:btn-sm"
    size={InputSize.XS}
    disabled={disabled}
    tooltip={{
      content: command.name,
      placement: TooltipPosition.Bottom
    }}
    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      executeCommand(command, command.groupName);
    }}
  >
    {children}
  </Button>;
}
