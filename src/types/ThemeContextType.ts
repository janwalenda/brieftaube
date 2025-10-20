"use client";
import { Theme } from "@/types/Theme";

export type ThemeContextType = {
    theme: Theme;
    switchTheme: (theme: Theme) => void;
    getSystemTheme: () => Theme;
};
