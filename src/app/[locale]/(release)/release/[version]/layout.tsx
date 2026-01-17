import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils";
import { H2 } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: {
  params: Promise<{ version: string }>
}): Promise<Metadata> {
  const { version } = await params;

  return {
    title: `Brieftaube - Releases ${version}`,
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
          <header className="w-full flex items-center justify-center py-8">
            <nav className="navbar gap-2 w-full max-w-3xl">
              <Button buttonStyle="ghost" modifier="circle" asChild>
                <Link href="/" className="link">
                  <IoArrowBack />
                </Link>
              </Button>
              <div className="flex-1">
                <H2>Release {version}</H2>
              </div>
            </nav>
          </header>
          <main className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
            <article className="prose prose-md max-w-3xl w-full">
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
