import { InputVariant } from "@/components/UI/Shared/InputVariant";
import { TooltipPosition } from "@/components/UI/Shared/TooltipPosition";

export type SelectProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  variant?: InputVariant;
  children?: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
};
