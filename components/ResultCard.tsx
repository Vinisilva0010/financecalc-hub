import { ReactNode } from "react";

interface ResultCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  subtext?: string;
  icon?: ReactNode;
}

export default function ResultCard({
  label,
  value,
  highlight = false,
  subtext,
  icon,
}: ResultCardProps) {
  return (
    <div
      className={`border-[5px] border-black p-5 shadow-[6px_6px_0_#000] transition-all ${
        highlight ? "bg-yellow-300" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="block text-xs font-black uppercase tracking-wider text-black/80">
          {label}
        </span>
        {icon && <div className="shrink-0">{icon}</div>}
      </div>
      <div className="text-2xl sm:text-3xl font-black tracking-tight text-black">
        {value}
      </div>
      {subtext && (
        <span className="block text-xs font-bold text-black/70 mt-2 border-t-[2px] border-black/20 pt-1">
          {subtext}
        </span>
      )}
    </div>
  );
}
