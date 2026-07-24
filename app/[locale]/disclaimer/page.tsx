"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
  const t = useTranslations("disclaimer");

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 border-[4px] border-black bg-white px-3 py-1 text-xs font-black uppercase mb-4">
              <AlertTriangle className="w-4 h-4 text-black" />
              <span>Legal Notice</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-4">
              {t("title")}
            </h1>
            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000] space-y-6 font-bold text-sm text-black/80 leading-relaxed">
            <p className="text-base text-black font-black uppercase border-b-[3px] border-black pb-2">
              Estimates Only — Not Professional Financial Advice
            </p>
            <p>{t("content1")}</p>
            <p>{t("content2")}</p>
            <p className="bg-yellow-300 border-[3px] border-black p-4 text-black font-black">
              {t("content3")}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
