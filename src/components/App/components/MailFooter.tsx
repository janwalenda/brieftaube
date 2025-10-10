"use client"
import { useEffect } from "react";
import { useField } from "../../../hooks/useField";
import { InputVariant } from "../../Base/types/InputVariant";
import { Input } from "@/components/Base"
import { useTranslate } from "@/hooks/useTranslate";

export default function MailFooter() {
  const { mail, setDisclaimer, setName, setClosing, setRole } = useField();
  const { t } = useTranslate();

  useEffect(() => {}, [mail])

  return (
   <div className="p-4 flex flex-col gap-4 w-full max-w-3xl items-center justify-center">
     <Input variant={InputVariant.Primary}
      placeholder="Grüße"
      className="w-full"
      value={mail.closing}
      tooltip={t('email.greetings')}
      onChange={(e) => setClosing(e.target.value)}
    />
    <Input variant={InputVariant.Primary}
      placeholder="Name"
      className="w-full"
      value={mail.name}
      tooltip={t('email.sender-name')}
      onChange={(e) => setName(e.target.value)}
    />
    <Input variant={InputVariant.Primary}
      placeholder="Rolle"
      className="w-full"
      value={mail.role}
      onChange={(e) => setRole(e.target.value)}
      tooltip={t('email.role')}
    />
    <Input variant={InputVariant.Primary}
      placeholder="Disclaimer"
      className="w-full"
      value={mail.disclaimer}
      onChange={(e) => setDisclaimer(e.target.value)}
      tooltip={t('email.disclaimer')}
    />
   </div>
  )
}
