import Link from "next/link";
import { IoLanguage } from "react-icons/io5";
import cx from "classnames";

export default async function LangSwitch({
  params
}: {
  params: Promise<{
    lang: "de" | "en";
  }>
}) {
  const baseStyle = "btn btn-ghost btn-sm";
  const { lang } = await params;
  return (
    <details className="dropdown">
      <summary className="btn m-1">
        <IoLanguage />
      </summary>


      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <Link href="/de" className={cx(baseStyle, {
            "btn-active": lang === "de",
          })}>Deutsch</Link>
          <Link href="/en" className={cx(baseStyle, {
            "btn-active": lang === "en",
          })}>English</Link>
      </div>
    </details>
  );
}
