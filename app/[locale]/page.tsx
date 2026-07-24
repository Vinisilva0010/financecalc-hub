"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import {
  Home,
  Calculator,
  CreditCard,
  TrendingUp,
  PiggyBank,
  Target,
  BarChart3,
  ShieldCheck,
  Zap,
  Lock,
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
    <main className="flex min-h-screen flex-1 flex-col justify-between bg-white">
      <div>
        {/* ==================== HERO ==================== */}
        <section className="border-b-[6px] border-black bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-20">
            <div className="max-w-5xl">
              <div className="mb-4 inline-block border-[5px] border-black bg-yellow-300 px-4 py-1.5">
                <p className="font-mono text-xs font-black uppercase tracking-[2px] text-black md:text-sm md:tracking-[3px]">
                  {t("hero.eyebrow")}
                </p>
              </div>

              <h1 className="mb-6 text-[36px] font-black uppercase leading-[0.95] tracking-[-2px] text-black sm:text-[40px] md:text-6xl lg:text-7xl">
                {t("hero.title")}
              </h1>

              <p className="mb-8 max-w-3xl text-[16px] font-bold leading-tight text-black/80 sm:text-[17px] md:text-xl">
                {t("hero.subtitle")}
              </p>

              {/* Trust signals */}
              <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-black text-black/80 sm:text-sm">
                <div>{t("trust.free")}</div>
                <div>{t("trust.noSignup")}</div>
                <div>{t("trust.updated")}</div>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/tools"
                  className="flex w-full items-center justify-center border-[5px] border-black bg-yellow-300 px-8 py-3.5 text-center text-base font-black uppercase tracking-[-0.5px] text-black shadow-[6px_6px_0_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000] sm:w-auto sm:text-lg sm:shadow-[8px_8px_0_#000]"
                >
                  {t("hero.ctaPrimary")}
                </Link>

                <Link
                  href="/blog"
                  className="flex w-full items-center justify-center border-[5px] border-black bg-white px-8 py-3.5 text-center text-base font-black uppercase tracking-[-0.5px] text-black shadow-[6px_6px_0_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000] sm:w-auto sm:text-lg sm:shadow-[8px_8px_0_#000]"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <div className="border-b-[5px] border-black bg-black py-3 text-white">
          <div className="mx-auto max-w-6xl px-4 text-center text-xs font-black tracking-[1.5px] md:text-sm">
            {t("trust.countries")}
          </div>
        </div>

        {/* ==================== TOOLS ==================== */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-8 md:mb-10">
            <h2 className="mb-2 text-3xl font-black uppercase tracking-[-1.5px] text-black sm:text-4xl md:text-5xl">
              {t("tools.title")}
            </h2>
            <p className="text-base font-bold text-black/70 sm:text-lg">
              {t("tools.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const description = t(`tools.${tool.key}Desc`, { defaultValue: "" });

              return (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group flex h-full flex-col justify-between border-[5px] border-black bg-white p-5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-zinc-50 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0_#000] sm:border-[6px] sm:p-7"
                >
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center border-[4px] border-black bg-white text-black group-hover:bg-yellow-300 sm:mb-5 sm:h-14 sm:w-14 sm:border-[5px]">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>

                    <h3 className="mb-2 text-[19px] font-black uppercase tracking-[-0.5px] text-black sm:mb-3 sm:text-[21px]">
                      {t(`tools.${tool.key}`)}
                    </h3>

                    {description && (
                      <p className="mb-6 text-[14px] font-bold leading-snug text-black/75 sm:text-[15px]">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-block border-[3px] border-black bg-white px-5 py-2 text-xs font-black uppercase tracking-[1.5px] text-black transition-all group-hover:bg-black group-hover:text-white sm:border-[4px]">
                      {t("common.calculate")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ==================== FEATURES (E-E-A-T) ==================== */}
        <section className="border-t-[6px] border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-3 text-3xl font-black uppercase tracking-[-1.5px] text-black sm:text-4xl md:text-5xl">
                {t("features.title")}
              </h2>
              <p className="text-base font-bold text-black/80 sm:text-lg">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="border-[6px] border-black bg-white p-6 shadow-[8px_8px_0_#000] sm:p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border-[5px] border-black bg-white">
                  <ShieldCheck className="h-7 w-7 text-black" />
                </div>
                <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-black">
                  {t("features.p1Title")}
                </h3>
                <p className="text-[15px] font-bold leading-snug text-black/80">
                  {t("features.p1Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-6 shadow-[8px_8px_0_#000] sm:p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border-[5px] border-black bg-white">
                  <Lock className="h-7 w-7 text-black" />
                </div>
                <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-black">
                  {t("features.p2Title")}
                </h3>
                <p className="text-[15px] font-bold leading-snug text-black/80">
                  {t("features.p2Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-6 shadow-[8px_8px_0_#000] sm:p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border-[5px] border-black bg-white">
                  <Zap className="h-7 w-7 text-black" />
                </div>
                <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-black">
                  {t("features.p3Title")}
                </h3>
                <p className="text-[15px] font-bold leading-snug text-black/80">
                  {t("features.p3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== STATS ==================== */}
        <section className="bg-black py-10 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="border-[5px] border-white p-5 text-center sm:p-6">
                <div className="mb-1 text-3xl font-black text-yellow-300 sm:text-4xl">
                  {t("stats.s1Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[1.5px] text-white">
                  {t("stats.s1Label")}
                </div>
              </div>

              <div className="border-[5px] border-white p-5 text-center sm:p-6">
                <div className="mb-1 text-3xl font-black text-yellow-300 sm:text-4xl">
                  {t("stats.s2Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[1.5px] text-white">
                  {t("stats.s2Label")}
                </div>
              </div>

              <div className="border-[5px] border-white p-5 text-center sm:p-6">
                <div className="mb-1 text-3xl font-black text-yellow-300 sm:text-4xl">
                  {t("stats.s3Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-[1.5px] text-white">
                  {t("stats.s3Label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="border-t-[6px] border-b-[6px] border-black bg-black py-12 text-white sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-black uppercase tracking-[-1px] sm:text-3xl md:text-4xl">
              {t("ctaFinal.title")}
            </h2>
            <p className="mb-8 text-base text-white/80 sm:text-lg">
              {t("ctaFinal.subtitle")}
            </p>

            <Link
              href="/tools"
              className="inline-block border-[5px] border-white bg-yellow-300 px-8 py-3.5 text-base font-black uppercase tracking-tight text-black transition-all active:bg-white sm:px-12 sm:py-4 sm:text-lg"
            >
              {t("ctaFinal.button")}
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}