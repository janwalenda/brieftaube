"use client"
import { createContext } from "react";
import type { PresetContextType } from "../types/PresetContextType";

export const PresetContext = createContext<PresetContextType | null>(null);
