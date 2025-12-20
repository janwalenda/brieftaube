"use client"
import Link from "next/link";
import { IoLanguage } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Lang } from "@/types/Lang";
import { useTranslateStore } from "@/store/useTranslateStore";
import { useEffect, useState } from "react";

export default function LangSwitch({
  lang,
  dictionary,
}: {
  lang: Lang;
  dictionary: Record<string, string>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }


  const baseStyle = "btn btn-ghost btn-sm";
  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-accent">
        <IoLanguage />
      </summary>


      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <Link href="/de" className={cn(baseStyle, {
          "btn-active": lang === "de",
        })}>Deutsch</Link>
        <Link href="/en" className={cn(baseStyle, {
          "btn-active": lang === "en",
        })}>English</Link>
        <Link href="/fr" className={cn(baseStyle, {
          "btn-active": lang === "fr",
        })}>Français</Link>
      </div>
    </details>
  );
}
