import { UniqueIdentifier } from "@dnd-kit/core";
import { DetailedHTMLProps, FieldsetHTMLAttributes } from "react";

export type FieldProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
  legend: React.ReactNode;
  children: React.ReactNode;
  fieldId: UniqueIdentifier;
};
