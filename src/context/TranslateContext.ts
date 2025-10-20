"use client"

import { createContext } from "react";
import { TranslateContextType } from "@/types/TranslateContextType";

export const TranslateContext = createContext<TranslateContextType | null>(null);