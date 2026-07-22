"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowLeft, Calculator } from "lucide-react";

interface CalculatorLayoutProps {
  titleKey: string;
  descriptionKey: string;
  children: ReactNode;
  resultSection?: ReactNode;
  chartSection?: ReactNode;
  amortizationSection?: ReactNode;
  explanationSection?: ReactNode;
  relatedTools?: ReactNode;
  schemaMarkup?: ReactNode;
}

export default function CalculatorLayout({
  titleKey,
  descriptionKey,
  children,
  resultSection,
  chartSection,
  amortizationSection,
  explanationSection,
  relatedTools,
  schemaMarkup,
}: CalculatorLayoutProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {schemaMarkup}

      {/* AdSense Space: Top Banner */}
      {/* <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex h-24 items-center justify-center border-2 border-dashed border-black/30 bg-gray-100">
          <span className="text-xs font-bold uppercase tracking-widest text-black/40">AdSense Top Banner</span>
        </div>
      </div> */}

      {/* Header */}
      <div className="border-b-[5px] border-black bg-yellow-300">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link
            href="/tools"
            className="mb-4 inline-flex items-center gap-2 border-[3px] border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("nav.tools")}
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center border-[4px] border-black bg-white">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-black md:text-4xl">
                {t(titleKey)}
              </h1>
              <p className="text-sm font-bold text-black/70 md:text-base">
                {t(descriptionKey)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
              <h2 className="mb-6 text-lg font-black uppercase tracking-tight text-black">
                {t("common.calculate")}
              </h2>
              {children}
            </div>

            {/* AdSense Space: Middle */}
            {/* <div className="flex h-32 items-center justify-center border-2 border-dashed border-black/30 bg-gray-100">
              <span className="text-xs font-bold uppercase tracking-widest text-black/40">AdSense In-Content</span>
            </div> */}

            {explanationSection && (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
                {explanationSection}
              </div>
            )}

            {amortizationSection && (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
                {amortizationSection}
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            {resultSection && (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
                {resultSection}
              </div>
            )}

            {chartSection && (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
                {chartSection}
              </div>
            )}

            {/* AdSense Space: Sidebar */}
            {/* <div className="flex h-64 items-center justify-center border-2 border-dashed border-black/30 bg-gray-100">
              <span className="text-xs font-bold uppercase tracking-widest text-black/40">AdSense Sidebar</span>
            </div> */}

            {relatedTools && (
              <div className="border-[5px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
                {relatedTools}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}