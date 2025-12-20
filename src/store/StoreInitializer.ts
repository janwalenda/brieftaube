"use client";

import { useRef } from "react";
import { useTranslateStore } from "./useTranslateStore";
import { Lang } from "@/types/Lang";

export default function StoreInitializer({
    lang,
    dictionary,
}: {
    lang: Lang;
    dictionary: Record<string, string>;
}) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useTranslateStore.setState({ lang, dictionary });
        initialized.current = true;
    }
    return null;
}
