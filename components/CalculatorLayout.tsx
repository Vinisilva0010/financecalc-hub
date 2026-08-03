"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import RelatedTools from "@/components/RelatedTools";
import AdBanner from "@/components/AdBanner";

interface CalculatorLayoutProps {
  children?: ReactNode;
  titleKey: string;
  descriptionKey: string;
  resultSection: ReactNode;
  chartSection?: ReactNode;
  tableSection?: ReactNode;
  amortizationSection?: ReactNode;
  contentSection?: ReactNode;
  relatedTools?: ReactNode;
  disclaimer?: ReactNode;
  toolKey?: string;
  categoryKey?: string;
}

export default function CalculatorLayout({
  children,
  titleKey,
  descriptionKey,
  resultSection,
  chartSection,
  tableSection,
  amortizationSection,
  contentSection,
  relatedTools,
  disclaimer,
  toolKey = "",
  categoryKey = "common.calculators",
}: CalculatorLayoutProps) {
  const t = useTranslations();
  const activeTable = amortizationSection ?? tableSection;

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        {/* HEADER DA CALCULADORA */}
        <section className="border-b-[6px] border-black bg-yellow-300 py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-4 inline-block border-[4px] border-black bg-white px-3 py-1 font-mono text-xs font-black uppercase shadow-[4px_4px_0_#000]">
              {categoryKey.includes(".") ? t(categoryKey) : categoryKey}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black mb-3">
              {titleKey.includes(".") ? t(titleKey) : titleKey}
            </h1>
            <p className="text-base sm:text-lg font-extrabold text-black/80 max-w-3xl">
              {descriptionKey.includes(".") ? t(descriptionKey) : descriptionKey}
            </p>
          </div>
        </section>

        {/* CONTAINER DA CALCULADORA */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* PAINEL DE INPUTS */}
            <div className="lg:col-span-5 border-[6px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_#000] flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-black uppercase mb-6 pb-2 border-b-[4px] border-black text-black">
                  {t("common.inputs")}
                </h2>
                <div className="space-y-6">{children}</div>
              </div>
            </div>

            {/* PAINEL DE RESULTADOS E GRÁFICOS */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="border-[6px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_#000]">
                <h2 className="text-xl font-black uppercase mb-6 pb-2 border-b-[4px] border-black text-black">
                  {t("common.resultsSummary")}
                </h2>
                {resultSection}
              </div>

              {chartSection && (
                <div className="border-[6px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_#000] flex-1">
                  {chartSection}
                </div>
              )}
            </div>
          </div>

          {/* ADSENSE SLOT */}
          <AdBanner format="horizontal" className="my-10" />

          {/* TABELA DE AMORTIZAÇÃO */}
          {activeTable && (
            <div className="mt-10 border-[6px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_#000]">
              {activeTable}
            </div>
          )}

          {/* CONTEÚDO EDUCACIONAL */}
          {contentSection && (
            <div className="mt-10 border-[6px] border-black bg-zinc-50 p-6 sm:p-8 shadow-[8px_8px_0_#000]">
              {contentSection}
            </div>
          )}

          {/* DISCLAIMER E FERRAMENTAS RELACIONADAS */}
          <div className="mt-12 space-y-8">
            {disclaimer ?? <Disclaimer />}
            {relatedTools ?? <RelatedTools currentToolKey={toolKey} />}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
