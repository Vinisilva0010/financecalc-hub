"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { 
  Home, Calculator, CreditCard, TrendingUp, 
  PiggyBank, Target, BarChart3 
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
    <main className="flex-1 bg-white">
      {/* ==================== HERO (Bem pesado) ==================== */}
      <section className="border-b-[6px] border-black bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-5xl">
            <div className="mb-4 inline-block border-[5px] border-black bg-yellow-300 px-4 py-1.5">
              <p className="font-mono text-xs font-black uppercase tracking-[3px] text-black md:text-sm">
                {t("hero.eyebrow")}
              </p>
            </div>

            <h1 className="mb-6 text-[40px] font-black uppercase leading-[0.92] tracking-[-2px] text-black md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mb-9 max-w-3xl text-[17px] font-bold leading-tight text-black/80 md:text-xl">
              {t("hero.subtitle")}
            </p>

            {/* Trust signals */}
            <div className="mb-8 flex flex-wrap gap-x-7 gap-y-2 text-sm font-black text-black/80">
              <div>{t("trust.free")}</div>
              <div>{t("trust.noSignup")}</div>
              <div>{t("trust.updated")}</div>
            </div>

            {/* Botões bem brutais */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/tools"
                className="flex w-full items-center justify-center border-[5px] border-black bg-yellow-300 px-10 py-4 text-center text-base font-black uppercase tracking-[-0.5px] text-black shadow-[8px_8px_0_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000] sm:w-auto sm:text-lg"
              >
                {t("hero.ctaPrimary")}
              </Link>

              <Link
                href="/blog"
                className="flex w-full items-center justify-center border-[5px] border-black bg-white px-10 py-4 text-center text-base font-black uppercase tracking-[-0.5px] text-black shadow-[8px_8px_0_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000] sm:w-auto sm:text-lg"
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

      {/* ==================== TOOLS SECTION - BRUTALISTA AGRESSIVO ==================== */}
<section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
  <div className="mb-8 md:mb-10">
    <h2 className="mb-2 text-4xl font-black uppercase tracking-[-1.5px] text-black md:text-5xl">
      {t("tools.title")}
    </h2>
    <p className="text-lg font-bold text-black/70">
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
          className="group flex h-full flex-col justify-between border-[6px] border-black bg-white p-6 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-zinc-50 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0_#000] sm:p-7"
        >
          <div>
            {/* Ícone com borda grossa */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center border-[5px] border-black bg-white text-black group-hover:bg-yellow-300">
              <Icon className="h-7 w-7" />
            </div>

            <h3 className="mb-3 text-[21px] font-black uppercase tracking-[-0.5px] text-black">
              {t(`tools.${tool.key}`)}
            </h3>

            {description && (
              <p className="mb-7 text-[15px] font-bold leading-snug text-black/75">
                {description}
              </p>
            )}
          </div>

          {/* Botão bem bruto */}
          <div className="mt-auto">
            <span className="inline-block border-[4px] border-black bg-white px-6 py-2.5 text-xs font-black uppercase tracking-[1.5px] text-black transition-all group-hover:bg-black group-hover:text-white">
              {t("common.calculate")}
            </span>
          </div>
        </Link>
      );
    })}
  </div>
</section>

      {/* ==================== FINAL CTA (Bem agressivo) ==================== */}
      <section className="border-t-[6px] border-black bg-black py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-5 text-3xl font-black uppercase tracking-[-1px] md:text-4xl">
                        {t("ctaFinal.title")}
          </h2>
          <p className="mb-9 text-lg text-white/80">
            {t("ctaFinal.subtitle")}
          </p>

          <Link
            href="/tools"
            className="inline-block border-[5px] border-white bg-yellow-300 px-12 py-4 text-lg font-black uppercase tracking-tight text-black active:bg-white"
          >
            {t("ctaFinal.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}