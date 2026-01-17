"use client"

import FieldList from "@/components/FieldList"
import FAB from "@/components/FAB"
import ActionDock from "@/components/Dock"

export default function Page() {
  return (
    <>
      <FieldList />
      <FAB />
      <ActionDock mode="create" />
    </>
  );
}
