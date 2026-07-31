"use client";
import { useField } from "@/hooks/useField";
import FieldSwitch from "@/components/FieldSwitch";
import { IoInformationCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { TooltipPosition } from "@/types/tooltipPosition";
import { InputVariant } from "@/types/inputVariant";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useIsClient } from "@/hooks/useIsClient";
import { useFieldDragAndDrop } from "@/hooks/useFieldDragAndDrop";
import AddButton from "./AddButton";

export default function FieldList() {
  const { mail } = useField();
  const t = useTranslations();
  const isClient = useIsClient();
  const { sensors, collisionDetection, handleDragEnd } = useFieldDragAndDrop();

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="
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
        "
    >
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
      <AddButton index={0} />
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={mail.fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {mail.fields.map((field, index) => (
            <FieldSwitch {...field} index={index} key={`field-${field.id}`} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
