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
          question: "Como é calculado o valor da parcela fixa (EMI) do empréstimo?",
          answer:
            "A prestação mensal é calculada utilizando a fórmula de amortização Price, garantindo valores iguais durante todo o contrato compostos por parcelas decrescentes de juros e crescentes de amortização.",
        },
        {
          question: "Qual a diferença entre taxa de juros nominal e Custo Efetivo Total (CET)?",
          answer:
            "A taxa nominal indica apenas o juro do dinheiro empréstimo. O CET encampa todos os encargos do contrato, como IOF, taxas de abertura de crédito e seguros, refletindo o custo real pago.",
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
    <div className="space-y-8 text-black">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
          {isPt ? "Metodologia de Empréstimo Pessoal e Tabela Price" : "Personal Loan EMI Methodology"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "A simulação determina as prestações mensais fixas e o cronograma de juros aplicando a equação clássica de anuidade de amortização francesa:"
            : "Monthly installments and payment breakdown calculations use standard French amortization annuity pricing formulas:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"EMI = P * [r(1+r)^n] / [(1+r)^n - 1]"}
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
      <PersonalLoanClient contentSection={contentSection} />
    </>
  );
}
