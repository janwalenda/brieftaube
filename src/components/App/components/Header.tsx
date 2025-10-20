"use client";
import { LangSwitch, ThemeSwitch, PresetDrawer } from "../../Action";
import TooltipToggle from "../../Action/components/TooltipToggle";
import { Logo } from "../../Logo";

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center sticky top-0 z-50 bg-base-100/50 backdrop-blur-xl">
  <div className="w-full max-w-3xl flex items-center justify-between p-4">
    <Logo />
    <div className="flex flex-row items-center gap-2 p-2 bg-base-200 rounded-field">
      <TooltipToggle />
      <LangSwitch />
      <ThemeSwitch />
      <PresetDrawer />
    </div>
  </div>
                <hr className="text-base-300 w-full" />
  </header>
  );
}
