"use client"
import { useState, type FC, type ReactNode } from "react";
import { MailContext } from "./MailContext";
import { FieldType } from "../components/Base/types/FieldType";
import type { Field, FieldKeys, ImageField, TextBlock } from "../components/Base/types/Field";
import type { Mail } from "../types/Mail";
import Email from "../hepers/Email";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ImageWidth } from "@/types/ImageWidth";
import { TextBlockStyle } from "@/components/Base/types/TextBlockStyle";

const MailContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mail, setMail] = useState<Mail>({
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
        content: `Max Mustermann
CEO, Beispiel GmbH
[01234 23643234](tel:0123423643234)
[kontakt@maxmustermann.de](mailto:kontakt@maxmustermann.de)`,
      },
      {
        id: 3,
        type: FieldType.TextBlock,
        style: TextBlockStyle.Disclaimer,
        content: `
Diese E-Mail wurde von [Organisation/Person] versandt.`,
      }
    ],
    tooltip: true,
    primaryColor: '#123455',
  });

  const addField = (type: FieldType.Image | FieldType.TextBlock) => {
    const id = mail.fields.length + 1;
    const newField: Field = {
      id,
      type,
    };

    switch(type) {
      case FieldType.Image:
        (newField as ImageField).url = 'https://placehold.co/600x150/000000/ffffff?text=Kein+Bild+angegeben';
        break
      case FieldType.TextBlock:
        (newField as TextBlock).content = 'Schreib was du willst';
    }

    setMail({
      ...mail,
      fields: [...mail.fields, newField],
    });

    return id;
  };

  const setFieldProperty = (id: UniqueIdentifier, property: FieldKeys, value: string) => {
    setMail({
      ...mail,
      fields: mail.fields.map(field => {
        if (field.id === id) {
          return {
            ...field,
            [property]: value,
          };
        }
        return field;
      }),
    });
  }

  const toggleTooltip = () => {
    setMail({
      ...mail,
      tooltip: !mail.tooltip,
    })
  }

  // Variante 2: diskreter Typ-Abgleich
  const getFieldProperty = (id: UniqueIdentifier, property: FieldKeys): string | undefined => {
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
  }

  const setPrimaryColor = (primaryColor: string) => {
    setMail({
      ...mail,
      primaryColor,
    })
  }

  const removeField = (id: UniqueIdentifier) => {
    setMail({
      ...mail,
      fields: mail.fields.filter(field => field.id !== id)
    });
  }


  const renderHTML = () => {
    const email = new Email(mail.primaryColor);

    email.appendFields(mail.fields);

    return email.render();
  }

  return (
    <MailContext.Provider value={{
      mail,
      addField,
      getFieldProperty,
      setFieldProperty,
      removeField,
      setMail,
      renderHTML,
      toggleTooltip,
      setPrimaryColor,
    }}>
      {children}
    </MailContext.Provider>
  );
}

export default MailContextProvider
