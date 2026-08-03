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
    <div className="space-y-10 text-black">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-black pb-2">
          {isPt ? "Planejamento e Cálculo do Aporte para Metas Financeiras" : "Savings Goal Financial Modeling & Required Contribution"}
        </h2>

        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Definir um objetivo financeiro futuro — seja para reserva de emergência, entrada de imóvel ou compra de ativo — exige calcular com precisão o valor do aporte mensal necessário (PMT). A matemática financeira resolve essa equação isolando o fluxo de caixa exigido a partir do valor acumulado futuro pretendido, descontando o montante inicial aportado e a taxa de rendimento esperada."
              : "Reaching a defined future financial objective requires solving for the exact periodic deposit (PMT). Financial engineering determines required cash outflows by isolating target future values against initial principal compounded growth and expected interest yields."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. Crescimento do Capital Inicial" : "1. Initial Capital Compounding"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Calcula quanto o saldo depositado no início da meta renderá sozinho até a data estipulada, reduzindo o valor total pendente."
                  : "Calculates the standalone interest gain generated by your initial balance up to maturity, directly reducing required out-of-pocket deposits."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. Anuidade do Depósito Recorrente" : "2. Annuity Factor for Monthly Deposits"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Divide o saldo restante pelo fator de acumulação de juros mensais, determinando o valor exato a ser economizado por mês."
                  : "Divides remaining target deficit by the monthly compounding accumulation factor to solve for required monthly allocations."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "A equação analítica para determinar o Aporte Mensal Necessário (PMT) é:"
              : "The analytical equation used to solve for Required Monthly Contribution (PMT) is defined as:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            PMT = [ MetaFinal - ( SaldoInicial × (1 + r)^n ) ] / [ ((1 + r)^n - 1) / r ]
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 border-b-[3px] border-black pb-2">
          {isPt ? "Perguntas Frequentes (FAQ)" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-[3px] border-black p-5 bg-white shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-sm sm:text-base uppercase mb-3 text-black">
                {faq.question}
              </h3>
              <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-[4px] border-black bg-yellow-300 p-6 shadow-[4px_4px_0_#000]">
        <h2 className="font-black uppercase text-lg mb-3">
          {isPt ? "Reajuste pela Inflação e Perfil de Risco" : "Inflation Adjustments & Asset Allocation"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Para objetivos de médio e longo prazo, aumente o valor dos aportes anualmente no mesmo percentual da inflação do período. Mantenha os recursos de metas de curto prazo em ativos de alta liquidez e baixo risco para evitar volatilidade de mercado antes do saque."
            : "For mid-to-long-term targets, adjust monthly contribution amounts annually to keep pace with inflation rates. Keep short-term goal capital in high-liquidity, low-volatility fixed income instruments to mitigate market drawdowns prior to maturity."}
        </p>
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
