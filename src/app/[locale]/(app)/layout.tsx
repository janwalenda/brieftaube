import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "@/app/globals.css";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";

import { cn } from "@/lib/utils";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: "Brieftaube",
    description: t("description"),
    authors: {
      name: "Jan Walenda",
      url: "https://www.janwalenda.de"
    },
    keywords: ["Email", "Nextjs", "Brieftaube", "Html"],
    generator: "Next.js",
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.png",
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(interTight.className, "antialiased")}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
            {children}
          </main>
          <footer className="w-full flex items-center justify-center px-4 py-8">
            <div className="max-w-3xl w-full">
              <p>
                <small>An app developed by <b><Link href="https://www.janwalenda.de" className="link">Jan Walenda</Link></b></small>
              </p>
              <p>
                <small>
                  <Link href="/release/0.0.8" className="link">Version 0.0.8</Link>
                </small>
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
