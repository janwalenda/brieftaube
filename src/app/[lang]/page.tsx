import { Lang } from "@/types/Lang";
import { getDictionary } from "../../dictionaries";
import App from "@/components/App/App";

export default async function Page({
  params
}: {
  params: Promise<{ lang: Lang }>,
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <App dictionary={dictionary} />
  );
}