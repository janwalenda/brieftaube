import { type UniqueIdentifier } from "@dnd-kit/core";
import { type DetailedHTMLProps, type FieldsetHTMLAttributes } from "react";

export type FieldProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
  legend: React.ReactNode;
  children: React.ReactNode;
  fieldId: UniqueIdentifier;
};
