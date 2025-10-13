import { useContext } from "react";
import { FieldContext } from "../context/FieldContext";
import type { FieldContextType } from "../types/FieldContextType";

export function useField() {
  return useContext(FieldContext) as FieldContextType;
}
