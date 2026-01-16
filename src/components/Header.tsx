import LangSwitch from "@/components/LangSwitch";
import ThemeSwitch from "@/components/ThemeSwitch";
import TooltipToggle from "@/components/TooltipToggle";
import { Logo } from "@/components/Logo";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center sticky top-0 z-50 bg-base-100/50 backdrop-blur-xl">
      <div className="w-full max-w-3xl flex items-center justify-between p-4">
        <Logo />
        <div className="flex flex-row items-center gap-2 p-2 bg-base-200 rounded-field">
          <LangSwitch />
          <ThemeSwitch />
          <TooltipToggle />
          <div className="divider divider-horizontal m-0" />
          <UserMenu />
        </div>
      </div>
      <hr className="text-base-300 w-full" />
    </header>
  );
}
