"use client"
import { IoImage, IoLink, IoText } from "react-icons/io5"
import { Input } from "@/components/Base"
import { useField } from "@/hooks/useField"
import { useState } from "react";
import cx from "classnames";
import {
  FileInput,
  Textarea,
  Button
} from "@/components/Base";
import { InputVariant } from "@/components/Base/types/InputVariant";
import { PresetDrawer } from "@/components/Action";
import { useTranslate } from "@/hooks/useTranslate";
import ColorInput from "@/components/Base/components/ColorInput";
import { InputForm } from "@/components/Base/types/InputForm";

export default function MailHeader() {
  const {
    mail,
    setTitle,
    setLogoUrl,
    setSalutation,
    setMainContent,
    setPrimaryColor,
  } = useField();
  const [switchState, setSwitchState] = useState(false);
  const { t } = useTranslate();

  const urlButtonClass = cx("join-item", {
    'btn-active': !switchState,
  });

  const fileButtonClass = cx("join-item", {
    'btn-active': switchState,
  });

  return (
    <div className="p-4 flex flex-col gap-4 w-full max-w-3xl items-center justify-center">
      <PresetDrawer />
      <ColorInput
        placeholder="#eeeeee"
        value={mail.primaryColor}
        variant={InputVariant.Primary}
        form={InputForm.Block}
        onChange={(event) => setPrimaryColor(event.target.value)}
      />
      <div className="w-full">
        <div className="join mb-4">
          <Button className={urlButtonClass}
            onClick={() => setSwitchState(false)}
            tooltip={t('image-field.button.url')}
            variant={InputVariant.Primary}
          >
            <IoLink />
          </Button>
          <Button className={fileButtonClass}
            onClick={() => setSwitchState(true)}
            tooltip={t('image-field.button.upload')}
            variant={InputVariant.Primary}
          >
            <IoImage />
          </Button>
        </div>
        {!switchState &&
          <Input variant={InputVariant.Primary}
            placeholder="URL"
            startIcon={<IoLink/>}
            onChange={handleURLChange}
            className="w-full"
            value={mail.image}
          />}
        {switchState && <div className="w-full">
          <FileInput variant={InputVariant.Primary}
            onChange={handleFileChange}
            className="w-full"
          />
        </div>}
      </div>
      <Input variant={InputVariant.Primary}
        placeholder="Titel"
        startIcon={<IoText/>}
        className="w-full"
        onChange={(e) => setTitle(e.target.value)}
        value={mail.title}
        tooltip={t('email.title')}
      />
      <Input variant={InputVariant.Primary}
        placeholder="Anrede"
        className="w-full"
        onChange={(e) => setSalutation(e.target.value)}
        value={mail.salutation}
        tooltip={t('email.salutation')}
      />
      <Textarea variant={InputVariant.Primary}
        className="w-full"
        onChange={(value) => handleMainBodyChange(value || "")}
        value={mail.mainContent}
        tooltip={t('email.main-content')}
      />
    </div>
  );

  function handleURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLogoUrl(event.target.value);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const file = files && files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const result = e.target?.result as string | undefined; // Base64 data

        // Typescript-friendly: handle result appropriately, e.g., set state or call setProperty
        setLogoUrl(result || "");
        const urlInput = document.getElementById("headerImageUrl") as HTMLInputElement | null;
        if (urlInput) {
          urlInput.value = "";
        }
      };
      reader.readAsDataURL(file);
    } else {
      setLogoUrl("");
    }
  }

  function handleMainBodyChange(value: string | undefined) {
    setMainContent(value)
  }
}
