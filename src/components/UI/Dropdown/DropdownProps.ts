import { DetailedHTMLProps, HTMLAttributes } from "react";

export type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  toggleButtonContent?: React.ReactNode;
};
