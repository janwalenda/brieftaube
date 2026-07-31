"use client";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoDocument } from "react-icons/io5";

export function TemplatesEmptyState() {
  const t = useTranslations("templates");

  return (
    <Card className="text-center">
      <CardBody>
        <IoDocument className="size-16 mx-auto text-base-content/30 mb-4" />
        <p className="text-base-content/60">{t("noTemplates")}</p>
        <CardAction>
          <Button asLink href="/" variant="primary">
            {t("createFirst")}
          </Button>
        </CardAction>
      </CardBody>
    </Card>
  );
}
