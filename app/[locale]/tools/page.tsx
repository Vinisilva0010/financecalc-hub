"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import { 
  Home, Calculator, CreditCard, TrendingUp, 
  PiggyBank, Target, BarChart3, ShieldCheck, Zap, Lock, ArrowRight
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  const tools = [
    { key: "mortgage", href: "/tools/mortgage-calculator", icon: Home },
    { key: "personalLoan", href: "/tools/personal-loan-calculator", icon: Calculator },
    { key: "creditCard", href: "/tools/credit-card-payoff", icon: CreditCard },
    { key: "compoundInterest", href: "/tools/compound-interest", icon: TrendingUp },
    { key: "savingsGoal", href: "/tools/savings-goal", icon: PiggyBank },
    { key: "debtPayoff", href: "/tools/debt-payoff", icon: Target },
    { key: "investmentReturn", href: "/tools/investment-return", icon: BarChart3 },
    { key: "affordability", href: "/tools/affordability", icon: Home },
  ];

  return (
    <main className="flex min-h-screen flex-1 flex-col justify-between bg-white selection:bg-black selection:text-yellow-300">
      <div>
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden border-b-[6px] border-black bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
            <div className="max-w-5xl">
              <div className="mb-6 inline-block border-[5px] border-black bg-yellow-300 px-5 py-2 shadow-[6px_6px_0_#000]">
                <p className="font-mono text-xs font-black uppercase tracking-[3px] text-black md:text-sm">
                  {t("hero.eyebrow")}
                </p>
              </div>

              <h1 className="mb-6 text-[42px] font-black uppercase leading-[0.9] tracking-[-3px] text-black sm:text-[56px] md:text-7xl lg:text-8xl">
                {t("hero.title")}
              </h1>

              <p className="mb-8 max-w-3xl text-[18px] font-extrabold leading-tight text-black sm:text-[22px] md:text-2xl">
                {t("hero.subtitle")}
              </p>

              {/* Trust signals */}
              <div className="mb-10 flex flex-wrap gap-x-4 gap-y-3 text-xs font-black uppercase text-black sm:text-sm">
                <span className="border-[4px] border-black bg-yellow-300 px-4 py-1.5 shadow-[4px_4px_0_#000]">
                  {t("trust.free")}
                </span>
                <span className="border-[4px] border-black bg-white px-4 py-1.5 shadow-[4px_4px_0_#000]">
                  {t("trust.noSignup")}
                </span>
                <span className="border-[4px] border-black bg-black px-4 py-1.5 text-white shadow-[4px_4px_0_#000]">
                  {t("trust.updated")}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                  href="/tools"
                  className="flex w-full items-center justify-center gap-3 border-[6px] border-black bg-yellow-300 px-10 py-5 text-center text-xl font-black uppercase tracking-tight text-black shadow-[8px_8px_0_#000] transition-all hover:bg-yellow-400 active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000] sm:w-auto"
                >
                  <span>{t("hero.ctaPrimary")}</span>
                  <ArrowRight className="h-6 w-6 stroke-[3]" />
                </Link>

                <Link
                  href="/blog"
                  className="flex w-full items-center justify-center border-[6px] border-black bg-white px-10 py-5 text-center text-xl font-black uppercase tracking-tight text-black shadow-[8px_8px_0_#000] transition-all hover:bg-zinc-100 active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000] sm:w-auto"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <div className="border-b-[6px] border-black bg-black py-4 text-yellow-300">
          <div className="mx-auto max-w-6xl px-4 text-center text-xs font-black uppercase tracking-[3px] sm:text-sm">
            {t("trust.countries")}
          </div>
        </div>

        {/* ==================== TOOLS GRID ==================== */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-12 border-b-[6px] border-black pb-6">
            <h2 className="mb-3 text-4xl font-black uppercase tracking-[-3px] text-black sm:text-6xl md:text-7xl">
              {t("tools.title")}
            </h2>
            <p className="text-xl font-black text-black/80 sm:text-2xl">
              {t("tools.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const description = t(`tools.${tool.key}Desc`, { defaultValue: "" });

              return (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group flex h-full flex-col justify-between border-[6px] border-black bg-white p-7 shadow-[8px_8px_0_#000] transition-all hover:-translate-x-1.5 hover:-translate-y-1.5 hover:bg-yellow-50 hover:shadow-[14px_14px_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000]"
                >
                  <div>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center border-[5px] border-black bg-yellow-300 text-black shadow-[5px_5px_0_#000] transition-colors group-hover:bg-black group-hover:text-yellow-300">
                      <Icon className="h-8 w-8 stroke-[3]" />
                    </div>

                    <h3 className="mb-3 text-2xl font-black uppercase leading-none tracking-tight text-black">
                      {t(`tools.${tool.key}`)}
                    </h3>

                    {description && (
                      <p className="mb-8 text-sm font-extrabold leading-relaxed text-black/80">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-block w-full border-[5px] border-black bg-white py-3.5 text-center text-xs font-black uppercase tracking-[2px] text-black shadow-[4px_4px_0_#000] transition-all group-hover:bg-black group-hover:text-white">
                      {t("common.calculate")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ==================== FEATURES ==================== */}
        <section className="border-t-[6px] border-b-[6px] border-black bg-yellow-300 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-14 border-b-[5px] border-black pb-6 text-left">
              <h2 className="mb-4 text-4xl font-black uppercase tracking-[-3px] text-black sm:text-6xl md:text-7xl">
                {t("features.title")}
              </h2>
              <p className="max-w-3xl text-xl font-black text-black sm:text-2xl">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <div className="mb-6 inline-block border-[4px] border-black bg-yellow-300 p-3 shadow-[4px_4px_0_#000]">
                  <ShieldCheck className="h-10 w-10 stroke-[3] text-black" />
                </div>
                <h3 className="mb-3 text-2xl font-black uppercase text-black sm:text-3xl">
                  {t("features.p1Title")}
                </h3>
                <p className="text-sm font-extrabold leading-relaxed text-black/90">
                  {t("features.p1Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <div className="mb-6 inline-block border-[4px] border-black bg-yellow-300 p-3 shadow-[4px_4px_0_#000]">
                  <Lock className="h-10 w-10 stroke-[3] text-black" />
                </div>
                <h3 className="mb-3 text-2xl font-black uppercase text-black sm:text-3xl">
                  {t("features.p2Title")}
                </h3>
                <p className="text-sm font-extrabold leading-relaxed text-black/90">
                  {t("features.p2Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <div className="mb-6 inline-block border-[4px] border-black bg-yellow-300 p-3 shadow-[4px_4px_0_#000]">
                  <Zap className="h-10 w-10 stroke-[3] text-black" />
                </div>
                <h3 className="mb-3 text-2xl font-black uppercase text-black sm:text-3xl">
                  {t("features.p3Title")}
                </h3>
                <p className="text-sm font-extrabold leading-relaxed text-black/90">
                  {t("features.p3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== STATS ==================== */}
        <section className="border-b-[6px] border-black bg-black py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
              <div className="border-[5px] border-white bg-neutral-900 p-8 shadow-[8px_8px_0_#fff]">
                <div className="mb-2 font-mono text-5xl font-black text-yellow-300 sm:text-6xl">
                  {t("stats.s1Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[2px] text-white sm:text-sm">
                  {t("stats.s1Label")}
                </div>
              </div>

              <div className="border-[5px] border-white bg-neutral-900 p-8 shadow-[8px_8px_0_#fff]">
                <div className="mb-2 font-mono text-5xl font-black text-yellow-300 sm:text-6xl">
                  {t("stats.s2Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[2px] text-white sm:text-sm">
                  {t("stats.s2Label")}
                </div>
              </div>

              <div className="border-[5px] border-white bg-neutral-900 p-8 shadow-[8px_8px_0_#fff]">
                <div className="mb-2 font-mono text-5xl font-black text-yellow-300 sm:text-6xl">
                  {t("stats.s3Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[2px] text-white sm:text-sm">
                  {t("stats.s3Label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="bg-white py-20 text-black">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="border-[6px] border-black bg-yellow-300 p-10 shadow-[12px_12px_0_#000] sm:p-14">
              <h2 className="mb-4 text-3xl font-black uppercase tracking-[-2px] sm:text-5xl">
                {t("ctaFinal.title")}
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-black text-black/90 sm:text-2xl">
                {t("ctaFinal.subtitle")}
              </p>

              <Link
                href="/tools"
                className="inline-flex items-center gap-3 border-[6px] border-black bg-black px-12 py-5 text-xl font-black uppercase tracking-tight text-yellow-300 shadow-[8px_8px_0_#000] transition-all hover:bg-white hover:text-black active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000]"
              >
                <span>{t("ctaFinal.button")}</span>
                <ArrowRight className="h-6 w-6 stroke-[3]" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}