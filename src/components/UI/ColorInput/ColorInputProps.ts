import { InputForm } from "@/components/UI/Shared/InputForm";
import { InputSize } from "@/components/UI/Shared/InputSize";
import { InputVariant } from "@/components/UI/Shared/InputVariant";

export type ColorInputProps = {
  variant?: InputVariant;
  tooltip?: string;
  size?: InputSize;
  form?: InputForm;
  className?: string;
  color: string;
  onChange: (newColor: string) => void;
};
