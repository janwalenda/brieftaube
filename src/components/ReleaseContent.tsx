"use client";

import dynamic from "next/dynamic";

interface ReleaseContentProps {
  version: string;
}

export default function ReleaseContent({ version }: ReleaseContentProps) {
  const Release = dynamic(
    () => import(`@/releases/v${version}.mdx`),
    { loading: () => <p>Loading...</p> }
  );

  return <Release />;
}
