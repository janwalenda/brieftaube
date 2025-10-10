import { TranslateContext } from "@/context/TranslateContext";
import { TranslateContextType } from "@/types/TranslateContextType";
import { useContext } from "react";

export function useTranslate() {
    return useContext(TranslateContext) as TranslateContextType;
}