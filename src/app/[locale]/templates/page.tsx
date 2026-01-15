"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { listTemplates, deleteTemplate, loadTemplate } from "@/actions/templates";
import { useField } from "@/hooks/useField";
import { Card, CardBody, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/heading";
import { IoTrash, IoOpen, IoDocument } from "react-icons/io5";

interface Template {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export default function TemplatesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const t = useTranslations("templates");
  const { setMail } = useField();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user) {
      fetchTemplates();
    }
  }, [session, isPending, router]);

  async function fetchTemplates() {
    setLoading(true);
    const result = await listTemplates();
    if (result.error) {
      setError(result.error);
    } else {
      setTemplates(result.templates as Template[]);
    }
    setLoading(false);
  }

  async function handleLoad(templateId: string) {
    const result = await loadTemplate(templateId);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.template) {
      console.log(result.template);
      setMail(() => result.template!.content);
      router.push("/");
    }
  }

  async function handleDelete(templateId: string) {
    if (!confirm(t("confirmDelete"))) return;

    const result = await deleteTemplate(templateId);
    if (result.error) {
      setError(result.error);
    } else {
      setTemplates(templates.filter((t) => t.id !== templateId));
    }
  }

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <H2 className="mb-6">{t("title")}</H2>

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
              <Card key={template.id} cardStyle="border">
                <CardBody className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <p className="text-sm text-base-content/60">
                      {t("lastUpdated")}: {new Date(template.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleLoad(template.id)}
                    >
                      <IoOpen className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="error"
                      onClick={() => handleDelete(template.id)}
                    >
                      <IoTrash className="size-4" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
