import { InputVariant } from "@/components/ui/Shared/InputVariant";
import { TooltipPosition } from "@/components/ui/Shared/TooltipPosition";

export type SelectProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  variant?: InputVariant;
  children?: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
};
