"use client"
import { Link, usePathname } from '@/i18n/navigation';
import { IoLanguage } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
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
        <Link href={pathname} locale="de" className={cn(baseStyle, {
          "btn-active": locale === "de",
        })}>Deutsch</Link>
        <Link href={pathname} locale="en" className={cn(baseStyle, {
          "btn-active": locale === "en",
        })}>English</Link>
        <Link href={pathname} locale="fr" className={cn(baseStyle, {
          "btn-active": locale === "fr",
        })}>Français</Link>
      </div>
    </details>
  );
}
