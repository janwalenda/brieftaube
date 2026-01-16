"use client"
import { H1 } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import DesignEditor from "@/components/DesignEditor";
import { use } from "react";

export default function TemplateDesignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('design');
  const gt = useTranslations('global');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="flex flex-row items-center gap-2 mb-6">
        <Button
          variant={InputVariant.Neutral}
          buttonStyle="ghost"
          modifier="circle"
          tooltip={{
            content: gt("back"),
            placement: TooltipPosition.Right
          }}
          asChild
        >
          <Link href={`/templates/${id}`}>
            <IoArrowBack className="size-6" />
          </Link>
        </Button>
        <H1>{t('title')}</H1>
      </div>
      <DesignEditor />
    </div>
  );
}
