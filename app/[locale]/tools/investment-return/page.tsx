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
    <div className="space-y-10 text-black">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-black pb-2">
          {isPt ? "Métricas de Retorno de Investimento e CAGR" : "Investment Performance & CAGR Methodology"}
        </h2>

        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Para comparar a eficiência real entre diferentes opções de investimento, calcular apenas o lucro bruto simples é insuficiente. O mercado financeiro profissional utiliza o CAGR (Taxa de Crescimento Anual Composta), uma média geométrica que determina a taxa de crescimento anual constante necessária para que um capital inicial atinja o valor final no horizonte de tempo considerado."
              : "Evaluating portfolio performance accurately requires moving beyond total percentage gain. Financial analysts rely on CAGR (Compound Annual Growth Rate) — a geometric mean return rate that calculates the smoothed annual growth required for an investment to grow from starting balance to ending balance."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. Retorno Absoluto Cumulativo" : "1. Total Cumulative Return"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Mede a variação percentual total da carteira sem levar em consideração o tempo necessário para obter esse resultado."
                  : "Measures total percentage expansion from initial capital to ending valuation without adjusting for duration elapsed."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. Média Geométrica (CAGR)" : "2. Annualized Geometric Return (CAGR)"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Neutraliza a volatilidade e variações anuais intermediárias, oferecendo uma taxa anualizada comparável diretamente a benchmarks."
                  : "Eliminates annual fluctuation noise, providing a standardized rate that can be benchmarked directly against market indices."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "A fórmula matemática clássica para a determinação do CAGR é dada por:"
              : "The mathematical expression used to solve for CAGR is defined as:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            CAGR = ( ValorFinal / ValorInicial )^( 1 / Anos ) - 1
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
          {isPt ? "Limitações da Métrica CAGR" : "CAGR Analytical Limitations"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "O CAGR assume um crescimento linear constante e não reflete a volatilidade sofrida pelo ativo ao longo do período. Além disso, para cenários com múltiplos aportes e retiradas em datas distintas, recomenda-se utilizar a Taxa Interna de Retorno Ponderada pelo Tempo (XIRR/TIR)."
            : "CAGR assumes smooth, constant annualized growth and ignores underlying volatility spikes. For portfolios with frequent cash inflows or outflows, Time-Weighted or Dollar-Weighted Internal Rate of Return (IRR / XIRR) should be utilized."}
        </p>
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
