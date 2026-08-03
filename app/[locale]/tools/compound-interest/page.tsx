import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CompoundInterestClient from "./CompoundInterestClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/compound-interest";

  return {
    title: `${t("tools.compoundInterest")} (2026) | FinanceCalc Hub`,
    description: t("tools.compoundInterestDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.compoundInterest")} (2026) | FinanceCalc Hub`,
      description: t("tools.compoundInterestDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.compoundInterest")} (2026) | FinanceCalc Hub`,
      description: t("tools.compoundInterestDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Como funcionam os juros compostos com aportes mensais recorrentes?",
          answer:
            "A cada mês, os juros incidem sobre a soma do capital inicial, dos rendimentos passados acumulados e dos novos aportes realizados. Esse processo gera o efeito de juros sobre juros, fazendo a curva de crescimento do seu patrimônio se tornar exponencial ao longo dos anos.",
        },
        {
          question: "Qual é a fórmula matemática utilizada para projetar o montante final?",
          answer:
            "A projeção utiliza a soma do Valor Futuro do Principal com o Valor Futuro de uma Anuidade Ordinária: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)], onde P é o aporte inicial, PMT é o depósito mensal, r é a taxa anual, n é a frequência de capitalização e t é o tempo em anos.",
        },
        {
          question: "Por que o tempo investido é mais relevante do que a taxa de juros?",
          answer:
            "Devido à natureza exponencial da fórmula de juros compostos, os retornos acumulados nos anos finais do investimento tendem a superar em muitas vezes o total investido do próprio bolso, mesmo em cenários de taxas moderadas.",
        },
        {
          question: "Esta calculadora considera a inflação ou desconto do imposto de renda?",
          answer:
            "A calculadora exibe o crescimento nominal bruto. Para calcular o valor real corrigido pela inflação, você pode subtrair a taxa de inflação esperada da taxa de juros anual informada antes de rodar a simulação.",
        },
      ]
    : [
        {
          question: "How do compound interest and monthly recurring deposits interact?",
          answer:
            "Interest accumulates during each period on both the original deposit and previously earned interest, plus new monthly cash additions. This compounding process causes wealth accumulation to follow an exponential growth curve over time.",
        },
        {
          question: "What is the complete formula for compound growth with monthly additions?",
          answer:
            "The calculation combines the Future Value of Principal and Future Value of Annuity: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)], where P is principal, PMT is deposit, r is rate, n is compounding frequency, and t is time in years.",
        },
        {
          question: "Why is investment duration more critical than annual yield percentage?",
          answer:
            "Because compound returns compound exponentially, the compounding effect in later years generates returns that drastically outpace total out-of-pocket contributions, making timeline the single most important factor.",
        },
        {
          question: "Does this simulation adjust for inflation or taxes?",
          answer:
            "The results present gross nominal amounts. To estimate inflation-adjusted purchasing power, subtract expected inflation percentages directly from your annual return rate input.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Juros Compostos" : "Compound Interest Calculator",
    "description": isPt ? "Simule o crescimento exponencial dos seus investimentos com aportes mensais." : "Simulate exponential investment growth with monthly contributions.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/compound-interest`,
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
          {isPt ? "Mecânica dos Juros Compostos e Aportes Recorrentes" : "Mechanics of Compound Interest & Recurring Deposits"}
        </h2>

        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Diferente dos juros simples — em que a rentabilidade incide apenas sobre o capital inicial —, os juros compostos multiplicam o patrimônio recalculando os rendimentos sobre o montante acumulado mais os aportes mensais realizados ao longo do tempo."
              : "Unlike simple interest — where yield applies strictly to the initial deposit —, compound interest multiplies capital by evaluating returns on accumulated earnings plus ongoing periodic deposits."}
          </p>

          <p>
            {isPt
              ? "O modelo matemático aplicado pelo FinanceCalc Hub divide o cálculo do saldo acumulado final em duas estruturas financeiras essenciais:"
              : "The mathematical model applied by FinanceCalc Hub breaks the total future value into two core financial components:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. Valor Futuro do Principal (Aporte Inicial)" : "1. Future Value of Initial Principal"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Modela o crescimento isolado do valor depositado no dia zero submetido à taxa de juros durante todo o horizonte de tempo."
                  : "Models the standalone exponential growth of the day-zero principal subject to compound rates across the investment duration."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. Valor Futuro de uma Anuidade Ordinária" : "2. Future Value of an Ordinary Annuity"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Modela o efeito acumulado de cada aporte recorrente, calculando a rentabilidade individual de cada depósito feito mês a mês."
                  : "Models the compounding effect of monthly deposits, calculating individual returns for every installment added month over month."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "A equação matemática consolidada para o cálculo do Montante (A) é dada por:"
              : "The consolidated mathematical formula for Total Accumulated Wealth (A) is defined as:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            A = P × (1 + r/n)^(n×t) + PMT × [ ((1 + r/n)^(n×t) - 1) / (r/n) ]
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
          {isPt ? "Taxa Nominal vs. Taxa Real (Efeito Inflacionário)" : "Nominal Yield vs. Real Yield (Inflation Effect)"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Lembre-se que simulações de longo prazo devem levar em consideração o impacto da inflação (IPCA). Para obter o ganho real de poder de compra, desconte a taxa de inflação estimada da taxa de juros anual bruta informada nos campos da calculadora."
            : "Long-term projections must consider inflation rates. To calculate real purchasing power gain, subtract expected inflation from the gross annual return rate inputted into the calculator limits."}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <CompoundInterestClient contentSection={contentSection} />
    </>
  );
}
