"use client"
import { H3 } from "@/components/ui/heading";
import {
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { useMailStore } from "@/store/useMailStore";
import { InputVariant } from "@/types/inputVariant";
import { ColorInput } from "@/components/ui/colorInput";
import { Range } from "@/components/ui/range";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/card";

export default function DesignEditor() {
  const { mail, setPrimaryColor, setRoundedCorners } = useMailStore();
  const t = useTranslations('design');

  const handleRangeChange:
    ChangeEventHandler<HTMLInputElement> = (newRoundedCorners) =>
      setRoundedCorners(parseFloat(newRoundedCorners.target.value));

  const handleInputChange:
    ChangeEventHandler<HTMLInputElement> = (newRoundedCorners) =>
      setRoundedCorners(parseFloat(newRoundedCorners.target.value));

  const handleColorInputChange:
    ((newColor: string) => void) &
    FormEventHandler<HTMLDivElement> = (newColor) =>
      setPrimaryColor(newColor as string);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="w-full">
        <CardBody>
          <H3>{t('primaryColor.label')}</H3>
          <p className="text-sm opacity-70 mb-4">
            {t('primaryColor.description')}
          </p>
          <ColorInput
            className="w-full"
            color={mail.primaryColor}
            variant={InputVariant.Secondary}
            onChange={handleColorInputChange}
          />
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody>
          <H3>{t('roundedCorners.label')}</H3>
          <p className="text-sm opacity-70 mb-4">{t('roundedCorners.description')}</p>
          <div className="flex gap-4 items-center">
            <Range
              className="flex-1"
              value={mail.roundedCorners}
              onChange={handleRangeChange}
              rangeSize={"sm"}
              min={0}
              max={2}
              step={0.25}
            />
            <Input
              className="w-20"
              type="number"
              sizeVariant="sm"
              min={0}
              max={2}
              step={0.25}
              value={mail.roundedCorners}
              onChange={handleInputChange}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
