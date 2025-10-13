import { Dispatch, SetStateAction } from "react";
import type { FieldKeys } from "../components/Base/types/Field";
import type { FieldType } from "../components/Base/types/FieldType";
import type { Mail } from "./Mail";
import { UniqueIdentifier } from "@dnd-kit/core";

export type FieldContextType = {
    addField: (type: FieldType.Image | FieldType.TextBlock) => number;
    removeField: (id: UniqueIdentifier) => void;
    setFieldProperty: (id: UniqueIdentifier, property: FieldKeys, value: string) => void;
    getFieldProperty: (id: UniqueIdentifier, property: FieldKeys) => string | undefined;
    setTitle: (title: string) => void;
    setSalutation: (salutation: string) => void;
    setMainContent: (mainContent?: string) => void;
    setLogoUrl: (logoUrl: string) => void;
    setName: (name: string) => void;
    setClosing: (greetings: string) => void;
    setRole: (role: string) => void;
    setDisclaimer: (disclaimer: string) => void;
    renderHTML: () => string;
    setMail: Dispatch<SetStateAction<Mail>>;
    toggleTooltip: () => void;
    mail: Mail;
};
