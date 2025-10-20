import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { t } from "../../dictionaries";
import { Lang } from "@/types/Lang";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  return (
    <html lang={(await params).lang} data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="w-full flex items-center justify-center px-4 py-8">
          <div className="max-w-3xl w-full">
            <small>An app developed by <b><Link href="https://www.janwalenda.de" className="link">Jan Walenda</Link></b></small>
          </div>
        </footer>
      </body>
    </html>
  );
}

