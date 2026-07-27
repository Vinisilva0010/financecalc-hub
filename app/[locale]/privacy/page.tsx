"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 border-[4px] border-black bg-white px-3 py-1 text-xs font-black uppercase mb-4">
              <Lock className="w-4 h-4 text-black" />
              <span>Data Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-4">
              {t("title")}
            </h1>
            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 space-y-8">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section1Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section1Desc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section2Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section2Desc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section3Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section3Desc")}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
