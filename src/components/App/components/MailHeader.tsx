"use client"
import { useField } from "@/hooks/useField"
import { InputVariant } from "@/components/Base/types/InputVariant";
import ColorInput from "@/components/Base/components/ColorInput";
import { InputForm } from "@/components/Base/types/InputForm";

export default function MailHeader() {
  const {
    mail,
    setPrimaryColor,
  } = useField();

  return (
    <div className="px-4 flex flex-col gap-4 w-full max-w-3xl items-center justify-center relative pb-4">
      <ColorInput
        color={mail.primaryColor}
        variant={InputVariant.Primary}
        form={InputForm.Block}
        onChange={setPrimaryColor}
      />
    </div>
  );
}
