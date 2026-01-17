import ReleaseContent from "@/components/ReleaseContent";

export default async function ReleasePage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;

  return <ReleaseContent version={version} />;
}

export function generateStaticParams() {
  return [{ version: "0.0.6" }];
}

export const dynamicParams = false;
