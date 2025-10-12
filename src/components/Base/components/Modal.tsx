import { IoClose } from "react-icons/io5";
import Button from "./Button";
import cx from "classnames";

type DialogProps = React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> & {
  title?: string;
  children?: React.ReactNode;
}

export default function Modal({
  title,
  children,
  className,
  ...props
}: DialogProps) {
  const classes = cx("modal", className);
  return (
    <dialog className={classes} {...props}>
      <div className="modal-box w-11/12 max-w-5xl max-sm:w-full max-sm:rounded-none">
        <div className="flex items-center justify-between w-full">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          <form method="dialog">
            <Button className="btn-ghost btn-circle" tooltip="Modal schließen!">
              <IoClose className="size-1/2" />
            </Button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  )
}
