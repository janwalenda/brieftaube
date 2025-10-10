import { IoHandLeft, IoTrash } from "react-icons/io5";
import { useField } from "../../../hooks/useField";
import { InputVariant } from "../types/InputVariant";
import Button from "./Button";
import { TooltipPosition } from "../types/TooltipPosition";
import { DetailedHTMLProps, FieldsetHTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import Fieldset from "./Fieldset";
import { useTranslate } from "@/hooks/useTranslate";

type FieldProps = DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
  legend: React.ReactNode;
  children: React.ReactNode;
  fieldId: UniqueIdentifier;
}

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
