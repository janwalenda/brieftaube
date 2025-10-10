
const dictionaries = {
  de: () => import('@/translations/de.json').then((module) => module.default),
  en: () => import('@/translations/en.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'de') =>
  dictionaries[locale]()

export const t = async (key: string, locale: 'en' | 'de') => {
    const dict = await getDictionary(locale) as { [key: string]: string };
    return dict[key];
}