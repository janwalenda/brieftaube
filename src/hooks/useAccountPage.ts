"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession, authClient } from "@/lib/auth-client";

export function useAccountPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const t = useTranslations("account");
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  async function handleAddPasskey() {
    setPasskeyLoading(true);
    setMessage(null);

    try {
      const result = await authClient.passkey.addPasskey({
        name: `Passkey ${new Date().toLocaleDateString()}`,
      });

      if (result?.error) {
        setMessage({
          type: "error",
          text: result.error.message || t("passkeyError"),
        });
      } else {
        setMessage({ type: "success", text: t("passkeySuccess") });
      }
    } catch {
      setMessage({ type: "error", text: t("passkeyError") });
    } finally {
      setPasskeyLoading(false);
    }
  }

  return { session, isPending, passkeyLoading, message, handleAddPasskey };
}
