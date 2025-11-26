import { Dispatch, SetStateAction } from "react";
import type { FieldKeys } from "../components/Base/types/Field";
import type { FieldType } from "../components/Base/types/FieldType";
import type { Mail } from "./Mail";
import { UniqueIdentifier } from "@dnd-kit/core";

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
