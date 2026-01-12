import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "@/app/globals.css";
import { getDictionary, t } from "../../dictionaries";
import { Lang } from "@/types/Lang";
import Link from "next/link";
import { Header } from "@/components/App";
import StoreInitializer from "@/store/StoreInitializer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Brieftaube",
    description: await t('description', lang) as unknown as string,
    authors: {
      name: "Jan Walenda",
      url: "https://www.janwalenda.de"
    },
    keywords: ["Email", "Nextjs", "Brieftaube", "Html"],
    generator: "Next.js",
    manifest: "/site.webmanifest"
  }
}

export default async function RootLayout({
  children,
  params
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Lang);

  return (
    <html lang={lang}>
      <body
        className={`${interTight.variable} antialiased`}
      >
        <StoreInitializer lang={lang as Lang} dictionary={dictionary} />
        <Header lang={lang as Lang} />
        <main>
          {children}
        </main>
        <footer className="w-full flex items-center justify-center px-4 py-8">
          <div className="max-w-3xl w-full">
            <small>An app developed by <b><Link href="https://www.janwalenda.de" className="link">Jan Walenda</Link></b></small>
          </div>
        </footer>
      </body>
    </html>
  );
}

