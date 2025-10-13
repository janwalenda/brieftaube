"use client"
import { createContext } from "react";
import type { FieldContextType } from "../types/FieldContextType";

export const FieldContext = createContext<FieldContextType | null>(null);
