import { Lang } from "@/types/Lang";
import { getDictionary } from "../../dictionaries";
import App from "@/components/App/App";
import { Suspense } from "react";

export default async function Page({
  params
}: {
  params: Promise<{ lang: Lang }>,
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <App dictionary={dictionary} />
    </Suspense>
  );
}