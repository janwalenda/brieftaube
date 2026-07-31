import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Tooltip } from "./tooltip";
import { Link } from "@/i18n/navigation";
import {
  buttonVariants,
  type ButtonProps,
  type LinkProps,
} from "./buttonVariants";

function Button(props: ButtonProps): React.JSX.Element;
function Button(props: LinkProps): React.JSX.Element;
function Button({
  className,
  variant,
  size,
  buttonStyle,
  behavior,
  modifier,
  asChild = false,
  asLink = false,
  tooltip,
  ...props
}: ButtonProps | LinkProps) {
  const Comp = asChild ? Slot : "button";
  const classes = cn(
    buttonVariants({
      variant,
      size,
      behavior,
      modifier,
      buttonStyle,
      className,
    }),
  );

  if (asLink) {
    const { href, ...linkProps } = props as React.ComponentProps<"a"> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...linkProps}>
        {props.children}
      </Link>
    );
  }

  return (
    <>
      {tooltip ? (
        <Tooltip
          variant={variant}
          content={tooltip?.content}
          placement={tooltip?.placement}
        >
          <Comp
            data-slot="button"
            className={classes}
            {...(props as React.ComponentProps<"button">)}
          >
            {props.children}
          </Comp>
        </Tooltip>
      ) : (
        <Comp
          data-slot="button"
          className={classes}
          {...(props as React.ComponentProps<"button">)}
        >
          {props.children}
        </Comp>
      )}
    </>
  );
}

export { Button, buttonVariants, type ButtonProps };
