"use client";

import { forwardRef } from "react";
import NumberInput from "./NumberInput";

interface PercentInputProps {
  label: string;
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string;
  helperText?: string;
}

const PercentInput = forwardRef<HTMLInputElement, PercentInputProps>(
  ({ label, name, placeholder, min = 0, max = 100, error, helperText }, ref) => {
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
      />
    );
  }
);

PercentInput.displayName = "PercentInput";

export default PercentInput;