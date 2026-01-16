"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Fieldset from "@/components/ui/fieldset";
import { useState, useEffect } from "react";
import { IoArrowBack, IoFingerPrint } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { InputVariant } from "@/types/inputVariant";
import { TooltipPosition } from "@/types/tooltipPosition";

export default function AccountPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const t = useTranslations("account");
  const gt = useTranslations("global");
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const handleAddPasskey = async () => {
    setPasskeyLoading(true);
    setMessage(null);

    try {
      const result = await authClient.passkey.addPasskey({
        name: `Passkey ${new Date().toLocaleDateString()}`,
      });

      if (result?.error) {
        setMessage({ type: "error", text: result.error.message || t("passkeyError") });
      } else {
        setMessage({ type: "success", text: t("passkeySuccess") });
      }
    } catch {
      setMessage({ type: "error", text: t("passkeyError") });
    } finally {
      setPasskeyLoading(false);
    }
  };

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
                  content: gt('back'),
                  placement: TooltipPosition.Right
                }}
              >
                <IoArrowBack className="size-6" />
              </Button>
            </Link>
            {t("title")}
          </CardTitle>

          <div className="space-y-4 mt-4">
            <Fieldset legend={t("profile")}>
              <div className="space-y-3">
                <div>
                  <Label>{t("name")}</Label>
                  <Input value={session.user.name || ""} disabled className="mt-1" />
                </div>
                <div>
                  <Label>{t("email")}</Label>
                  <Input value={session.user.email} disabled className="mt-1" />
                </div>
              </div>
            </Fieldset>

            <Fieldset legend={t("security")}>
              <div className="space-y-3">
                <p className="text-sm text-base-content/70">{t("passkeyDescription")}</p>
                <Button
                  onClick={handleAddPasskey}
                  disabled={passkeyLoading}
                  variant="secondary"
                  modifier="block"
                >
                  {passkeyLoading ? (
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

            {message && (
              <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
