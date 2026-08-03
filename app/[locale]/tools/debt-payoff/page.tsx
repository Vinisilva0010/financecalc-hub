import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DebtPayoffClient from "./DebtPayoffClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/debt-payoff";

  return {
    title: `${t("tools.debtPayoff")} (2026) | FinanceCalc Hub`,
    description: t("tools.debtPayoffDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.debtPayoff")} (2026) | FinanceCalc Hub`,
      description: t("tools.debtPayoffDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.debtPayoff")} (2026) | FinanceCalc Hub`,
      description: t("tools.debtPayoffDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Como funciona a aceleração de quitação de múltiplas dívidas?",
          answer:
            "A ferramenta organiza todos os passivos em ordem de prioridade. Ao quitar a primeira dívida, o valor que era usado para pagar a parcela dessa dívida é somado ao pagamento da próxima conta, gerando um efeito bola de neve financeiro.",
        },
        {
          question: "Devo investir ou quitar minhas dívidas com juros altos primeiro?",
          answer:
            "Via de regra, dívidas com taxas de juros superiores ao retorno esperado de investimentos seguros devem ser liquidadas primeiro. Quitar uma dívida de 15% ao ano equivale a um investimento com retorno garantido de 15%.",
        },
        {
          question: "Qual o impacto da renegociação de taxa antes de iniciar o plano?",
          answer:
            "Reduzir a taxa de juros junto aos credores antes de aplicar os aportes extras reduz o juro acumulado mensal e encurta substancialmente o prazo necessário para liquidação completa.",
        },
        {
          question: "Como manter uma reserva de emergência durante a quitação de dívidas?",
          answer:
            "É recomendável manter uma reserva mínima de segurança antes de destinar 100% da renda excedente para o abatimento acelerado das dívidas, evitando novos endividamentos diante de imprevistos.",
        },
      ]
    : [
        {
          question: "How does multi-debt accelerated payoff planning work?",
          answer:
            "The model structures all liabilities into a prioritization order. Once an account is fully paid, its former payment allocation is rolled over to increase the next debt's payment, snowballing progress.",
        },
        {
          question: "Should I invest extra funds or pay off high-interest debt first?",
          answer:
            "Paying off debts with interest rates higher than risk-free investment returns is mathematically superior. Eliminating a 15% APR loan provides an effective 15% guaranteed return on investment.",
        },
        {
          question: "What is the benefit of rate renegotiation before executing the payoff plan?",
          answer:
            "Lowering nominal APRs with creditors prior to initiating extra monthly payments reduces interest compounding speed and cuts overall duration until full debt elimination.",
        },
        {
          question: "Should I maintain an emergency fund while aggressively paying debt?",
          answer:
            "Maintaining a basic starter emergency cushion is advisable before directing all discretionary cash toward debt reduction to prevent reliance on new debt during unplanned expenses.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Quitação de Dívidas" : "Debt Payoff Calculator",
    "description": isPt ? "Monte um plano estratégico para zerar empréstimos e pendências financeiras." : "Build a strategic schedule to eliminate loan balances and financial liabilities.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/debt-payoff`,
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
          {isPt ? "Estratégias de Eliminação de Dívidas" : "Debt Payoff Strategies & Frameworks"}
        </h2>

        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Para eliminar passivos e empréstimos sem comprometer a saúde orçamentária, a engenharia financeira oferece duas metodologias principais de aceleração. Ambas utilizam o conceito de rollover de fluxo de caixa, em que o valor da parcela liberada de uma dívida quitada é incorporado diretamente ao pagamento da dívida seguinte."
              : "Eliminating debts efficiently requires a systematic cash flow rollover mechanism. Once a liability is fully extinguished, its former monthly payment is automatically added to the repayment budget of the next target debt."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. Método Avalanches (Juros Mais Altos Primeiro)" : "1. Debt Avalanche (Highest Interest First)"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Ataca prioritariamente as dívidas com as maiores taxas de juros nominais (APR). Matematicamente, é a estratégia mais eficiente, reduzindo o total pago em juros ao longo do tempo."
                  : "Mathematically optimal approach focusing extra cash on debts with the highest Annual Percentage Rates (APR). Minimizes total interest expenses over the debt lifecycle."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. Método Bola de Neve (Menor Saldo Primeiro)" : "2. Debt Snowball (Lowest Balance First)"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Foca na eliminação rápida dos menores saldos devedores para gerar vitórias comportamentais e liberar fluxo de caixa mensal no menor tempo possível."
                  : "Behavioral-driven approach prioritizing the smallest outstanding balances first to produce fast psychological wins and free up cash flow rapidly."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "O tempo de amortização mensal (n) de cada dívida sob taxa de juros composta é determinado por:"
              : "The required payoff duration in months (n) for an individual debt subject to compound interest is calculated as:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            n = -ln(1 - (r × PV) / PMT) / ln(1 + r)
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
          {isPt ? "Custo de Oportunidade e Portabilidade de Crédito" : "Opportunity Cost & Credit Portability"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Antes de destinar todos os recursos extras para a quitação, verifique a possibilidade de portabilidade de crédito para instituições financeiras que ofereçam taxas nominais menores. Reduzir a taxa de juros bruta reduz a velocidade de capitalização do saldo devedor imediatamente."
            : "Before locking all available cash into debt reduction, explore debt consolidation or refinancing opportunities. Lowering your contract nominal interest rates reduces interest accrual speed immediately."}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <DebtPayoffClient contentSection={contentSection} />
    </>
  );
}
