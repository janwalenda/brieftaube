"use client"
import { createContext } from "react";
import type { FieldContextType } from "../components/Base/types/FieldContextType";

export const FieldContext = createContext<FieldContextType | null>(null);
