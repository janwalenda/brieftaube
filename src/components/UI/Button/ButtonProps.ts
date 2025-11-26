import { InputForm } from "@/components/UI/Shared/InputForm";
import { InputSize } from "@/components/UI/Shared/InputSize";
import { InputVariant } from "@/components/UI/Shared/InputVariant";
import { TooltipPosition } from "@/components/UI/Shared/TooltipPosition";

export type ButtonProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: InputVariant;
  form?: InputForm;
  size?: InputSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  tooltipPosition?: TooltipPosition;
  tooltip?: string;
};
