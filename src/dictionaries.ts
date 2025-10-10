import { Lang } from '@/types/Lang';

const dictionaries = {
  de: () => import('@/translations/de.json').then((module) => module.default),
  en: () => import('@/translations/en.json').then((module) => module.default),
  fr: () => import('@/translations/fr.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Lang) =>
  dictionaries[locale]()

export const t = async (key: string, locale: Lang) => {
    const dict = await getDictionary(locale) as { [key: string]: string };
    return dict[key];
}