import { useTheme } from "@/hooks/useTheme";
import { useTranslate } from "@/hooks/useTranslate";
import { Theme } from "@/types/Theme";
import { IoEye } from "react-icons/io5";

export default function ThemeSwitch() {
  const { t } = useTranslate();
  const { theme, switchTheme, getSystemTheme } = useTheme();

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-accent">
        <IoEye />
      </summary>

      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="light"
              checked={theme === Theme.LIGHT}
              onChange={(event) => {
                if(event.target.checked) {
                  switchTheme(Theme.LIGHT)
                }
              }}
            />
            {t('theme-switch.light')}
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="dark"
              checked={theme === Theme.DARK}
              onChange={(event) => {
                if(event.target.checked) {
                  switchTheme(Theme.DARK)
                }
              }}
            />
            {t('theme-switch.dark')}
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="retro"
              checked={theme === Theme.RETRO}
              onChange={(event) => {
                if(event.target.checked) {
                  switchTheme(Theme.RETRO)
                }
              }}
            />
            Retro
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value="cyberpunk"
              checked={theme === Theme.CYBERPUNK}
              onChange={(event) => {
                if(event.target.checked) {
                  switchTheme(Theme.CYBERPUNK)
                }
              }}
            />
            Cyberpunk
          </label>
          <label className="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              className="radio radio-sm theme-controller"
              value={getSystemTheme()}
              checked={theme === Theme.SYSTEM}
              onChange={(event) => {
                if(event.target.checked) {
                  switchTheme(Theme.SYSTEM)
                }
              }}
            />
            System
          </label>
      </div>
    </details>
  );
}
