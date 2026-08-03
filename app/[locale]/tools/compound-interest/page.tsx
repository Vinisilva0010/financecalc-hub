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
    <div className="space-y-8 text-black">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
          {isPt ? "Metodologia e Formulação Matemática" : "Methodology & Mathematical Formulas"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "A Calculadora de Juros Compostos do FinanceCalc Hub calcula rendimentos usando aritmética de precisão decimal para evitar inconsistências de arredondamento. A equação integra o aporte inicial acumulado com os aportes periódicos:"
            : "FinanceCalc Hub's Compound Interest Calculator uses decimal-precision floating calculations to ensure exact growth numbers without roundoff drift. The total is calculated combining initial balance with periodic investments:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]"}
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
      <CompoundInterestClient contentSection={contentSection} />
    </>
  );
}
