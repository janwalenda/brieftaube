import { IoChevronDown, IoChevronUp, IoReorderThreeOutline, IoTrash } from "react-icons/io5";
import { useField } from "@/hooks/useField";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import Fieldset from "@/components/ui/fieldset";
import { type FieldProps } from "@/types/fieldProps";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { useTranslations } from "next-intl";

export default function Field({
  children,
  fieldId,
  ...props
}: FieldProps) {
  const { removeField, moveField, getFieldIndex, getFieldCount } = useField();
  const t = useTranslations();

  const index = typeof fieldId !== "undefined" ? getFieldIndex(fieldId) : -1;
  const count = getFieldCount();

  const { listeners } = useSortable({
    id: fieldId,
  });

  return (
    <Fieldset {...props}>
      {typeof fieldId !== "undefined" && (
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            className="btn-sm btn-square"
            onClick={() => handleMove("up")}
            disabled={index === 0}
            variant={InputVariant.Neutral}
            tooltip={{
              content: t("field.move_up"),
              placement: TooltipPosition.Left,
            }}
          >
            <IoChevronUp />
          </Button>
          <Button
            className="btn-sm btn-square"
            onClick={() => handleMove("down")}
            disabled={index === count - 1}
            variant={InputVariant.Neutral}
            tooltip={{
              content: t("field.move_down"),
              placement: TooltipPosition.Left,
            }}
          >
            <IoChevronDown />
          </Button>
          <Button {...listeners} className="btn btn-sm btn-square cursor-grab">
            <IoReorderThreeOutline />
          </Button>
          <Button
            className="btn-sm btn-square"
            onClick={handleDelete}
            variant={InputVariant.Neutral}
            tooltip={{
              content: t("field.delete"),
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

  function handleMove(direction: "up" | "down") {
    if (typeof fieldId !== "undefined") {
      moveField(fieldId, direction);
    }
  }
}
