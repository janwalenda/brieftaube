import { type Field } from "./Field";
import { type TemplateKey } from "./TemplateKey";

export type Mail = {
  fields: Field[];
  tooltip: boolean;
  primaryColor: string;
  roundedCorners: number;
  keys?: TemplateKey[];
};
