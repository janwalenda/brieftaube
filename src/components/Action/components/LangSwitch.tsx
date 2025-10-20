import Link from "next/link";
import { IoLanguage } from "react-icons/io5";
import cx from "classnames";
import { useTranslate } from "@/hooks/useTranslate";

export default function LangSwitch() {
  const { lang } = useTranslate();
  const baseStyle = "btn btn-ghost btn-sm";
  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-accent">
        <IoLanguage />
      </summary>


      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <Link href="/de" className={cx(baseStyle, {
            "btn-active": lang === "de",
          })}>Deutsch</Link>
          <Link href="/en" className={cx(baseStyle, {
            "btn-active": lang === "en",
          })}>English</Link>
          <Link href="/fr" className={cx(baseStyle, {
            "btn-active": lang === "fr",
          })}>Français</Link>
      </div>
    </details>
  );
}
