"use client"
import { useField } from "@/hooks/useField";
import { Button } from "@/components/ui/button";
import { TooltipPosition } from "@/types/tooltipPosition";
import { InputVariant } from "@/types/inputVariant";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { componentRegistry } from "@/config/componentRegistry";
import { IoAdd } from "react-icons/io5";

export default function FAB() {
  const { addField } = useField();
  const t = useTranslations('fab');

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  if (!isClient) {
    return null;
  }

  return (
    <div className="fab">
      {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <Tooltip variant={InputVariant.Secondary} placement={TooltipPosition.Left} content={t('plus')}>
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-secondary" aria-label={t('plus')}>
          <IoAdd className="size-6" />
        </div>
      </Tooltip>
      {/* buttons that show up when FAB is open */}
      {Object.values(componentRegistry).map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.type}
            variant={"primary"}
            className="btn btn-lg btn-circle"
            onClick={() => addField(item.type)}
            tooltip={{
              content: t('button'),
              placement: TooltipPosition.Left
            }}
          >
            <Icon className="size-6" />
          </Button>
        );
      })}
    </div>
  );
}
