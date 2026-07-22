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
      className={`border-[5px] border-black p-5 shadow-[6px_6px_0_#000] ${
        highlight ? "bg-yellow-300" : "bg-white"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="text-black">{icon}</span>}
        <span className="text-xs font-black uppercase tracking-widest text-black/70">
          {label}
        </span>
      </div>
      <div className="text-2xl font-black uppercase tracking-tight text-black md:text-3xl">
        {value}
      </div>
      {subtext && (
        <div className="mt-1 text-xs font-bold text-black/60">{subtext}</div>
      )}
    </div>
  );
}