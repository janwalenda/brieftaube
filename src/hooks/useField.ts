import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import type { MailContextType } from "../types/FieldContextType";

export function useField() {
  return useContext(MailContext) as MailContextType;
}
