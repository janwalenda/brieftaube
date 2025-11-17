"use client"
import MailContextProvider from "@/context/MailContextProvider"
import {
  MailHeader,
  FieldList,
} from "@/components/App"
import {
  Dock,
  FAB,
} from '@/components/Action'
import PresetContextProvider from '@/context/PresetContextProvider'
import TranslationContextProvider from "@/context/TranslateContextProvider"
import { Header } from "./components/Header"
import ThemeContextProvider from "@/context/ThemeContextProvider"

function App({
  dictionary,
}: {
  dictionary: {
    [key: string]: string;
  }
}) {
  return (
    <TranslationContextProvider dictionary={dictionary}>
        <MailContextProvider>
          <PresetContextProvider>
            <ThemeContextProvider>
              <Header/>
            </ThemeContextProvider>
            <main>
              <div className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
                <MailHeader />
                <FieldList />
                <FAB />
                <Dock />
              </div>
            </main>
          </PresetContextProvider>
        </MailContextProvider>
      </TranslationContextProvider>

  )
}

export default App
