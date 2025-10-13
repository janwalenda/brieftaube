"use client"
import { createContext } from "react";
import type { MailContextType } from "../types/FieldContextType";

export const MailContext = createContext<MailContextType | null>(null);
