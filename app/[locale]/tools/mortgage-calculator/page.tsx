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
            "Pagar valores adicionais abate diretamente do saldo devedor principal. Isso reduz o cálculo da incidência de juros nos meses seguintes, permitindo quitar o contrato anos antes do previsto e economizando consideravelmente.",
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

  const contentSection = (
    <div className="space-y-10 text-black">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-black pb-2">
          {isPt ? "Metodologia e Fórmulas Matemáticas" : "Methodology & Mathematical Formulas"}
        </h2>
        
        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Para calcular o custo real de um financiamento imobiliário, nossa ferramenta utiliza o sistema de amortização tradicional de parcelas fixas (Sistema Price/Annuity). O cálculo não se resume a dividir o valor do empréstimo pelo número de meses. Instituições financeiras aplicam juros compostos mensalmente sobre o saldo devedor remanescente."
              : "To calculate the true cost of a mortgage, our tool utilizes the standard fixed-payment amortization system (Annuity). The calculation is not simply dividing the loan amount by the number of months. Financial institutions apply compound interest monthly to the remaining principal balance."}
          </p>

          <p>
            {isPt
              ? "A fórmula exata para encontrar o pagamento mensal constante (PMT) é:"
              : "The exact formula to find the constant monthly payment (PMT) is:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-sm sm:text-base my-6 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            PMT = P × [ i(1 + i)ⁿ ] / [ (1 + i)ⁿ - 1 ]
          </div>

          <ul className="list-disc pl-6 space-y-2 font-bold bg-neutral-50 p-4 border-[2px] border-black">
            <li>{isPt ? "PMT: Parcela Mensal (Payment)" : "PMT: Monthly Payment"}</li>
            <li>{isPt ? "P: Principal (Valor total financiado)" : "P: Principal (Total loan amount)"}</li>
            <li>{isPt ? "i: Taxa de Juros Mensal (Taxa Anual / 12)" : "i: Monthly Interest Rate (Annual Rate / 12)"}</li>
            <li>{isPt ? "n: Número Total de Meses (Prazo do contrato em anos × 12)" : "n: Total Number of Months (Term in years × 12)"}</li>
          </ul>

          <p className="mt-4">
            {isPt
              ? "No início do contrato, a maior parte da sua prestação é destinada ao pagamento dos juros. Conforme o saldo devedor diminui com o passar dos anos, a proporção de juros cai e a parcela de amortização real aumenta. É por isso que o custo do empréstimo dispara em contratos longos (ex: 30 anos)."
              : "At the beginning of the term, the vast majority of your payment goes toward interest. As the principal balance shrinks over the years, the interest portion drops and the actual amortization portion grows. This is why borrowing costs explode on long-term contracts (e.g., 30 years)."}
          </p>
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
          {isPt ? "Como usar a amortização a seu favor" : "Using Prepayments to Your Advantage"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Pagar além da parcela mínima obrigatória é a forma mais agressiva de quebrar o ciclo dos juros. Qualquer valor extra pago incide diretamente no Principal (P). Como o juros do mês seguinte é calculado apenas sobre o saldo restante, abater a dívida precocemente garante uma economia exponencial ao longo de décadas."
            : "Paying beyond the mandatory minimum installment is the most aggressive way to break the interest cycle. Any extra value paid applies directly to the Principal (P). Because the next month's interest is calculated solely on the remaining balance, paying down debt early guarantees exponential savings over decades."}
        </p>
      </div>
    </div>
  );

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

      {/* Repassamos contentSection como Prop para que o Client renderize dentro do layout dele */}
      <MortgageClient contentSection={contentSection} />
    </>
  );
}
