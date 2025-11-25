import { InputVariant } from "@/components/UI/Shared/InputVariant";

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  variant?: InputVariant;
  tooltip?: string;
};
