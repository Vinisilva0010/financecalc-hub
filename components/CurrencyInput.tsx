"use client";

import { forwardRef } from "react";
import { useLocale } from "next-intl";
import NumberInput from "./NumberInput";

interface CurrencyInputProps {
  label: string;
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string;
  helperText?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, name, placeholder, min, max, error, helperText }, ref) => {
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
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;