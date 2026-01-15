import { type Dispatch, type SetStateAction } from "react";
import type { Mail } from "./Mail";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type FieldType } from "./FieldType";
import { type FieldKeys } from "./Field";

export type MailContextType = {
    addField: (type: FieldType.Image | FieldType.TextBlock) => number;
    removeField: (id: UniqueIdentifier) => void;
    setFieldProperty: (id: UniqueIdentifier, property: FieldKeys, value: string) => void;
    getFieldProperty: (id: UniqueIdentifier, property: FieldKeys) => string | undefined;
    renderHTML: () => string;
    setMail: Dispatch<SetStateAction<Mail>>;
    toggleTooltip: () => void;
    setPrimaryColor: (primaryColor: string) => void;
    mail: Mail;
};
