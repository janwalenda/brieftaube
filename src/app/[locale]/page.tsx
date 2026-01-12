
import FieldList from "@/components/FieldList"
import FAB from "@/components/FAB"
import Dock from "@/components/Dock"

export default function Page() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:px-4 bg-base-200 pb-20">
      <FieldList />
      <FAB />
      <Dock />
    </div>
  );
}