"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";
import { useAccountPage } from "@/hooks/useAccountPage";
import { AccountProfileCard } from "@/components/account/AccountProfileCard";
import { AccountSecurityCard } from "@/components/account/AccountSecurityCard";

export default function AccountPage() {
  const t = useTranslations("account");
  const gt = useTranslations("global");
  const { session, isPending, passkeyLoading, message, handleAddPasskey } =
    useAccountPage();

  if (isPending || !session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody>
          <CardTitle>
            <Link href="/">
              <Button
                variant={InputVariant.Neutral}
                buttonStyle="ghost"
                className="btn-circle"
                tooltip={{
                  content: gt("back"),
                  placement: TooltipPosition.Right,
                }}
              >
                <IoArrowBack className="size-6" />
              </Button>
            </Link>
            {t("title")}
          </CardTitle>

          <div className="space-y-4 mt-4">
            <AccountProfileCard
              name={session.user.name || ""}
              email={session.user.email}
            />
            <AccountSecurityCard
              loading={passkeyLoading}
              onAddPasskey={handleAddPasskey}
            />

            {message && (
              <div
                className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}
              >
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
