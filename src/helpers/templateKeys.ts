import type { Mail } from "@/types/Mail";
import type { TemplateKey, TemplateKeyType } from "@/types/TemplateKey";

export const PLACEHOLDER_RE = /\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g;

const PLACEHOLDER_FIELD_PROPS = ["content", "url", "href"] as const;

export function createKeyId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

export function toPlaceholder(id: string): string {
  return `{{${id}}}`;
}

function replaceInString(value: string, values: Record<string, string>) {
  return value.replace(PLACEHOLDER_RE, (match, id: string) => {
    return Object.prototype.hasOwnProperty.call(values, id)
      ? values[id]
      : match;
  });
}

export function applyKeyValues(
  mail: Mail,
  values: Record<string, string>,
): Mail {
  return {
    ...mail,
    fields: mail.fields.map((field) => {
      const updated: Record<string, unknown> = {
        ...(field as unknown as Record<string, unknown>),
      };

      PLACEHOLDER_FIELD_PROPS.forEach((prop) => {
        const current = updated[prop];
        if (typeof current === "string") {
          updated[prop] = replaceInString(current, values);
        }
      });

      return updated as unknown as typeof field;
    }),
  };
}

export function formatKeyValue(
  type: TemplateKeyType,
  value: string,
  locale: string = "de-DE",
): string {
  if (type === "date" && value) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }
  return value;
}

export function validateKeyValues(
  keys: TemplateKey[],
  values: Record<string, string>,
): string[] {
  return keys
    .filter((key) => (key.required ?? true) && !values[key.id]?.trim())
    .map((key) => key.id);
}

export function collectUsedKeyIds(mail: Mail): string[] {
  const ids = new Set<string>();

  mail.fields.forEach((field) => {
    PLACEHOLDER_FIELD_PROPS.forEach((prop) => {
      const value = (field as unknown as Record<string, unknown>)[prop];
      if (typeof value !== "string") return;

      const matches = value.matchAll(PLACEHOLDER_RE);
      for (const match of matches) {
        ids.add(match[1]);
      }
    });
  });

  return Array.from(ids);
}
