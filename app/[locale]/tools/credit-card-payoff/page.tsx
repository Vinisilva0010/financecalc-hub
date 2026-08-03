import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CreditCardPayoffClient from "./CreditCardPayoffClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/credit-card-payoff";

  return {
    title: `${t("tools.creditCard")} (2026) | FinanceCalc Hub`,
    description: t("tools.creditCardDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.creditCard")} (2026) | FinanceCalc Hub`,
      description: t("tools.creditCardDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.creditCard")} (2026) | FinanceCalc Hub`,
      description: t("tools.creditCardDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Qual a diferença entre os métodos Avalanche e Snowball?",
          answer:
            "O método Avalanche aloca pagamentos extras no cartão com a maior taxa de juros, economizando o máximo de dinheiro em juros totais. O método Snowball quita primeiro a conta com o menor saldo devedor, proporcionando vitórias psicológicas mais rápidas.",
        },
        {
          question: "Por que pagar apenas o valor mínimo do cartão gera superendividamento?",
          answer:
            "O pagamento mínimo costuma cobrir apenas os juros cobrados no mês e uma porcentagem mínima do saldo principal. Isso faz com que a dívida seja postergada por décadas, multiplicando o custo total pago.",
        },
        {
          question: "Como o pagamento extra mensal acelera a quitação das dívidas?",
          answer:
            "Qualquer valor pago acima do mínimo vai 100% para a redução do saldo devedor principal. Isso diminui imediatamente a base sobre a qual os juros do mês seguinte são calculados, reduzindo drasticamente o tempo total.",
        },
        {
          question: "Vale a pena consolidar dívidas de cartão em um empréstimo pessoal?",
          answer:
            "Sim, se a taxa de juros do empréstimo pessoal for significativamente menor do que as taxas do cartão de crédito (que frequentemente superam 14% ao mês). Isso reduz o juro mensal mantendo uma única parcela fixa.",
        },
      ]
    : [
        {
          question: "What is the difference between the Avalanche and Snowball debt payoff methods?",
          answer:
            "The Avalanche strategy directs extra funds toward the credit card with the highest interest rate, maximizing total mathematical savings. The Snowball strategy targets the lowest balance account first to provide rapid momentum.",
        },
        {
          question: "Why does paying only the minimum monthly amount lead to long-term debt?",
          answer:
            "Minimum payments primarily cover accrued interest charges rather than reducing loan principal. This extends payoff timelines across decades and exponentially inflates cumulative interest expenses.",
        },
        {
          question: "How do extra monthly contributions shorten debt repayment duration?",
          answer:
            "100% of additional funds paid beyond minimum requirements directly lower principal debt. This decreases the compounding balance for subsequent cycles, accelerating debt-free timelines.",
        },
        {
          question: "Is personal loan debt consolidation beneficial for credit card balances?",
          answer:
            "Yes, provided the personal loan offers a substantially lower annual interest rate than credit card APRs. Replacing high-interest revolving credit with a fixed lower rate reduces interest costs.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Quitação de Cartão de Crédito" : "Credit Card Payoff Calculator",
    "description": isPt ? "Planeje a quitação de dívidas do cartão comparando as estratégias Avalanche e Snowball." : "Plan credit card debt payoff comparing Avalanche and Snowball strategies.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/credit-card-payoff`,
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
          {isPt ? "Estratégias de Quitação de Cartão de Crédito" : "Credit Card Payoff Methodology"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "A simulação executa projeções iterativas mensais aplicando os juros do rotativo sobre o saldo devedor remanescente e reordenando a amortização pela estratégia selecionada:"
            : "The calculator models month-by-month compound amortization, computing revolving APR interest on remaining debt and prioritizing extra payments per the selected strategy:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"Monthly Interest = Remaining Balance * (Annual Rate / 12)"}
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
      <CreditCardPayoffClient contentSection={contentSection} />
    </>
  );
}
