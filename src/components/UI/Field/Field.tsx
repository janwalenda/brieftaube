import { IoHandLeft, IoTrash } from "react-icons/io5";
import { useField } from "../../../hooks/useField";
import { InputVariant } from "../Shared/InputVariant";
import Button from "../Button/Button";
import { TooltipPosition } from "../Shared/TooltipPosition";
import { useSortable } from "@dnd-kit/sortable";
import Fieldset from "../Fieldset/Fieldset";
import { useTranslate } from "@/hooks/useTranslate";
import { FieldProps } from "./FieldProps";

export default function Field({
  children,
  fieldId,
  ...props
}: FieldProps) {
  const { removeField } = useField();
  const { t } = useTranslate();

  const { listeners } = useSortable({
    id: fieldId,
  });

  return (
    <Fieldset {...props}>
      {typeof fieldId !== "undefined" && (
        <div className="flex w-full items-center justify-end gap-2">
          <Button {...listeners} className="btn btn-sm btn-square cursor-grab">
            <IoHandLeft />
          </Button>
          <Button
            className="btn-sm btn-square"
            onClick={handleDelete}
            variant={InputVariant.Neutral}
            tooltip={t('field.delete')}
            tooltipPosition={TooltipPosition.Left}
          >
            <IoTrash />
          </Button>
        </div>
      )}
      {children}
    </Fieldset>
  );

  function handleDelete() {
    removeField(fieldId);
  }
}
