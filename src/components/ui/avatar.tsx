import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Image from "next/image"

const avatarVariants = cva("avatar", {
  variants: {
    status: {
      online: "avatar-online",
      offline: "avatar-offline",
    },
    placeholder: {
      true: "avatar-placeholder",
    },
  },
})

const avatarSizeVariants = cva("", {
  variants: {
    size: {
      xs: "size-8",
      sm: "size-12",
      md: "size-16",
      lg: "size-24",
      xl: "size-32",
    },
    rounded: {
      default: "rounded",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "full",
  },
})

type AvatarProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> &
  VariantProps<typeof avatarSizeVariants> & {
    asChild?: boolean
  }

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
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(avatarVariants({ status, placeholder, className }))}
      {...props}
    >
      <div className={cn(avatarSizeVariants({ size, rounded }))}>
        {children}
      </div>
    </Comp>
  )
}

type AvatarImageProps = Omit<React.ComponentProps<typeof Image>, "alt"> & {
  alt?: string
}

function AvatarImage({ alt = "Avatar", className, ...props }: AvatarImageProps) {
  return (
    <Image
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  )
}

type AvatarFallbackProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarSizeVariants> & {
    asChild?: boolean
  }

const fallbackTextVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-xl",
      lg: "text-3xl",
      xl: "text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

function AvatarFallback({
  asChild,
  className,
  size,
  rounded,
  children,
  ...props
}: AvatarFallbackProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(
        "bg-neutral text-neutral-content flex items-center justify-center",
        avatarSizeVariants({ size, rounded }),
        fallbackTextVariants({ size }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

type AvatarGroupProps = React.ComponentProps<"div"> & {
  asChild?: boolean
}

function AvatarGroup({ asChild, className, ...props }: AvatarGroupProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={cn("avatar-group -space-x-6", className)} {...props} />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  avatarVariants,
  avatarSizeVariants,
  type AvatarProps,
}
