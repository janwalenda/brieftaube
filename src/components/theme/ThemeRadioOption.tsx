"use client";

export function ThemeRadioOption({
  radioValue,
  checked,
  label,
  onChange,
}: {
  radioValue: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex gap-2 p-1 cursor-pointer items-center has-checked:bg-primary">
      <input
        type="radio"
        name="theme-radios"
        className="radio radio-sm theme-controller"
        value={radioValue}
        checked={checked}
        onChange={(event) => {
          if (event.target.checked) {
            onChange();
          }
        }}
      />
      {label}
    </label>
  );
}
