"use client";

import { forwardRef } from "react";
import { useLocale } from "next-intl";
import NumberInput from "./NumberInput";

interface CurrencyInputProps {
  label: string;
  name: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  error?: string;
  helperText?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, name, placeholder, min, max, error, helperText, value, onChange, onBlur }, ref) => {
    const locale = useLocale();
    const currencySymbol = locale === "pt" ? "R$" : "$";

    return (
      <NumberInput
        ref={ref}
        label={label}
        name={name}
        placeholder={placeholder}
        min={min}
        max={max}
        step={0.01}
        error={error}
        helperText={helperText}
        prefix={currencySymbol}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
