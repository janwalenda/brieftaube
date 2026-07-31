"use client";
import { useTranslations } from "next-intl";
import { useThemeStore } from "@/store/useThemeStore";
import { Theme } from "@/types/Theme";
import { IoEye } from "react-icons/io5";
import { useIsClient } from "@/hooks/useIsClient";
import { Dropdown, DropdownButton, DropdownContent } from "./ui/dropdown";
import { ThemeRadioOption } from "./theme/ThemeRadioOption";

export default function ThemeSwitch() {
  const t = useTranslations();
  const { theme, switchTheme, getSystemTheme } = useThemeStore();
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownButton buttonStyle={"ghost"} size={"sm"}>
        <IoEye />
      </DropdownButton>

      <DropdownContent>
        <ThemeRadioOption
          radioValue="light"
          checked={theme === Theme.LIGHT}
          label={t("theme-switch.light")}
          onChange={() => switchTheme(Theme.LIGHT)}
        />
        <ThemeRadioOption
          radioValue="dark"
          checked={theme === Theme.DARK}
          label={t("theme-switch.dark")}
          onChange={() => switchTheme(Theme.DARK)}
        />
        <ThemeRadioOption
          radioValue="retro"
          checked={theme === Theme.RETRO}
          label="Retro"
          onChange={() => switchTheme(Theme.RETRO)}
        />
        <ThemeRadioOption
          radioValue="cyberpunk"
          checked={theme === Theme.CYBERPUNK}
          label="Cyberpunk"
          onChange={() => switchTheme(Theme.CYBERPUNK)}
        />
        <ThemeRadioOption
          radioValue={getSystemTheme()}
          checked={theme === Theme.SYSTEM}
          label="System"
          onChange={() => switchTheme(Theme.SYSTEM)}
        />
      </DropdownContent>
    </Dropdown>
  );
}
