"use client"
import { ThemeContextType } from "@/types/ThemeContextType";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType | null>(null);