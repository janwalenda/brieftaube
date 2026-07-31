"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Mail } from "@/types/Mail";
import Email from "@/helpers/Email";
import {
  applyKeyValues,
  formatKeyValue,
  validateKeyValues,
} from "@/helpers/templateKeys";
import { copyHtmlToClipboard } from "@/helpers/copyHtml";
import { useToast } from "@/store/useToastStore";

export function useFillTemplate(mail: Mail | null) {
  const t = useTranslations();
  const { addToast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const keys = useMemo(() => mail?.keys ?? [], [mail]);

  useEffect(() => {
    const defaults: Record<string, string> = {};
    keys.forEach((key) => {
      defaults[key.id] = key.defaultValue ?? "";
    });
    setValues(defaults);
    setMissing([]);
    setPreview(null);
  }, [keys]);

  function buildHtml() {
    if (!mail) return "";
    const formatted: Record<string, string> = {};
    keys.forEach((key) => {
      formatted[key.id] = formatKeyValue(key.type, values[key.id] ?? "");
    });
    const filled = applyKeyValues(mail, formatted);
    const email = new Email(filled.primaryColor, filled.roundedCorners);
    email.appendFields(filled.fields);
    return email.render();
  }

  function handlePreview() {
    const missingIds = validateKeyValues(keys, values);
    setMissing(missingIds);
    if (missingIds.length === 0) setPreview(buildHtml());
  }

  async function handleCopy() {
    const missingIds = validateKeyValues(keys, values);
    setMissing(missingIds);
    if (missingIds.length > 0) return;

    try {
      await copyHtmlToClipboard(buildHtml());
      addToast(t("dock.copy.success"), "success");
    } catch (error) {
      console.error("Failed to copy HTML:", error);
      addToast(t("dock.copy.error"), "error");
    }
  }

  return {
    keys,
    values,
    setValues,
    missing,
    preview,
    handlePreview,
    handleCopy,
  };
}
