"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { signIn, authClient } from "@/lib/auth-client";
import { Card, CardBody, CardTitle, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Fieldset from "@/components/ui/fieldset";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || t("loginError"));
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError(t("loginError"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.passkey();

      if (result?.error) {
        setError(result.error.message || t("passkeyError"));
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError(t("passkeyError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody>
          <CardTitle>
            {t("login")}
          </CardTitle>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <Fieldset>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                disabled={loading}
              />
            </Fieldset>

            <Fieldset>
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                disabled={loading}
              />
            </Fieldset>

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
