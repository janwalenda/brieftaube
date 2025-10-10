import { Dispatch, SetStateAction } from "react";
import type { FieldKeys } from "./Field";
import type { FieldType } from "./FieldType";
import type { Mail } from "../../../types/Mail";
import { UniqueIdentifier } from "@dnd-kit/core";

export type FieldContextType = {
    addField: (type: FieldType.Image | FieldType.TextBlock | FieldType.Footer) => number;
    removeField: (id: UniqueIdentifier) => void;
    setFieldProperty: (id: UniqueIdentifier, property: FieldKeys, value: string) => void;
    getFieldProperty: (id: UniqueIdentifier, property: FieldKeys) => string | undefined;
    setTitle: (title: string) => void;
    setSalutation: (salutation: string) => void;
    setMainContent: (mainContent: string) => void;
    setMainContentHTML: (html: string) => void;
    setLogoUrl: (logoUrl: string) => void;
    setName: (name: string) => void;
    setClosing: (greetings: string) => void;
    setRole: (role: string) => void;
    setDisclaimer: (disclaimer: string) => void;
    renderHTML: () => string;
    setMail: Dispatch<SetStateAction<Mail>>;
    mail: Mail;
};
