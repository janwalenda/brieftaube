import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "@/app/globals.css";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";

import { cn } from "@/lib/utils";
import ToastBox from "@/components/ToastBox";
import { AppFooter } from "@/components/AppFooter";

import { version } from "../../../package.json";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: "Brieftaube",
    description: t("description"),
    authors: {
      name: "Jan Walenda",
      url: "https://www.janwalenda.de",
    },
    keywords: ["Email", "Nextjs", "Brieftaube", "Html"],
    generator: "Next.js",
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(interTight.className, "antialiased")}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
            <ToastBox />
            {children}
          </main>
          <AppFooter version={version} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
