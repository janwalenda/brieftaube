export type TemplateKeyType = "text" | "date" | "url";

export type TemplateKey = {
  id: string;
  label: string;
  type: TemplateKeyType;
  required?: boolean;
  defaultValue?: string;
};
