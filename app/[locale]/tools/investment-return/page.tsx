import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InvestmentReturnClient from "./InvestmentReturnClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/investment-return";

  return {
    title: `${t("tools.investmentReturn")} (2026) | FinanceCalc Hub`,
    description: t("tools.investmentReturnDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.investmentReturn")} (2026) | FinanceCalc Hub`,
      description: t("tools.investmentReturnDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.investmentReturn")} (2026) | FinanceCalc Hub`,
      description: t("tools.investmentReturnDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "O que é CAGR (Taxa de Crescimento Anual Composta) e por que usá-lo?",
          answer:
            "O CAGR mede a taxa média de retorno anualizada necessária para um investimento crescer do saldo inicial ao valor final. Ele suaviza as variações anuais, permitindo comparar ativos de diferentes classes de risco.",
        },
        {
          question: "Qual a diferença entre retorno simples absoluto e taxa CAGR?",
          answer:
            "O retorno simples mede a porcentagem total de ganho sem considerar o tempo decorrido. O CAGR considera o período exato em anos, ajustando o rendimento ao fator de composição anual.",
        },
        {
          question: "Como os aportes intermediários alteram o cálculo de retorno?",
          answer:
            "Aportes ou retiradas durante o período exigem o uso da Taxa Interna de Retorno (TIR / XIRR) para medir com precisão o rendimento do capital em relação às datas das movimentações.",
        },
        {
          question: "Como comparar o retorno do meu investimento com benchmarks de mercado?",
          answer:
            "Para avaliar se o rendimento foi satisfatório, compara-se o CAGR obtido com índices de referência do mercado, como o S&P 500, CDI ou Ibovespa no mesmo intervalo de tempo.",
        },
      ]
    : [
        {
          question: "What is CAGR (Compound Annual Growth Rate) and why is it used?",
          answer:
            "CAGR measures the geometric mean return rate required for an investment to grow from its starting balance to ending value, smoothing out annual market volatility for accurate performance comparisons.",
        },
        {
          question: "What is the difference between total absolute return and annualized CAGR?",
          answer:
            "Total absolute return calculates cumulative gain percentage regardless of time. CAGR normalizes growth over the exact duration in years to account for annual compounding mechanics.",
        },
        {
          question: "How do interim cash inflows or withdrawals affect return calculations?",
          answer:
            "Intermediate cash flows require internal rate of return algorithms (IRR / XIRR) to calculate dollar-weighted performance accurately based on deposit timing.",
        },
        {
          question: "How should investment CAGR be evaluated against market benchmarks?",
          answer:
            "Investment CAGR should be benchmarked against broad market indices (e.g., S&P 500 or Treasury yields) over matching time periods to measure risk-adjusted outperformance.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Retorno de Investimento / CAGR" : "Investment Return / CAGR Calculator",
    "description": isPt ? "Calcule a taxa de crescimento anual real e retorno total de investimentos." : "Calculate annual compound growth rate (CAGR) and overall investment returns.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/investment-return`,
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
          {isPt ? "Métrica de Retorno e CAGR" : "Investment Return Metrics & CAGR"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "O cálculo aplica a média geométrica de retorno composto para derivar a taxa anualizada constante sobre o capital inicial investido:"
            : "The calculation uses geometric mean compounding formulas to derive annualized yield percentages from initial and final capital values:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"CAGR = (Final Value / Initial Investment)^(1 / Years) - 1"}
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
      <InvestmentReturnClient contentSection={contentSection} />
    </>
  );
}
