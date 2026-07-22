"use client";

import { forwardRef } from "react";
import { useTranslations } from "next-intl";

interface NumberInputProps {
  label: string;
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  helperText?: string;
  suffix?: string;
  prefix?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { label, name, placeholder, min, max, step = 1, error, helperText, suffix, prefix },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="block text-xs font-black uppercase tracking-widest text-black"
        >
          {label}
        </label>

        <div className="relative">
          {prefix && (
            <span className="absolute left-0 top-0 flex h-full items-center border-r-[3px] border-black bg-gray-100 px-3 text-sm font-black text-black">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={`w-full border-[4px] border-black bg-white px-4 py-3 text-lg font-black text-black shadow-[4px_4px_0_#000] outline-none transition-all focus:shadow-[6px_6px_0_#000] ${
              prefix ? "pl-12" : ""
            } ${suffix ? "pr-12" : ""} ${
              error ? "border-red-600 shadow-[4px_4px_0_#dc2626]" : ""
            }`}
          />

          {suffix && (
            <span className="absolute right-0 top-0 flex h-full items-center border-l-[3px] border-black bg-gray-100 px-3 text-sm font-black text-black">
              {suffix}
            </span>
          )}
        </div>

        {helperText && !error && (
          <p className="text-xs font-bold text-black/60">{helperText}</p>
        )}

        {error && (
          <p className="text-xs font-black uppercase tracking-wider text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;