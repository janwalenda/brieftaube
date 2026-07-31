import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useField } from "@/hooks/useField";

export function useFieldDragAndDrop() {
  const { mail, setMail } = useField();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setMail((items) => {
      const oldIndex = items.fields.findIndex(({ id }) => id === active.id);
      const newIndex = items.fields.findIndex(({ id }) => id === over.id);

      return {
        ...mail,
        fields: arrayMove(items.fields, oldIndex, newIndex),
      };
    });
  }

  return { sensors, collisionDetection: closestCenter, handleDragEnd };
}
