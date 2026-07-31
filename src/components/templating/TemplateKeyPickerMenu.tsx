"use client";
import { useTranslations } from "next-intl";
import type { TemplateKey } from "@/types/TemplateKey";
import { IoAdd, IoClose } from "react-icons/io5";

interface TemplateKeyPickerMenuProps {
  keys: TemplateKey[];
  onSelect: (key: TemplateKey) => void;
  onCreateNew: () => void;
  onClear?: () => void;
}

export function TemplateKeyPickerMenu({
  keys,
  onSelect,
  onCreateNew,
  onClear,
}: TemplateKeyPickerMenuProps) {
  const t = useTranslations();

  return (
    <ul className="menu w-full p-0">
      {onClear && (
        <li>
          <button type="button" onClick={onClear}>
            <IoClose /> {t("templating.picker.clear")}
          </button>
        </li>
      )}
      {keys.length === 0 && (
        <li className="px-2 py-1 text-sm text-base-content/60">
          {t("templating.picker.empty")}
        </li>
      )}
      {keys.map((key) => (
        <li key={key.id}>
          <button type="button" onClick={() => onSelect(key)}>
            {key.label}
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={onCreateNew}>
          <IoAdd /> {t("templating.picker.newKey")}
        </button>
      </li>
    </ul>
  );
}
