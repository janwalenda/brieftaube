import { IoTrash, IoOpen, IoPencil } from "react-icons/io5";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { TemplateSummary } from "@/hooks/useTemplatesPage";

interface TemplateListItemProps {
  template: TemplateSummary;
  lastUpdatedLabel: string;
  onLoad: (templateId: string) => void;
  onDelete: (templateId: string) => void;
}

export function TemplateListItem({
  template,
  lastUpdatedLabel,
  onLoad,
  onDelete,
}: TemplateListItemProps) {
  return (
    <Card cardStyle="border" className="w-full max-w-4xl">
      <CardBody className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{template.name}</CardTitle>
          <p className="text-sm text-base-content/60">
            {lastUpdatedLabel}:{" "}
            {new Date(template.updated_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onLoad(template.id)}
          >
            <IoOpen className="size-4" />
          </Button>
          <Button size="sm" variant="primary" asChild>
            <Link href={`/templates/${template.id}`}>
              <IoPencil className="size-4" />
            </Link>
          </Button>
          <Button
            size="sm"
            variant="error"
            onClick={() => onDelete(template.id)}
          >
            <IoTrash className="size-4" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
