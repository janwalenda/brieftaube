import { IoReorderThreeOutline, IoTrash } from "react-icons/io5";
import { useField } from "../../../hooks/useField";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import Fieldset from "../Fieldset/Fieldset";
import { FieldProps } from "./FieldProps";
import { InputVariant } from "@/components/ui/Shared/InputVariant";
import { TooltipPosition } from "@/components/ui/Shared/TooltipPosition";
import { useTranslateStore } from "@/store/useTranslateStore";

export default function Field({
  children,
  fieldId,
  ...props
}: FieldProps) {
  const { removeField } = useField();
  const { t } = useTranslateStore();

  const { listeners } = useSortable({
    id: fieldId,
  });

  return (
    <Fieldset {...props}>
      {typeof fieldId !== "undefined" && (
        <div className="flex w-full items-center justify-end gap-2">
          <Button {...listeners} className="btn btn-sm btn-square cursor-grab">
            <IoReorderThreeOutline />
          </Button>
          <Button
            className="btn-sm btn-square"
            onClick={handleDelete}
            variant={InputVariant.Neutral}
            tooltip={{
              content: t('field.delete'),
              placement: TooltipPosition.Left
            }}
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
