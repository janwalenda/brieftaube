import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn(playfairDisplay.className, "text-4xl font-bold", className)} {...props} />
  )
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn(playfairDisplay.className, "text-3xl font-bold", className)} {...props} />
  )
}

export function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn(playfairDisplay.className, "text-2xl font-bold", className)} {...props} />
  )
}

export function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn(playfairDisplay.className, "text-xl font-bold", className)} {...props} />
  )
}

export function H5({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5 className={cn(playfairDisplay.className, "text-lg font-bold", className)} {...props} />
  )
}

export function H6({ className, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6 className={cn(playfairDisplay.className, "text-base font-bold", className)} {...props} />
  )
}
