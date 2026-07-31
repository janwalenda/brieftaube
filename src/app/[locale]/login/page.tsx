"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/AuthField";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginPage() {
  const t = useTranslations("auth");
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
    handlePasskeyLogin,
  } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody>
          <CardTitle>{t("login")}</CardTitle>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <AuthField
              id="email"
              type="email"
              label={t("email")}
              value={email}
              onChange={setEmail}
              placeholder={t("emailPlaceholder")}
              disabled={loading}
            />

            <AuthField
              id="password"
              type="password"
              label={t("password")}
              value={password}
              onChange={setPassword}
              placeholder={t("passwordPlaceholder")}
              disabled={loading}
            />

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <CardAction>
              <Button type="submit" disabled={loading} modifier="block">
                {loading ? t("loading") : t("loginButton")}
              </Button>
            </CardAction>
          </form>

          <div className="divider">{t("or")}</div>

          <Button
            type="button"
            variant="secondary"
            modifier="block"
            onClick={handlePasskeyLogin}
            disabled={loading}
          >
            {t("loginWithPasskey")}
          </Button>

          <div className="text-center mt-4">
            <Button asLink href="/register" buttonStyle="link">
              {t("noAccount")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
