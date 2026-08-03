import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SavingsGoalClient from "./SavingsGoalClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/savings-goal";

  return {
    title: `${t("tools.savingsGoal")} (2026) | FinanceCalc Hub`,
    description: t("tools.savingsGoalDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.savingsGoal")} (2026) | FinanceCalc Hub`,
      description: t("tools.savingsGoalDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.savingsGoal")} (2026) | FinanceCalc Hub`,
      description: t("tools.savingsGoalDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Como é calculado o aporte mensal necessário para atingir minha meta?",
          answer:
            "A calculadora calcula a diferença entre o objetivo final e o saldo inicial corrigido pelos juros. O valor restante é dividido pelo fator de anuidade futura correspondente ao prazo em meses.",
        },
        {
          question: "Como o rendimento mensal da taxa de juros reduz meu esforço de poupança?",
          answer:
            "Os juros compostos cobrem uma parcela crescente do objetivo final. Quanto maior o prazo estipulado, maior será a proporção da meta paga pelos juros acumulados em relação ao dinheiro desembolsado.",
        },
        {
          question: "O que fazer se o valor de depósito mensal calculado estiver acima do meu orçamento?",
          answer:
            "Você pode ajustar a meta aumentando o prazo em meses, aumentando o capital inicial depositado ou buscando aplicações com retornos levemente superiores.",
        },
        {
          question: "Como proteger minha meta financeira contra o efeito da inflação?",
          answer:
            "Para garantir que o valor final acumulado preserve seu poder de compra real, reajuste a sua contribuição mensal anualmente pela taxa de inflação do período.",
        },
      ]
    : [
        {
          question: "How is the required monthly deposit calculated for my target goal?",
          answer:
            "The calculation subtracts compounded initial savings from the total target amount. The remaining deficit is divided by the future value annuity factor over your timeframe.",
        },
        {
          question: "How do compound returns reduce the total cash needed out-of-pocket?",
          answer:
            "Reinvested interest offsets required deposits. On extended timelines, compound growth funds a substantial percentage of the final accumulation target.",
        },
        {
          question: "What steps should I take if calculated monthly deposits exceed budget?",
          answer:
            "You can lower monthly requirements by extending target timelines, increasing initial lump-sum contributions, or finding higher risk-adjusted return investments.",
        },
        {
          question: "How can I protect a long-term savings goal against inflation erosion?",
          answer:
            "To ensure target capital retains real purchasing power upon maturity, increase monthly contribution amounts annually in line with inflation rates.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Meta de Poupança" : "Savings Goal Calculator",
    "description": isPt ? "Descubra o valor mensal exato necessário para atingir seus objetivos financeiros." : "Find exact monthly savings needed to reach your financial target on time.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/savings-goal`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "Vinicius Pontual", "url": "https://financecalchub.zanvexis.com/en/author/vinicius-pontual" },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
  };

  const contentSection = (
    <div className="space-y-8 text-black">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
          {isPt ? "Atingimento de Meta Financeira" : "Savings Goal Calculation"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "O modelo calcula o depósito periódico necessário descontando do objetivo final a valorização composta do aporte inicial:"
            : "The formula solves for required periodic PMT by discounting compounded initial savings from total target accumulation:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"Required PMT = (Goal Amount - Current Savings*(1+r)^n) / [((1+r)^n - 1)/r]"}
        </div>
      </div>

      <hr className="border-[2px] border-black" />

      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
          {isPt ? "Perguntas Frequentes (FAQ)" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-[2px] border-black p-4 bg-white shadow-[2px_2px_0_#000]">
              <h3 className="font-black text-xs sm:text-sm uppercase mb-2">{faq.question}</h3>
              <p className="text-xs font-medium text-neutral-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <SavingsGoalClient contentSection={contentSection} />
    </>
  );
}
