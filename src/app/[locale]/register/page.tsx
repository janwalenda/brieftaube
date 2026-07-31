"use client";

import { useTranslations } from "next-intl";
import { Card, CardBody, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/AuthField";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleRegister,
  } = useRegisterForm();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody>
          <CardTitle>{t("register")}</CardTitle>

          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            <AuthField
              id="name"
              type="text"
              label={t("name")}
              value={name}
              onChange={setName}
              placeholder={t("namePlaceholder")}
              disabled={loading}
            />

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
              minLength={8}
              disabled={loading}
            />

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <CardAction>
              <Button type="submit" disabled={loading} modifier="block">
                {loading ? t("loading") : t("registerButton")}
              </Button>
            </CardAction>
          </form>

          <div className="text-center mt-4">
            <Button asLink href="/login" buttonStyle="link">
              {t("hasAccount")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
