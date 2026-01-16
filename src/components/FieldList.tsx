"use client"
import { useField } from "@/hooks/useField";
import FieldSwitch from "@/components/FieldSwitch"
import { IoInformationCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { TooltipPosition } from "@/types/tooltipPosition";
import { InputVariant } from "@/types/inputVariant";
import { closestCenter, DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function FieldList() {
  const { mail, setMail } = useField();
  const t = useTranslations();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {mail.fields.length > 0 && (
        <div className="
          bg-base-100 
          mt-4 
          relative 
          p-4 
          space-y-4 
          min-lg:rounded-field 
          min-w-1/3 
          w-full 
          md:w-1/2 
          lg:w-3xl
        ">
          <div className="absolute right-2 top-2">
            <Button
              className="btn-circle btn-info btn-sm"
              tooltip={{
                placement: TooltipPosition.Left,
                content: t("fields.info"),
              }}
              buttonStyle={InputVariant.Ghost}
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
    const { active, over } = event;

    if (!over) return;

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
