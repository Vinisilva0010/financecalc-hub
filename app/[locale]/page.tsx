"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import { 
  Home, Calculator, CreditCard, TrendingUp, 
  PiggyBank, Target, BarChart3, ShieldCheck, Zap, Lock
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
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        {/* HERO */}
        <section className="border-b-[6px] border-black bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
            <div className="max-w-5xl">
              <div className="mb-6 inline-block border-[6px] border-black bg-yellow-300 px-5 py-2 shadow-[6px_6px_0_#000]">
                <p className="font-mono text-xs font-black uppercase tracking-[3px] text-black md:text-sm">
                  {t("hero.eyebrow")}
                </p>
              </div>

              <h1 className="mb-6 text-[40px] sm:text-[48px] font-black uppercase leading-[0.92] tracking-[-2.5px] text-black md:text-6xl lg:text-7xl">
                {t("hero.title")}
              </h1>

              <p className="mb-8 max-w-3xl text-[18px] sm:text-[20px] font-extrabold leading-tight text-black md:text-2xl">
                {t("hero.subtitle")}
              </p>

              {/* Trust signals */}
              <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-black uppercase text-black">
                <span className="border-[4px] border-black bg-zinc-100 px-3 py-1 shadow-[4px_4px_0_#000]">{t("trust.free")}</span>
                <span className="border-[4px] border-black bg-zinc-100 px-3 py-1 shadow-[4px_4px_0_#000]">{t("trust.noSignup")}</span>
                <span className="border-[4px] border-black bg-zinc-100 px-3 py-1 shadow-[4px_4px_0_#000]">{t("trust.updated")}</span>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                  href="/tools/mortgage-calculator"
                  className="flex w-full items-center justify-center border-[6px] border-black bg-yellow-300 px-10 py-5 text-center text-lg font-black uppercase tracking-tight text-black shadow-[8px_8px_0_#000] transition-all hover:bg-yellow-400 active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000] sm:w-auto"
                >
                  {t("hero.ctaPrimary")}
                </Link>

                <Link
                  href="/about"
                  className="flex w-full items-center justify-center border-[6px] border-black bg-white px-10 py-5 text-center text-lg font-black uppercase tracking-tight text-black shadow-[8px_8px_0_#000] transition-all hover:bg-zinc-100 active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#000] sm:w-auto"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <div className="border-b-[6px] border-black bg-black py-4 text-white">
          <div className="mx-auto max-w-6xl px-4 text-center text-xs font-black tracking-[2px] uppercase md:text-sm">
            {t("trust.countries")}
          </div>
        </div>

        {/* TOOLS SECTION */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-10 md:mb-12">
            <h2 className="mb-3 text-4xl sm:text-5xl font-black uppercase tracking-[-2px] text-black md:text-6xl">
              {t("tools.title")}
            </h2>
            <p className="text-lg sm:text-xl font-extrabold text-black/80">
              {t("tools.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const description = t(`tools.${tool.key}Desc`, { defaultValue: "" });

              return (
                <Link
                  key={tool.key}
                  href={tool.href}
                  className="group flex h-full flex-col justify-between border-[6px] border-black bg-white p-6 shadow-[8px_8px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] hover:bg-yellow-50 active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000]"
                >
                  <div>
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border-[5px] border-black bg-yellow-300 text-black shadow-[4px_4px_0_#000]">
                      <Icon className="h-7 w-7 stroke-[2.5]" />
                    </div>

                    <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-black">
                      {t(`tools.${tool.key}`)}
                    </h3>

                    {description && (
                      <p className="mb-6 text-sm font-bold leading-relaxed text-black/80">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-block w-full text-center border-[4px] border-black bg-white py-3 text-xs font-black uppercase tracking-[1.5px] text-black shadow-[4px_4px_0_#000] transition-all group-hover:bg-black group-hover:text-white">
                      {t("common.calculate")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* E-E-A-T / FEATURES SECTION */}
        <section className="border-t-[6px] border-b-[6px] border-black bg-yellow-300 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-left">
              <h2 className="mb-4 text-4xl sm:text-5xl font-black uppercase tracking-[-2px] text-black md:text-6xl">
                {t("features.title")}
              </h2>
              <p className="text-lg sm:text-xl font-extrabold text-black max-w-2xl">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <ShieldCheck className="h-12 w-12 text-black mb-5 stroke-[2.5]" />
                <h3 className="text-2xl font-black uppercase mb-3 text-black">
                  {t("features.p1Title")}
                </h3>
                <p className="font-bold text-sm text-black/80 leading-relaxed">
                  {t("features.p1Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <Lock className="h-12 w-12 text-black mb-5 stroke-[2.5]" />
                <h3 className="text-2xl font-black uppercase mb-3 text-black">
                  {t("features.p2Title")}
                </h3>
                <p className="font-bold text-sm text-black/80 leading-relaxed">
                  {t("features.p2Desc")}
                </p>
              </div>

              <div className="border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
                <Zap className="h-12 w-12 text-black mb-5 stroke-[2.5]" />
                <h3 className="text-2xl font-black uppercase mb-3 text-black">
                  {t("features.p3Title")}
                </h3>
                <p className="font-bold text-sm text-black/80 leading-relaxed">
                  {t("features.p3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-black py-12 text-white border-b-[6px] border-black">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="border-[4px] border-white p-6 bg-neutral-900 shadow-[6px_6px_0_#fff]">
                <div className="text-4xl sm:text-5xl font-black text-yellow-300 mb-2">
                  {t("stats.s1Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-white">
                  {t("stats.s1Label")}
                </div>
              </div>

              <div className="border-[4px] border-white p-6 bg-neutral-900 shadow-[6px_6px_0_#fff]">
                <div className="text-4xl sm:text-5xl font-black text-yellow-300 mb-2">
                  {t("stats.s2Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-white">
                  {t("stats.s2Label")}
                </div>
              </div>

              <div className="border-[4px] border-white p-6 bg-neutral-900 shadow-[6px_6px_0_#fff]">
                <div className="text-4xl sm:text-5xl font-black text-yellow-300 mb-2">
                  {t("stats.s3Val")}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-white">
                  {t("stats.s3Label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-black py-16 sm:py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-black uppercase tracking-tight md:text-5xl">
              {t("ctaFinal.title")}
            </h2>
            <p className="mb-10 text-lg sm:text-xl font-bold text-white/80 max-w-2xl mx-auto">
              {t("ctaFinal.subtitle")}
            </p>

            <Link
              href="/tools/mortgage-calculator"
              className="inline-block border-[6px] border-white bg-yellow-300 px-12 py-5 text-xl font-black uppercase tracking-tight text-black shadow-[8px_8px_0_#fff] transition-all hover:bg-white active:translate-x-1.5 active:translate-y-1.5 active:shadow-[2px_2px_0_#fff]"
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
