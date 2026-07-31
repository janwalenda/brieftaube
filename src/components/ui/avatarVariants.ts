import { cva } from "class-variance-authority";

export const avatarVariants = cva("avatar", {
  variants: {
    status: {
      online: "avatar-online",
      offline: "avatar-offline",
    },
    placeholder: {
      true: "avatar-placeholder",
    },
  },
});

export const avatarSizeVariants = cva("", {
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
});

export const fallbackTextVariants = cva("", {
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
});
