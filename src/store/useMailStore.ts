"use client";

import { create } from 'zustand';
import { FieldType } from "../types/FieldType";
import type { Field, FieldKeys, ImageField, TextBlock } from "../types/Field";
import type { Mail } from "../types/Mail";
import Email from "@/helpers/Email";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ImageWidth } from "@/types/ImageWidth";
import { TextBlockStyle } from "@/types/TextBlockStyle";
import { persist } from 'zustand/middleware';

interface MailState {
  mail: Mail;
  addField: (type: FieldType.Image | FieldType.TextBlock) => number;
  removeField: (id: UniqueIdentifier) => void;
  setFieldProperty: (id: UniqueIdentifier, property: FieldKeys, value: string) => void;
  getFieldProperty: (id: UniqueIdentifier, property: FieldKeys) => string | undefined;
  renderHTML: () => string;
  setMail: (updater: (mail: Mail) => Mail) => void;
  toggleTooltip: () => void;
  setPrimaryColor: (primaryColor: string) => void;
}

export const useMailStore = create<MailState>()(
  persist((set, get) => ({
    mail: {
      fields: [
        {
          id: 0,
          type: FieldType.Image,
          url: 'https://placehold.co/600x150/000000/ffffff?text=LOGO',
          width: ImageWidth.SM,
        },
        {
          id: 1,
          type: FieldType.TextBlock,
          style: TextBlockStyle.Default,
          content: '# Willkommen zu meinem Newsletter\nDas ist ein Beispieltext. Du kannst ihn ganz einfach bearbeiten, indem du auf das Textfeld klickst und deinen eigenen Text eingibst.',
        },
        {
          id: 2,
          type: FieldType.TextBlock,
          style: TextBlockStyle.Signature,
          content: `Max Mustermann\nCEO, Beispiel GmbH\n[01234 23643234](tel:0123423643234)\n[kontakt@maxmustermann.de](mailto:kontakt@maxmustermann.de)`,
        },
        {
          id: 3,
          type: FieldType.TextBlock,
          style: TextBlockStyle.Disclaimer,
          content: `\nDiese E-Mail wurde von [Organisation/Person] versandt.`,
        }
      ],
      tooltip: true,
      primaryColor: '#123455',
    },

    addField: (type) => {
      const { mail } = get();
      const id = mail.fields.length + 1;
      const newField: Field = {
        id,
        type,
      };

      switch (type) {
        case FieldType.Image:
          (newField as ImageField).url = 'https://placehold.co/600x150/000000/ffffff?text=Kein+Bild+angegeben';
          break;
        case FieldType.TextBlock:
          (newField as TextBlock).content = 'Schreib was du willst';
          break;
      }

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

      switch (field.type) {
        case FieldType.Image: {
          const f = field as ImageField;
          if (property in f) {
            return (f as ImageField)[property as keyof ImageField] as string;
          }
          break;
        }
        case FieldType.TextBlock: {
          const f = field as TextBlock;
          if (property in f) {
            return (f as TextBlock)[property as keyof TextBlock] as string;
          }
          break;
        }
      }
      return undefined;
    },

    renderHTML: () => {
      const { mail } = get();
      const email = new Email(mail.primaryColor);
      email.appendFields(mail.fields);
      return email.render();
    },

    setMail: (updater) => {
      set((state) => ({
        mail: updater(state.mail),
      }));
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
  }),
    {
      name: 'mail-storage',
      skipHydration: true,
    }
  )
);
