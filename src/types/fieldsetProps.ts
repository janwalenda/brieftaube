import { DetailedHTMLProps, FieldsetHTMLAttributes } from "react";

export type FieldsetProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
  legend?: React.ReactNode;
  children: React.ReactNode;
};
