"use client";

import { forwardRef } from "react";
import NumberInput from "./NumberInput";

interface PercentInputProps {
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

const PercentInput = forwardRef<HTMLInputElement, PercentInputProps>(
  ({ label, name, placeholder, min = 0, max = 100, error, helperText, value, onChange, onBlur }, ref) => {
    return (
      <NumberInput
        ref={ref}
        label={label}
        name={name}
        placeholder={placeholder || "0.00"}
        min={min}
        max={max}
        step={0.01}
        error={error}
        helperText={helperText}
        suffix="%"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
);

PercentInput.displayName = "PercentInput";

export default PercentInput;
