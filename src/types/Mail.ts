import { Field } from "../components/Base/types/Field";

export type Mail = {
  title: string;
  salutation: string;
  mainContent: string;
  mainContentHTML?: string;
  image: string;
  fields: Field[];
  name: string;
  role: string;
  closing: string;
  disclaimer: string;
}
