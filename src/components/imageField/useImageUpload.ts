import { type UniqueIdentifier } from "@dnd-kit/core";
import { useField } from "@/hooks/useField";

export function useImageUpload(id: UniqueIdentifier) {
  const { setFieldProperty } = useField();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const file = files && files[0];

    if (!file) {
      setFieldProperty(id, "url", "");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string | undefined;
      setFieldProperty(id, "url", result || "");
    };
    reader.readAsDataURL(file);
  }

  return { handleFileChange };
}
