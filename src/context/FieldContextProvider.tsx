"use client"
import { useState, type FC, type ReactNode } from "react";
import { FieldContext } from "./FieldContext";
import { FieldType } from "../components/Base/types/FieldType";
import type { Field, FieldKeys, FooterField, ImageField, ListField, TextBlock } from "../components/Base/types/Field";
import type { Mail } from "../types/Mail";
import Email from "../hepers/Email";
import { UniqueIdentifier } from "@dnd-kit/core";

const FieldContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mail, setMail] = useState<Mail>({
    title: "Mein Newsletter",
    salutation: "Moin,",
    fields: [],
    disclaimer: "Diese E-Mail wurde von [Organisation/Person] versandt.",
    mainContent: "Hier ist der Hauptinhalt deines Newsletters. Du kannst Text, Bilder und andere Elemente hinzufügen, um deine Botschaft zu vermitteln.",
    image: "https://placehold.co/600x150/000000/ffffff?text=Kein+Bild+angegeben",
    closing: "Solidarische Grüße",
    name: "Dein Name",
    role: "Deine Rolle",
    tooltip: true,
  });

  const addField = (type: FieldType.Image | FieldType.TextBlock | FieldType.Footer | FieldType.List) => {
    const id = mail.fields.length + 1;
    const newField: Field = {
      id,
      type,
    };

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
      case FieldType.List: {
        const f = field as ListField;
        if (property in f) {
          return (f as ListField)[property as keyof ListField] as string;
        }
        break;
      }
      case FieldType.Footer: {
        const f = field as FooterField;
        if (property in f) {
          return (f as FooterField)[property as keyof FooterField] as string;
        }
        break;
      }
    }
    return undefined;
  }

  const setTitle = (title: string) => {
    setMail({
      ...mail,
      title,
    });
  }

  const setDisclaimer = (disclaimer: string) => {
    setMail({
      ...mail,
      disclaimer,
    });
  }

  const setSalutation = (salutation: string) => {
    setMail({
      ...mail,
      salutation,
    });
  }

  const setMainContent = (mainContent?: string, ) => {
    if(!mainContent) {
      return;
    }

    setMail({
      ...mail,
      mainContent,
    });
  }

  const setLogoUrl = (image: string) => {
    setMail({
      ...mail,
      image,
    });
  }

  const setName = (name: string) => {
    setMail({
      ...mail,
      name,
    });
  }

  const setClosing = (closing: string) => {
    setMail({
      ...mail,
      closing,
    });
  }

  const setRole = (role: string) => {
    setMail({
      ...mail,
      role,
    });
  }

  const removeField = (id: UniqueIdentifier) => {
    setMail({
      ...mail,
      fields: mail.fields.filter(field => field.id !== id)
    });
  }


  const renderHTML = () => {
    const email = new Email();

    email.appendImage(mail.image, "6rem");
    email.appendMainTitle(mail.title);
    email.appendGreeting(mail.salutation);
    email.appendMainBody(mail.mainContent);

    email.appendFields(mail.fields);

    email.appendClosing(mail.closing);
    email.appendSender(mail.name, mail.role);

    email.appendDisclaimer(mail.disclaimer);

    return email.render();
  }

  return (
    <FieldContext.Provider value={{
      mail,
      addField,
      getFieldProperty,
      setFieldProperty,
      removeField,
      setDisclaimer,
      setClosing,
      setLogoUrl,
      setMainContent,
      setName,
      setRole,
      setSalutation,
      setTitle,
      setMail,
      renderHTML,
      toggleTooltip,
    }}>
      {children}
    </FieldContext.Provider>
  );
}

export default FieldContextProvider
