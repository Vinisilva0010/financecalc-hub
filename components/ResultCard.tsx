"use client";

import { ReactNode } from "react";

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: ReactNode;
  subtext?: string;
}

export default function ResultCard({
  label,
  value,
  highlight = false,
  icon,
  subtext,
}: ResultCardProps) {
  return (
    <div
      className={`border-[5px] border-black p-5 shadow-[6px_6px_0_#000] flex flex-col justify-between w-full h-full min-w-0 ${
        highlight ? "bg-yellow-300" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-xs font-black uppercase tracking-wider text-black break-words leading-tight">
          {label}
        </span>
        {icon && <div className="shrink-0">{icon}</div>}
      </div>
      <div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-black break-all leading-none">
          {value}
        </div>
        {subtext && (
          <p className="text-xs font-bold text-neutral-600 mt-2">{subtext}</p>
        )}
      </div>
    </div>
  );
}
