"use client"

import { TranslateContextType } from "@/types/TranslateContextType";
import { createContext } from "react";

export const TranslateContext = createContext<TranslateContextType | null>(null);