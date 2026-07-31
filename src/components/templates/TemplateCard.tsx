"use client";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoTrash, IoOpen, IoPencil, IoDocumentText } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import type { TemplateSummary } from "@/hooks/useTemplatesList";

interface TemplateCardProps {
  template: TemplateSummary;
  onLoad: () => void;
  onFill: () => void;
  onDelete: () => void;
}

export function TemplateCard({
  template,
  onLoad,
  onFill,
  onDelete,
}: TemplateCardProps) {
  const t = useTranslations("templates");

  return (
    <Card cardStyle="border" className="w-full max-w-4xl">
      <CardBody className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{template.name}</CardTitle>
          <p className="text-sm text-base-content/60">
            {t("lastUpdated")}:{" "}
            {new Date(template.updated_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={onLoad}>
            <IoOpen className="size-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onFill}
            title={t("fillAction")}
          >
            <IoDocumentText className="size-4" />
          </Button>
          <Button size="sm" variant="primary" asChild>
            <Link href={`/templates/${template.id}`}>
              <IoPencil className="size-4" />
            </Link>
          </Button>
          <Button size="sm" variant="error" onClick={onDelete}>
            <IoTrash className="size-4" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
