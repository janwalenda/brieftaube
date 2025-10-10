"use client"
import { useContext } from "react";
import { PresetContext } from "../context/PresetContext";
import { PresetContextType } from "../types/PresetContextType";

export function usePreset() {
  return useContext(PresetContext) as PresetContextType;
}
