"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "@/types/Theme";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    switchTheme: (theme: Theme) => void;
    getSystemTheme: () => Theme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: Theme.SYSTEM,

      setTheme: (theme: Theme) => set({ theme }),

      switchTheme: (theme: Theme) => {
        set({ theme });
      },

      getSystemTheme: () => {
        if (typeof window !== "undefined") {
          const preferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
          return preferredColorScheme.matches ? Theme.DARK : Theme.LIGHT;
        }
        return Theme.SYSTEM;
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
