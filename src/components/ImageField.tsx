import type { ReactNode } from "react";
import { IoImage, IoLink } from "react-icons/io5";
import { useState } from "react";
import { useField } from "@/hooks/useField";
import Select from "@/components/ui/select";
import { ImageWidth } from "@/types/ImageWidth";
import { InputVariant } from "@/types/inputVariant";
import { UniqueIdentifier } from "@dnd-kit/core";
import Field from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input as FileInput } from "@/components/ui/fileInput";
import { LabeledInput } from "@/components/ui/labeledInput";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ImageField({
  legend,
  fieldId: id,
}: {
  legend?: ReactNode;
  fieldId: UniqueIdentifier;
}) {
  const [switchState, setSwitchState] = useState(false);
  const { setFieldProperty, getFieldProperty } = useField();
  const t = useTranslations();

  const urlButtonClass = cn("join-item", {
    'btn-active': !switchState,
  });

  const fileButtonClass = cn("join-item", {
    'btn-active': switchState,
  });

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldProperty(id, 'url', event.target.value);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const result = e.target?.result as string | undefined; // Base64 data
        // Typescript-friendly: handle result appropriately, e.g., set state or call setProperty
        setFieldProperty(id, "url", result || "");

        const urlInput =
          document.getElementById("headerImageUrl") as HTMLInputElement | null;

        if (urlInput) {
          urlInput.value = "";
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFieldProperty(id, "url", "");
    }
  }

  const handleWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldProperty(id, 'width', event.target.value);
  }

  return (
    <Field legend={legend} fieldId={id}>
      <div className="join">
        <Button className={urlButtonClass}
          onClick={() => setSwitchState(false)}
          tooltip={{ content: t('image-field.button.url') }}
          variant={InputVariant.Neutral}
        >
          <IoLink />
        </Button>
        <Button className={fileButtonClass}
          onClick={() => setSwitchState(true)}
          tooltip={{ content: t('image-field.button.upload') }}
          variant={InputVariant.Neutral}
        >
          <IoImage />
        </Button>
      </div>
      {!switchState && <LabeledInput placeholder="URL"
        startIcon={<IoLink />}
        value={getFieldProperty(id, "url")}
        onChange={handleURLChange}
        className="w-full"
      />}
      {switchState && <FileInput onChange={handleFileChange}
        className="w-full"
      />}
      <Select id={`image_width_${id}`}
        defaultValue={getFieldProperty(id, 'width')}
        onChange={handleWidthChange}
        tooltip={{ content: t('image-field.width') }}
        className="w-full"
      >
        <option value={ImageWidth.SM}>{t('image-field.small')} (6rem)</option>
        <option value={ImageWidth.MD}>{t('image-field.medium')} (12rem)</option>
        <option value={ImageWidth.FULL}>{t('image-field.large')} (100%)</option>
      </Select>
    </Field>
  );
}
