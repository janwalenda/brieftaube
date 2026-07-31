"use client";
import { useTranslations } from "next-intl";
import Fieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import { IoFingerPrint } from "react-icons/io5";

interface AccountSecurityCardProps {
  loading: boolean;
  onAddPasskey: () => void;
}

export function AccountSecurityCard({
  loading,
  onAddPasskey,
}: AccountSecurityCardProps) {
  const t = useTranslations("account");

  return (
    <Fieldset legend={t("security")}>
      <div className="space-y-3">
        <p className="text-sm text-base-content/70">
          {t("passkeyDescription")}
        </p>
        <Button
          onClick={onAddPasskey}
          disabled={loading}
          variant="secondary"
          modifier="block"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <IoFingerPrint className="size-5 mr-2" />
              {t("addPasskey")}
            </>
          )}
        </Button>
      </div>
    </Fieldset>
  );
}
