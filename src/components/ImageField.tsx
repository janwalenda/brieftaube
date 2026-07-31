import type { ReactNode } from "react";
import { IoLink } from "react-icons/io5";
import { useState } from "react";
import { useField } from "@/hooks/useField";
import Select from "@/components/ui/select";
import { ImageWidth } from "@/types/ImageWidth";
import { type UniqueIdentifier } from "@dnd-kit/core";
import Field from "@/components/ui/field";
import { Input as FileInput } from "@/components/ui/fileInput";
import { LabeledInput } from "@/components/ui/labeledInput";
import { useTranslations } from "next-intl";
import { ImageSourceToggle } from "@/components/imageField/ImageSourceToggle";
import { useImageUpload } from "@/components/imageField/useImageUpload";
import LoggedIn from "@/components/LoggedIn";
import { TemplateKeyBindButton } from "@/components/templating/TemplateKeyBindButton";

export default function ImageField({
  legend,
  fieldId: id,
}: {
  legend?: ReactNode;
  fieldId: UniqueIdentifier;
}) {
  const [useFile, setUseFile] = useState(false);
  const { setFieldProperty, getFieldProperty } = useField();
  const { handleFileChange } = useImageUpload(id);
  const t = useTranslations();

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldProperty(id, "url", event.target.value);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldProperty(id, "width", event.target.value);
  };

  return (
    <Field legend={legend} fieldId={id}>
      <ImageSourceToggle useFile={useFile} onChange={setUseFile} />
      {!useFile && (
        <div className="flex gap-2 w-full items-center">
          <LabeledInput
            placeholder="URL"
            startIcon={<IoLink />}
            value={getFieldProperty(id, "url")}
            onChange={handleURLChange}
            className="w-full"
          />
          <LoggedIn>
            <TemplateKeyBindButton fieldId={id} property="url" />
          </LoggedIn>
        </div>
      )}
      {useFile && <FileInput onChange={handleFileChange} className="w-full" />}
      <Select
        id={`image_width_${id}`}
        defaultValue={getFieldProperty(id, "width")}
        onChange={handleWidthChange}
        tooltip={{ content: t("image-field.width") }}
        className="w-full"
      >
        <option value={ImageWidth.SM}>{t("image-field.small")} (6rem)</option>
        <option value={ImageWidth.MD}>{t("image-field.medium")} (12rem)</option>
        <option value={ImageWidth.FULL}>{t("image-field.large")} (100%)</option>
      </Select>
    </Field>
  );
}
