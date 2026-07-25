"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  const t = useTranslations("common");

  let text = "Estimates only. Calculations do not constitute formal financial advice. Always consult a qualified professional before making financial commitments.";
  
  try {
    text = t("disclaimerText");
  } catch (e) {
    // Fallback caso a chave não exista no i18n
  }

  return (
    <div className="border-[5px] border-black bg-yellow-100 p-5 shadow-[6px_6px_0_#000] flex items-start gap-4">
      <AlertCircle className="w-6 h-6 text-black shrink-0 mt-0.5 stroke-[2.5]" />
      <p className="text-xs font-bold text-black/90 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
