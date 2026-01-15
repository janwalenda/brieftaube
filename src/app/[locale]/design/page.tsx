"use client"
import { H1, H3 } from "@/components/ui/heading";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState
} from "react";
import { useMailStore } from "@/store/useMailStore";
import { InputVariant } from "@/types/inputVariant";
import { ColorInput } from "@/components/ui/colorInput";
import { Divider } from "@/components/ui/divider";
import { Range } from "@/components/ui/range";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@/components/ui/card";
import { TooltipPosition } from "@/types/tooltipPosition";

export default function DesignPage() {
  const { mail, setPrimaryColor, setRoundedCorners } = useMailStore();
  const t = useTranslations('design');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
    <div className="container mx-auto max-w-3xl p-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <Link href="/">
          <Button
            variant={InputVariant.Neutral}
            buttonStyle="ghost"
            className="btn-circle"
            tooltip={{
              content: t('back'),
              placement: TooltipPosition.Right
            }}
          >
            <IoArrowBack className="size-6" />
          </Button>
        </Link>
        <H1>Design</H1>
      </div>
      <Divider />
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
    </div>
  );
}