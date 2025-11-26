"use client"
import MailContextProvider from "@/context/MailContextProvider"
import {
  MailHeader,
  FieldList,
} from "@/components/App"
import {
  FAB,
} from '@/components/Action'
import PresetContextProvider from '@/context/PresetContextProvider'
import TranslationContextProvider from "@/context/TranslateContextProvider"
import { Header} from "@/components/App"
import ThemeContextProvider from "@/context/ThemeContextProvider"
import { Dock } from "../Action"

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
