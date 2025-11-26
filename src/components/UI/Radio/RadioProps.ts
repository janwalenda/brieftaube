import { InputVariant } from "../Shared/InputVariant";

export type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  variant?: InputVariant;
};
