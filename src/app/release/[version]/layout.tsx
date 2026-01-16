import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { H1 } from "@/components/ui/heading";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Brieftaube - Releases",
    description: "Releases of Brieftaube",
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
  params: Promise<{ version: string }>;
}) {
  const { version } = await params;
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(robotoMono.className, "antialiased")}
      >
        <NextIntlClientProvider messages={messages}>
          <header className="w-full flex items-center justify-center px-4 py-8">
            <div className="max-w-3xl w-full">
              <H1>Release {version}</H1>
            </div>
          </header>
          <main className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
            <article className="prose prose-xl max-w-3xl w-full">
              {children}
            </article>
          </main>
          <footer className="w-full flex items-center justify-center px-4 py-8">
            <div className="max-w-3xl w-full">
              <small>An app developed by <b><Link href="https://www.janwalenda.de" className="link">Jan Walenda</Link></b></small>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
