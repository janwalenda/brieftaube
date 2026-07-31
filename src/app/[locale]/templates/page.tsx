"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/heading";
import { IoDocument, IoArrowBack } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { useTemplatesPage } from "@/hooks/useTemplatesPage";
import { TemplateListItem } from "@/components/templatesPage/TemplateListItem";

export default function TemplatesPage() {
  const t = useTranslations("templates");
  const gt = useTranslations("global");
  const { isPending, loading, error, templates, handleDelete, handleLoad } =
    useTemplatesPage();

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-3xl">
      <div className="w-full max-w-4xl">
        <div className="flex flex-row items-center gap-2 mb-6">
          <Link href="/">
            <Button
              variant={InputVariant.Neutral}
              buttonStyle="ghost"
              className="btn-circle"
              tooltip={{
                content: gt("back"),
                placement: TooltipPosition.Right,
              }}
            >
              <IoArrowBack className="size-6" />
            </Button>
          </Link>
          <H2>{t("title")}</H2>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {templates.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {templates.map((template) => (
              <TemplateListItem
                key={template.id}
                template={template}
                lastUpdatedLabel={t("lastUpdated")}
                onLoad={handleLoad}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
