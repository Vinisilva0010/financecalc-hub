"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = "" }: DisclaimerProps) {
  const t = useTranslations();

  return (
    <div
      className={`border-[5px] border-black bg-yellow-100 p-6 shadow-[6px_6px_0_#000] ${className}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-black bg-yellow-300">
          <AlertTriangle className="h-5 w-5 text-black" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-black">
          {t("common.disclaimer")}
        </h3>
      </div>
      <p className="text-sm font-bold leading-relaxed text-black/80">
        {t("common.disclaimer")}
      </p>
    </div>
  );
}