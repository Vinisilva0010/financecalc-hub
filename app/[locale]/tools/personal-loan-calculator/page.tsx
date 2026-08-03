import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PersonalLoanClient from "./PersonalLoanClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/personal-loan-calculator";

  return {
    title: `${t("tools.personalLoan")} (2026) | FinanceCalc Hub`,
    description: t("tools.personalLoanDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.personalLoan")} (2026) | FinanceCalc Hub`,
      description: t("tools.personalLoanDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.personalLoan")} (2026) | FinanceCalc Hub`,
      description: t("tools.personalLoanDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Como é calculated o valor da parcela fixa (EMI) do empréstimo?",
          answer:
            "A prestação mensal é calculada utilizando a fórmula de amortização Price, garantindo valores iguais durante todo o contrato compostos por parcelas decrescentes de juros e crescentes de amortização.",
        },
        {
          question: "Qual a diferença entre taxa de juros nominal e Custo Efetivo Total (CET)?",
          answer:
            "A taxa nominal indica apenas o juro do dinheiro emprestado. O CET engloba todos os encargos do contrato, como IOF, taxas de abertura de crédito e seguros, refletindo o custo real pago.",
        },
        {
          question: "Como a amortização antecipada reduz o custo total do empréstimo?",
          answer:
            "Ao antecipar parcelas ou pagar um valor extra direto no saldo devedor, o consumidor obtém o desconto proporcional dos juros futuros, reduzindo o prazo ou o valor da prestação.",
        },
        {
          question: "O que acontece se eu atrasar o pagamento de uma parcela do empréstimo?",
          answer:
            "Atrasos geram cobrança de multa moratória, juros de mora diários e atualização sobre o valor em aberto, além do risco de inclusão nos órgãos de proteção ao crédito.",
        },
      ]
    : [
        {
          question: "How is the fixed Equated Monthly Installment (EMI) calculated?",
          answer:
            "Fixed EMI payments use annuity amortization formulas where each fixed installment covers accrued interest charges and principal balance reduction.",
        },
        {
          question: "What is the distinction between nominal interest rates and APR?",
          answer:
            "Nominal interest reflects baseline borrowing rates, whereas APR encompasses total financing costs, including mandatory origination charges and administrative fees.",
        },
        {
          question: "How does principal prepayment lower overall personal loan expenses?",
          answer:
            "Directing extra principal payments reduces remaining loan balance, automatically waiving unearned future interest and shortening the total repayment duration.",
        },
        {
          question: "What financial penalties apply to overdue loan payments?",
          answer:
            "Late payments trigger immediate late fees, daily default interest charges, and negative credit reporting to major credit bureaus.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Empréstimo Pessoal / EMI" : "Personal Loan / EMI Calculator",
    "description": isPt ? "Simule o valor da parcela mensal e custo de juros de empréstimos pessoais." : "Calculate monthly payment amounts and total interest for personal loans.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/personal-loan-calculator`,
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
          {isPt ? "Metodologia de Amortização de Empréstimos e Tabela Price" : "Personal Loan Amortization & EMI Framework"}
        </h2>

        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "A precificação de empréstimos pessoais utiliza predominantemente o Sistema Francês de Amortização (Tabela Price), caracterizado por parcelas mensais constantes (EMI - Equated Monthly Installment). Em cada prestação, a proporção de juros e principal varia ao longo do contrato: os primeiros meses pagam uma proporção maior de juros, enquanto a amortização do saldo principal acelera próximo ao final do prazo."
              : "Personal loan structures predominantly rely on French Amortization (Price System), generating fixed monthly installments (EMI). Inside each equal installment, the breakdown between interest charges and principal reduction evolves over time: early payments consist heavily of interest, whereas later payments aggressively reduce principal balance."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. Taxa Nominal vs. CET / APR" : "1. Nominal Rate vs. APR / Total Cost"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "A taxa de juros nominal reflete apenas o custo do capital. O Custo Efetivo Total (CET / APR) engloba impostos (IOF), tarifas bancárias, abertura de crédito e seguros."
                  : "The nominal rate covers basic borrowing fees. Annual Percentage Rate (APR) or CET includes taxes (IOF), origination charges, and mandatory insurance premiums."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. Desconto por Amortização Antecipada" : "2. Prepayment Interest Deductions"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Amortizações extraordinárias aplicadas diretamente no saldo devedor cancelam a incidência de juros compostos futuros das parcelas finais do contrato."
                  : "Extra principal payments reduce remaining loan principal, eliminating future unearned interest charges on remaining installments."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "A fórmula matemática para calcular o valor exato da Parcela Mensal (EMI) é dada por:"
              : "The mathematical annuity equation used to solve for monthly EMI is formulated as:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            EMI = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
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
          {isPt ? "Avaliando Propostas de Financiamento" : "Evaluating Personal Loan Offers"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Nunca compare propostas de empréstimo considerando apenas a taxa de juros mensal anunciada. Exija a planilha com o CET anualizado completo e certifique-se de que o prazo de pagamento escolhido não comprometa mais de 15% da sua renda líquida mensal."
            : "Never evaluate personal loans based purely on advertised monthly interest rates. Review full annualized APR disclosure schedules and verify that monthly installments do not exceed 15% of net disposable income."}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <PersonalLoanClient contentSection={contentSection} />
    </>
  );
}
