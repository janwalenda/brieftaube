import { t } from "@/dictionaries";
import { Lang } from "@/types/Lang";
import { IoEye } from "react-icons/io5";

export default async function ThemeSwitch({
  params
}: {
  params: Promise<{ lang: Lang | string }>
}) {
  const { lang } = await params;
  return (
    <details className="dropdown">
      <summary className="btn m-1">
        <IoEye />
      </summary>

      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="light"
            />
            {await t('theme-switch.light', lang as Lang)}
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="retro"
            />
            Retro
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="cyberpunk"
            />
            Cyberpunk
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="dark"
            />
            {await t('theme-switch.dark', lang as Lang)}
          </label>
      </div>
    </details>
  );
}
