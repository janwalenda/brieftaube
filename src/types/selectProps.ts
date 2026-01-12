import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";

export type SelectProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  variant?: InputVariant;
  children?: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
};
