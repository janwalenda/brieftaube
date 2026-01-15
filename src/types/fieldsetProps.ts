import { type DetailedHTMLProps, type FieldsetHTMLAttributes } from "react";

export type FieldsetProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
  legend?: React.ReactNode;
  children: React.ReactNode;
};
