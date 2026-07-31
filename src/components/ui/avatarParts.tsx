import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { avatarSizeVariants, fallbackTextVariants } from "./avatarVariants";

type AvatarImageProps = Omit<React.ComponentProps<typeof Image>, "alt"> & {
  alt?: string;
};

export function AvatarImage({
  alt = "Avatar",
  className,
  ...props
}: AvatarImageProps) {
  return (
    <Image alt={alt} className={cn("object-cover", className)} {...props} />
  );
}

type AvatarFallbackProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarSizeVariants> & {
    asChild?: boolean;
  };

export function AvatarFallback({
  asChild,
  className,
  size,
  rounded,
  children,
  ...props
}: AvatarFallbackProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "bg-neutral text-neutral-content flex items-center justify-center",
        avatarSizeVariants({ size, rounded }),
        fallbackTextVariants({ size }),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

type AvatarGroupProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export function AvatarGroup({
  asChild,
  className,
  ...props
}: AvatarGroupProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={cn("avatar-group -space-x-6", className)} {...props} />
  );
}
