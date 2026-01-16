"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { signUp } from "@/lib/auth-client";
import { Card, CardBody, CardTitle, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Fieldset from "@/components/ui/fieldset";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message || t("registerError"));
      } else {
        router.push("/login");
      }
    } catch {
      setError(t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardBody>
          <CardTitle>
            {t("register")}
          </CardTitle>

          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            <Fieldset>
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                required
                disabled={loading}
              />
            </Fieldset>

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
                minLength={8}
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
    </div >
  );
}
