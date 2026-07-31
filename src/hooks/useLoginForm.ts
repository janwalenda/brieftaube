"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { signIn, authClient } from "@/lib/auth-client";

export function useLoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.email({ email, password });
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
  }

  async function handlePasskeyLogin() {
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
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
    handlePasskeyLogin,
  };
}
