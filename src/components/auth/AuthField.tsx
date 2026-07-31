"use client";
import Fieldset from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  minLength?: number;
}

export function AuthField({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  minLength,
}: AuthFieldProps) {
  return (
    <Fieldset>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        minLength={minLength}
        disabled={disabled}
      />
    </Fieldset>
  );
}
