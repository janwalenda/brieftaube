"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import {
  listTemplates,
  deleteTemplate,
  loadTemplate,
} from "@/actions/templates";
import { useField } from "@/hooks/useField";
import type { Mail } from "@/types/Mail";

export interface TemplateSummary {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function useTemplatesList() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const t = useTranslations("templates");
  const { setMailDirect } = useField();

  const [templates, setTemplates] = useState<TemplateSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fillMail, setFillMail] = useState<Mail | null>(null);

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
      setTemplates(result.templates as TemplateSummary[]);
    }
    setLoading(false);
  }

  async function handleDelete(templateId: string) {
    if (!confirm(t("confirmDelete"))) return;

    const result = await deleteTemplate(templateId);
    if (result.error) {
      setError(result.error);
    } else {
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== templateId));
    }
  }

  async function handleLoad(templateId: string) {
    const result = await loadTemplate(templateId);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.template) {
      setMailDirect(result.template.content, null);
      router.push("/");
    }
  }

  async function handleFill(templateId: string) {
    const result = await loadTemplate(templateId);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.template) {
      setFillMail(result.template.content);
    }
  }

  return {
    isPending,
    loading,
    error,
    templates,
    fillMail,
    handleDelete,
    handleLoad,
    handleFill,
  };
}
