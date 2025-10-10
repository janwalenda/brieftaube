"use client"

import FieldContextProvider from "@/context/FieldContextProvider"
import {
  MailHeader,
  FieldList,
  MailFooter
} from "@/components/App"
import {
  Dock,
  FAB,
} from '@/components/Action'
import PresetContextProvider from '@/context/PresetContextProvider'
import TranslationContextProvider from "@/context/TranslateContextProvider"

function App({
  dictionary,
  lang
}: {
  lang: string;
  dictionary: {
    [key: string]: string;
  }
}) {
  return (
    <TranslationContextProvider dictionary={dictionary} lang={lang}>
      <FieldContextProvider>
      <PresetContextProvider>
        <MailHeader />
        <FieldList />
        <MailFooter />
        <FAB />
        <Dock />
      </PresetContextProvider>
    </FieldContextProvider>
    </TranslationContextProvider>
  )
}

export default App
