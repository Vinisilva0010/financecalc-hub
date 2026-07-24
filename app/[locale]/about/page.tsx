"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import { ShieldCheck, Code, DollarSign, Award } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-4">
              {t("title")}
            </h1>
            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 space-y-10">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("missionTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("missionDesc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("authorTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed mb-4">
              {t("authorDesc")}
            </p>
            <div className="inline-flex items-center gap-2 border-[3px] border-black bg-yellow-300 px-3 py-1 font-mono text-xs font-black uppercase">
              <Award className="w-4 h-4" />
              <span>Tested via TDD & Arbitrary Precision Math</span>
            </div>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("transparencyTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("transparencyDesc")}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
