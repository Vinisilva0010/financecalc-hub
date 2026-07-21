import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b-4 border-black bg-violet-200">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-32">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-violet-700">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mb-6 max-w-4xl text-5xl font-black uppercase leading-[0.85] tracking-tight text-black md:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-bold text-black/80">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="inline-block border-4 border-black bg-yellow-300 px-8 py-4 text-sm font-black uppercase tracking-tight text-black shadow-[6px_6px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/blog"
              className="inline-block border-4 border-black bg-white px-8 py-4 text-sm font-black uppercase tracking-tight text-black shadow-[6px_6px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-black">
          {t("tools.title")}
        </h2>
        <p className="mb-8 font-bold text-black/70">{t("tools.subtitle")}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { key: "mortgage", href: "/tools/mortgage-calculator" },
            { key: "personalLoan", href: "/tools/personal-loan-calculator" },
            { key: "creditCard", href: "/tools/credit-card-payoff" },
            { key: "compoundInterest", href: "/tools/compound-interest" },
            { key: "savingsGoal", href: "/tools/savings-goal" },
            { key: "debtPayoff", href: "/tools/debt-payoff" },
            { key: "investmentReturn", href: "/tools/investment-return" },
            { key: "affordability", href: "/tools/affordability" },
          ].map((tool) => (
            <Link
              key={tool.key}
              href={tool.href}
              className="group block border-5 border-black bg-white p-7 shadow-[8px_8px_0_#000] transition-all hover:-translate-x-1.5 hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-fuchsia-50 hover:shadow-[14px_14px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[3px_3px_0_#000]"
            >
              <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-black">
                {t(`tools.${tool.key}`)}
              </h3>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-700">
                {t("common.calculate")}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}