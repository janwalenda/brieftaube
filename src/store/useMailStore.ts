"use client";

import { create } from "zustand";
import { FieldType } from "../types/FieldType";
import type { FieldKeys } from "../types/Field";
import { componentRegistry } from "@/config/componentRegistry";
import type { Mail } from "../types/Mail";
import Email from "@/helpers/Email";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { ImageWidth } from "@/types/ImageWidth";
import { TextBlockStyle } from "@/types/TextBlockStyle";
import { persist } from "zustand/middleware";

// Default mail state for new emails
const defaultMail: Mail = {
  fields: [
    {
      id: 0,
      type: FieldType.Image,
      url: "https://placehold.co/600x150/000000/ffffff?text=LOGO",
      width: ImageWidth.SM,
    },
    {
      id: 1,
      type: FieldType.TextBlock,
      style: TextBlockStyle.Default,
      content: "# Willkommen zu meinem Newsletter\nDas ist ein Beispieltext. Du kannst ihn ganz einfach bearbeiten, indem du auf das Textfeld klickst und deinen eigenen Text eingibst.",
    },
    {
      id: 2,
      type: FieldType.TextBlock,
      style: TextBlockStyle.Signature,
      content: "Max Mustermann\nCEO, Beispiel GmbH\n[01234 23643234](tel:0123423643234)\n[kontakt@maxmustermann.de](mailto:kontakt@maxmustermann.de)",
    },
    {
      id: 3,
      type: FieldType.TextBlock,
      style: TextBlockStyle.Disclaimer,
      content: "\nDiese E-Mail wurde von [Organisation/Person] versandt.",
    }
  ],
  tooltip: true,
  primaryColor: "#123455",
  roundedCorners: 0.25,
};

interface MailState {
  mail: Mail;
  templateId: string | null;
  addField: (type: FieldType.Image | FieldType.TextBlock | FieldType.Button) => number;
  removeField: (id: UniqueIdentifier) => void;
  setFieldProperty: (id: UniqueIdentifier, property: FieldKeys, value: string) => void;
  getFieldProperty: (id: UniqueIdentifier, property: FieldKeys) => string | undefined;
  renderHTML: () => string;
  setMail: (updater: (mail: Mail) => Mail) => void;
  setMailDirect: (mail: Mail, templateId?: string | null) => void;
  resetMail: () => void;
  toggleTooltip: () => void;
  setPrimaryColor: (primaryColor: string) => void;
  setRoundedCorners: (roundedCorners: number) => void;
  moveField: (id: UniqueIdentifier, direction: "up" | "down") => void;
  getFieldIndex: (id: UniqueIdentifier) => number;
  getFieldCount: () => number;
}

export const useMailStore = create<MailState>()(
  persist((set, get) => ({
    mail: { ...defaultMail },
    templateId: null,

    addField: (type) => {
      const { mail } = get();
      const id = mail.fields.length + 1;
      const factory = componentRegistry[type].create;
      const newField = factory(id);

      set((state) => ({
        mail: {
          ...state.mail,
          fields: [...state.mail.fields, newField],
        },
      }));

      return id;
    },

    removeField: (id) => {
      set((state) => ({
        mail: {
          ...state.mail,
          fields: state.mail.fields.filter(field => field.id !== id),
        },
      }));
    },

    setFieldProperty: (id, property, value) => {
      set((state) => ({
        mail: {
          ...state.mail,
          fields: state.mail.fields.map(field => {
            if (field.id === id) {
              return {
                ...field,
                [property]: value,
              };
            }
            return field;
          }),
        },
      }));
    },

    getFieldProperty: (id, property) => {
      const { mail } = get();
      const field = mail.fields.find(field => field.id === id);
      if (!field) return undefined;

      if (field && property in field) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (field as any)[property] as string;
      }
      return undefined;
    },

    renderHTML: () => {
      const { mail } = get();
      const email = new Email(
        mail.primaryColor,
        mail.roundedCorners
      );
      email.appendFields(mail.fields);
      return email.render();
    },

    setMail: (updater) => {
      set((state) => ({
        mail: updater(state.mail),
      }));
    },

    setMailDirect: (mail, templateId = null) => {
      set({ mail, templateId });
    },

    resetMail: () => {
      set({ mail: { ...defaultMail }, templateId: null });
    },

    toggleTooltip: () => {
      set((state) => ({
        mail: {
          ...state.mail,
          tooltip: !state.mail.tooltip,
        },
      }));
    },

    setPrimaryColor: (primaryColor) => {
      set((state) => ({
        mail: {
          ...state.mail,
          primaryColor,
        },
      }));
    },

    setRoundedCorners: (roundedCorners) => {
      set((state) => ({
        mail: {
          ...state.mail,
          roundedCorners,
        },
      }));
    },

    moveField: (id, direction) => {
      const { mail } = get();
      const oldIndex = mail.fields.findIndex((field) => field.id === id);
      if (oldIndex === -1) return;

      const newIndex = direction === "up" ? oldIndex - 1 : oldIndex + 1;

      // Bounds check
      if (newIndex < 0 || newIndex >= mail.fields.length) return;

      // Use arrayMove from dnd-kit for consistency
      const newFields = [...mail.fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);

      set({
        mail: {
          ...mail,
          fields: newFields,
        },
      });
    },

    getFieldIndex: (id) => {
      const { mail } = get();
      return mail.fields.findIndex((field) => field.id === id);
    },

    getFieldCount: () => {
      const { mail } = get();
      return mail.fields.length;
    },
  }),
    {
      name: "mail-storage",
    }
  )
);
