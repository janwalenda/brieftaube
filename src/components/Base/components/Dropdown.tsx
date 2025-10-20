import cx from "classnames"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  toggleButtonContent?: React.ReactNode
}

export default function Dropdown({
  children,
  toggleButtonContent,
  className
}: DropdownProps) {
  return (
    <details className="dropdown">
      <summary className={cx('btn', className)}>{toggleButtonContent}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {children}
      </ul>
    </details>
  )
}