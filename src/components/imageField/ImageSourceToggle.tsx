"use client";
import { IoImage, IoLink } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { InputVariant } from "@/types/inputVariant";
import { cn } from "@/lib/utils";

interface ImageSourceToggleProps {
  useFile: boolean;
  onChange: (useFile: boolean) => void;
}

export function ImageSourceToggle({
  useFile,
  onChange,
}: ImageSourceToggleProps) {
  const t = useTranslations();

  return (
    <div className="join">
      <Button
        className={cn("join-item", { "btn-active": !useFile })}
        onClick={() => onChange(false)}
        tooltip={{ content: t("image-field.button.url") }}
        variant={InputVariant.Neutral}
      >
        <IoLink />
      </Button>
      <Button
        className={cn("join-item", { "btn-active": useFile })}
        onClick={() => onChange(true)}
        tooltip={{ content: t("image-field.button.upload") }}
        variant={InputVariant.Neutral}
      >
        <IoImage />
      </Button>
    </div>
  );
}
