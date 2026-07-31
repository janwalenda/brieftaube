"use client";
import { useTranslations } from "next-intl";
import Fieldset from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountProfileCardProps {
  name: string;
  email: string;
}

export function AccountProfileCard({ name, email }: AccountProfileCardProps) {
  const t = useTranslations("account");

  return (
    <Fieldset legend={t("profile")}>
      <div className="space-y-3">
        <div>
          <Label>{t("name")}</Label>
          <Input value={name} disabled className="mt-1" />
        </div>
        <div>
          <Label>{t("email")}</Label>
          <Input value={email} disabled className="mt-1" />
        </div>
      </div>
    </Fieldset>
  );
}
