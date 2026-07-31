import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { avatarVariants, avatarSizeVariants } from "./avatarVariants";

type AvatarProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> &
  VariantProps<typeof avatarSizeVariants> & {
    asChild?: boolean;
  };

function Avatar({
  asChild,
  className,
  status,
  placeholder,
  size,
  rounded,
  children,
  ...props
}: AvatarProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(avatarVariants({ status, placeholder, className }))}
      {...props}
    >
      <div className={cn(avatarSizeVariants({ size, rounded }))}>
        {children}
      </div>
    </Comp>
  );
}

export { AvatarImage, AvatarFallback, AvatarGroup } from "./avatarParts";
export { Avatar, avatarVariants, avatarSizeVariants, type AvatarProps };
