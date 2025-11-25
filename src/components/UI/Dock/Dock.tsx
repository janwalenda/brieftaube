import cx from "classnames";
import { DockProps } from "./DockProps";

export default function Dock({ children }: DockProps) {
  return (
    <nav className={cx([
      "fixed",
      "bottom-4",
      "left-1/2",
      "transform-[translate(-50%,0)]",
      "flex",
      "flex-row",
      "justify-center",
      "items-center",
      "gap-2",
      "bg-base-100/30",
      "backdrop-blur-lg",
      "rounded-full",
      "p-2",
      "hover:opacity-100",
      "border",
      "border-primary"
    ])}>
      {children}
    </nav>
  )
}
