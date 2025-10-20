"use client"
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextType } from "@/types/ThemeContextType";
import { useContext } from "react";

export function useTheme() {
  return useContext(ThemeContext) as ThemeContextType;
}
