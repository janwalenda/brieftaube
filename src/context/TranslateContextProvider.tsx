import { FC } from "react";
import { TranslateContext } from "./TranslateContext";

const TranslationContextProvider: FC<{
  children: React.ReactNode;
  lang: string;
  dictionary: {
    [key: string]: string;
  }
}> = ({ 
  children, 
  dictionary, 
  lang 
}) => {
  const t = (key: string) => {
    console.log(dictionary)
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