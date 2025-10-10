import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { t } from "../../dictionaries";
import { ThemeSwitch, LangSwitch } from "@/components/Action";
import Logo from "@/components/Logo.svg";
import { Lang } from "@/types/Lang";

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
        <header className="flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl flex items-center justify-between p-4 [&_path]:fill-primary [&_path]:stroke-primary [&_text]:fill-primary-content">
            <Logo />
            <div className="flex flex-row gap-2 items-center">
              <ThemeSwitch  params={params}/>
              <LangSwitch params={params} /> 
            </div>
          </div>
          <hr className="text-base-300 w-full"/>
        </header>
        <main>
          <div className="w-full h-full flex flex-col items-center justify-center md:px-4 md:pt-4 bg-base-200 pb-20">
            {children}
          </div>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
