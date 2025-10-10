"use client"
import { FC } from "react";
import { TranslateContext } from "./TranslateContext";
import { useParams } from "next/navigation";
import { Lang } from "@/types/Lang";

const TranslationContextProvider: FC<{
  children: React.ReactNode;
  dictionary: {
    [key: string]: string;
  }
}> = ({ 
  children, 
  dictionary, 
}) => {

  const { lang } = useParams<{ lang: Lang }>()
  const t = (key: string) => {
    if (key in dictionary) {
      return dictionary[key];
    }

    throw new Error('Could not find translation key');
  };


  return (
    <TranslateContext.Provider value={{
      t,
      lang
    }}>
      {children}
    </TranslateContext.Provider>
  )
}

export default TranslationContextProvider;