"use client"

import { useMailStore } from "@/store/useMailStore";
import { type Mail as MailType } from "@/types/Mail";
import FieldList from "./FieldList";
import FAB from "./FAB";
import { useEffect } from "react";

interface MailProps {
  mail: MailType;
  templateId?: string;
}

export default function Mail({ mail, templateId }: MailProps) {
  const { setMailDirect } = useMailStore();

  useEffect(() => {
    setMailDirect(mail, templateId ?? null);
  }, [mail, templateId, setMailDirect]);

  return (
    <>
      <FieldList />
      <FAB />
    </>
  );
}