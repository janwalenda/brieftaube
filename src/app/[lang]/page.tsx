import App from "./App";
import { getDictionary, t } from "./dictionaries";

export default async function Page({
  params
}: {
  params: Promise<{ lang: 'en' | 'de' }>,
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <App dictionary={dictionary} lang={lang}/>
  );
}