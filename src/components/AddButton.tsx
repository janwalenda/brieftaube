import { InputVariant } from "@/types/inputVariant";
import { IoAdd } from "react-icons/io5";
import { Dropdown, DropdownButton, DropdownContent } from "./ui/dropdown";
import { Button } from "./ui/button";
import { useField } from "@/hooks/useField";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { componentRegistry } from "@/config/componentRegistry";
import { TooltipPosition } from "@/types/tooltipPosition";

export default function AddButton({ index }: { index: number }) {
  const { addField } = useField();
  const t = useTranslations();
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-row items-center justify-center gap-0 has-[.btn:hover]:gap-2 transition-all duration-300 group">
      <span className="flex-1 bg-primary h-1 group-hover:h-2 transition-all duration-300 rounded-l-box" />
      <Dropdown placement={"center"}>
        <DropdownButton variant={InputVariant.Primary} modifier={"circle"} size={"sm"}>
          <IoAdd />
        </DropdownButton>
        <DropdownContent className="gap-2">
          {/* buttons that show up when FAB is open */}
          {Object.values(componentRegistry).map((item) => {
            const Icon = item.icon;
            return (

              <Button
                variant={"primary"}
                onClick={() => addField(item.type, index)}
                size={"sm"}
                modifier={"block"}
                className="flex-1"
                tooltip={{
                  content: t(item.translationKey),
                  placement: TooltipPosition.Left
                }}
                key={item.type}
              >
                <Icon className="size-6" />
                {t(item.translationKey)}
              </Button>
            );
          })}
        </DropdownContent>
      </Dropdown>
      <span className="flex-1 bg-primary h-1 group-hover:h-2 transition-all duration-300 rounded-r-box" />
    </div>
  );
}
