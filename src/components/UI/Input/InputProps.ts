import { InputVariant } from "@/components/UI/Shared/InputVariant";

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: InputVariant;
  tooltip?: string;
};
