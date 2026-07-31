"use client";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "@/components/ui/dropdown";
import {
  IoTrash,
  IoOpen,
  IoPencil,
  IoDocumentText,
  IoEllipsisVertical,
} from "react-icons/io5";
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
      <CardBody className="flex flex-row items-center justify-between gap-4">
        <div className="min-w-0">
          <CardTitle>{template.name}</CardTitle>
          <p className="text-sm text-base-content/60">
            {t("lastUpdated")}:{" "}
            {new Date(template.updated_at).toLocaleDateString()}
          </p>
        </div>
        <Dropdown placement="end">
          <DropdownButton
            size="sm"
            variant="neutral"
            modifier="square"
            aria-label={t("actions")}
          >
            <IoEllipsisVertical className="size-4" />
          </DropdownButton>
          <DropdownContent>
            <li>
              <button type="button" onClick={onLoad}>
                <IoOpen className="size-4" />
                {t("openAction")}
              </button>
            </li>
            <li>
              <button type="button" onClick={onFill}>
                <IoDocumentText className="size-4" />
                {t("fillAction")}
              </button>
            </li>
            <li>
              <Link href={`/templates/${template.id}`}>
                <IoPencil className="size-4" />
                {t("editAction")}
              </Link>
            </li>
            <li>
              <button type="button" onClick={onDelete} className="text-error">
                <IoTrash className="size-4" />
                {t("deleteAction")}
              </button>
            </li>
          </DropdownContent>
        </Dropdown>
      </CardBody>
    </Card>
  );
}
