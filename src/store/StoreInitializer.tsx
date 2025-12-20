"use client";

import { useEffect } from "react";
import { useTranslateStore } from "./useTranslateStore";
import { Lang } from "../types/Lang";

export default function StoreInitializer({
    lang,
    dictionary,
}: {
    lang: Lang;
    dictionary: Record<string, string>;
}) {
    useEffect(() => {
        useTranslateStore.setState({ lang, dictionary });
    }, [lang, dictionary]);

    return null;
}
