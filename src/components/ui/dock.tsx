import { cn } from "@/lib/utils";

export default function Dock({
  children,
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      {...props}
      className={cn(className, [
        "sticky",
        "bottom-0",
        "left-0",
        "mt-2",
        "max-sm:right-0",
        "max-sm:w-full",
        "md:bottom-4",
        "md:left-1/2",
        "md:transform-[translate(-50%,0)]",
        "flex",
        "flex-row",
        "justify-center",
        "items-center",
        "gap-2",
        "bg-base-100/30",
        "backdrop-blur-lg",
        "md:rounded-full",
        "p-2",
        "hover:opacity-100",
        "md:border",
        "border-primary",
      ])}
    >
      {children}
    </nav>
  );
}
