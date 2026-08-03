import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MortgageClient from "./MortgageClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/mortgage-calculator";

  return {
    title: `${t("tools.mortgage")} (2026) | FinanceCalc Hub`,
    description: t("tools.mortgageDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.mortgage")} (2026) | FinanceCalc Hub`,
      description: t("tools.mortgageDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.mortgage")} (2026) | FinanceCalc Hub`,
      description: t("tools.mortgageDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Como é calculada a parcela mensal do financiamento imobiliário?",
          answer:
            "A parcela é calculada utilizando a fórmula de amortização Price/Anuidade: PMT = P * [i(1+i)^n] / [(1+i)^n - 1], onde P é o saldo devedor (Preço do imóvel menos a entrada), i é a taxa de juros mensal e n é o número total de parcelas.",
        },
        {
          question: "Qual a diferença entre o valor da casa e o valor do empréstimo?",
          answer:
            "O valor do empréstimo (principal) é o preço total do imóvel subtraído do valor dado como entrada. Os juros incidentes durante o financiamento são aplicados apenas sobre o valor do empréstimo.",
        },
        {
          question: "Como a taxa de juros afeta o custo total ao longo do tempo?",
          answer:
            "Em prazos longos como 30 anos (360 meses), pequenas variações na taxa de juros causam impactos expressivos no custo total pago, podendo fazer com que o total de juros supere o próprio valor financiado.",
        },
        {
          question: "Como amortizações extraordinárias antecipadas reduzem o prazo do contrato?",
          answer:
            "Pagar valores adicionais abates diretamente do saldo devedor principal. Isso reduz o cálculo da incidência de juros nos meses seguintes, permitindo quitar o contrato anos antes do previsto.",
        },
      ]
    : [
        {
          question: "How is the monthly mortgage payment calculated?",
          answer:
            "Monthly payments use the standard annuity amortization formula: PMT = P * [i(1+i)^n] / [(1+i)^n - 1], where P is principal loan amount (Home Price minus Down Payment), i is monthly interest rate, and n is total payment count.",
        },
        {
          question: "What is the difference between home price and loan amount?",
          answer:
            "The loan amount is the remaining balance to be financed after subtracting your down payment from the total home price. Interest accrues strictly on the loan amount.",
        },
        {
          question: "How does the loan term impact total interest paid?",
          answer:
            "Longer terms reduce the monthly payment amount but significantly increase total interest charges over the life of the loan due to prolonged interest compounding.",
        },
        {
          question: "How do extra principal prepayments reduce total mortgage duration?",
          answer:
            "Directing extra cash toward loan principal reduces the remaining interest-bearing balance, automatically shortening payoff duration and reducing total lifetime interest.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Hipoteca e Financiamento" : "Mortgage Calculator",
    "description": isPt
      ? "Simule parcelas de financiamento imobiliário, amortização e total de juros."
      : "Calculate mortgage payments, amortization schedules, and total interest charges.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/mortgage-calculator`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": {
      "@type": "Person",
      "name": "Vinicius Pontual",
      "url": "https://financecalchub.zanvexis.com/en/author/vinicius-pontual",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <MortgageClient faqs={faqs} />
    </>
  );
}
