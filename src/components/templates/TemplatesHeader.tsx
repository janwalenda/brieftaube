"use client";
import { useTranslations } from "next-intl";
import { H2 } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";

export function TemplatesHeader({ title }: { title: string }) {
  const gt = useTranslations("global");

  return (
    <div className="flex flex-row items-center gap-2 mb-6">
      <Link href="/">
        <Button
          variant={InputVariant.Neutral}
          buttonStyle="ghost"
          className="btn-circle"
          tooltip={{ content: gt("back"), placement: TooltipPosition.Right }}
        >
          <IoArrowBack className="size-6" />
        </Button>
      </Link>
      <H2>{title}</H2>
    </div>
  );
}
