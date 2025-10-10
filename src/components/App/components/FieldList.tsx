import { useField } from "../../../hooks/useField";
import { FieldSwitch } from "@/components/InputFields"
import { IoInformationCircle } from "react-icons/io5";
import Button from "../../Base/components/Button";
import { TooltipPosition } from "@/components/Base/types/TooltipPosition";
import { InputVariant } from "@/components/Base/types/InputVariant";
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTranslate } from "@/hooks/useTranslate";

export default function FieldList() {
  const { mail, setMail } = useField();
  const { t } = useTranslate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <>
      {mail.fields.length > 0 && (
        <div className="grid grid-cols-1 px-4 pb-4 pt-8 gap-4 w-full max-w-3xl bg-base-100 rounded-field max-sm:rounded-none relative">
          <div className="absolute right-2 top-2">
            <Button
              className="btn-circle btn-info btn-sm"
              tooltip={t('fields.info')}
              tooltipPosition={TooltipPosition.Left}
              variant={InputVariant.Ghost}
            >
              <IoInformationCircle />
            </Button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={mail.fields.map(f => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {mail.fields.map((field, index) => <FieldSwitch {...field} index={index} key={`field-${field.id}`} />)}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if(!over) return;

    if (active.id !== over.id) {

      setMail((items) => {
        const oldIndex = items.fields.findIndex(({ id }) => {
          return id === active.id;
        });

        const newIndex = items.fields.findIndex(({ id }) => {
          return id === over.id;
        });
        
        return {
          ...mail,
          fields: arrayMove(items.fields, oldIndex, newIndex),
        }
      });
    }
  }
}
