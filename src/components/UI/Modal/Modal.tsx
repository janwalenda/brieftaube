import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import cx from "classnames";
import { TooltipPosition } from "../Shared/TooltipPosition";
import { useTranslate } from "@/hooks/useTranslate";
import { ModalProps } from "./ModalProps";

export default function Modal({
  title,
  children,
  className,
  ...props
}: ModalProps) {
  const { t } = useTranslate(); 
  return (
    <dialog className={cx([
      "modal", 
      "backdrop:backdrop-blur-lg",
      className
      ])} {...props}>
      <div className="modal-box w-11/12 max-w-5xl max-sm:w-full max-sm:rounded-none">
        <div className="flex items-center justify-between w-full">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          <form method="dialog">
            <Button className="btn-ghost btn-circle" tooltip={t('modal.close')} tooltipPosition={TooltipPosition.Left}>
              <IoClose className="size-1/2" />
            </Button>
          </form>
        </div>
        {children}
      </div>
    </dialog>
  )
}
