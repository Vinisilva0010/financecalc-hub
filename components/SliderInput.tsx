"use client";

import { useState, useEffect } from "react";

interface SliderInputProps {
  label: string;
  name: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  prefix?: string;
}

export default function SliderInput({
  label,
  name,
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix,
  prefix,
}: SliderInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setDisplayValue(newValue);
    onChange(newValue);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setDisplayValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs font-black uppercase tracking-widest text-black"
        >
          {label}
        </label>
        <div className="flex items-center border-[3px] border-black bg-white shadow-[3px_3px_0_#000]">
          {prefix && (
            <span className="border-r-[3px] border-black bg-gray-100 px-2 py-1 text-sm font-black">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={displayValue}
            onChange={handleNumberChange}
            min={min}
            max={max}
            step={step}
            className="w-24 px-2 py-1 text-right text-sm font-black outline-none"
          />
          {suffix && (
            <span className="border-l-[3px] border-black bg-gray-100 px-2 py-1 text-sm font-black">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        id={name}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="h-3 w-full cursor-pointer appearance-none border-[3px] border-black bg-white accent-yellow-400"
      />

      <div className="flex justify-between text-xs font-bold text-black/60">
        <span>
          {prefix}
          {min}
          {suffix}
        </span>
        <span>
          {prefix}
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}