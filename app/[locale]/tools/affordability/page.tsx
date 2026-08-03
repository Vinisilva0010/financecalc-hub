import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AffordabilityClient from "./AffordabilityClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/affordability";

  return {
    title: `${t("tools.affordability")} (2026) | FinanceCalc Hub`,
    description: t("tools.affordabilityDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title: `${t("tools.affordability")} (2026) | FinanceCalc Hub`,
      description: t("tools.affordabilityDesc"),
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("tools.affordability")} (2026) | FinanceCalc Hub`,
      description: t("tools.affordabilityDesc"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const faqs = isPt
    ? [
        {
          question: "Qual a porcentagem da renda que deve ir para a parcela do imóvel?",
          answer:
            "A regra bancária padrão estabelece que o valor da parcela mensal da habitação não deve ultrapassar 28% a 30% da sua renda bruta mensal. Esse limite evita o superendividamento.",
        },
        {
          question: "O que é o índice DTI (Debt-to-Income) e como ele é calculado?",
          answer:
            "O DTI representa a proporção da sua renda comprometida com dívidas. O DTI Front-End mede o limite da parcela da casa (28%), enquanto o DTI Back-End inclui todas as dívidas somadas (cartões, empréstimos), que não devem exceder 36% a 43%.",
        },
        {
          question: "Como o valor de entrada impacta o valor máximo do imóvel?",
          answer:
            "Quanto maior for o valor dado como entrada, menor será o valor necessário de empréstimo. Isso reduz os juros totais acumulados e permite comprar um imóvel de valor total mais elevado mantendo a parcela no seu limite de renda.",
        },
        {
          question: "Quais custos adicionais além da parcela devem ser considerados?",
          answer:
            "É fundamental incluir impostos imobiliários (como ITBI), custos de cartório, taxa de avaliação de crédito e seguros obrigatórios (MIP e DFI), que podem somar de 3% a 5% do valor total do imóvel no ato da compra.",
        },
      ]
    : [
        {
          question: "What percentage of gross income should go toward a mortgage payment?",
          answer:
            "Financial institutions adhere to the 28% rule, stating that your monthly mortgage principal, interest, taxes, and insurance (PITI) should not exceed 28% of gross monthly income.",
        },
        {
          question: "What is the Debt-to-Income (DTI) ratio and how is it calculated?",
          answer:
            "DTI measures total debt obligations against income. Front-end DTI limits housing costs to 28%, while back-end DTI incorporates all recurring debt payments (credit cards, loans), capping maximum total debt at 36% to 43%.",
        },
        {
          question: "How does my down payment amount impact total home affordability?",
          answer:
            "A larger down payment reduces the required principal loan amount. This lowers interest charges over time and allows you to target higher purchase prices while staying within approved monthly limits.",
        },
        {
          question: "What hidden or closing costs should be budgeted alongside down payment?",
          answer:
            "Buyers should budget an additional 2% to 5% of purchase price for closing costs, including title search fees, origination charges, property taxes, and mandatory insurance premiums.",
        },
      ];

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isPt ? "Calculadora de Capacidade de Compra" : "Home Affordability Calculator",
    "description": isPt ? "Descubra quanto você pode gastar em um imóvel com base na sua renda e dívidas." : "Determine how much house you can afford based on income and debts.",
    "url": `https://financecalchub.zanvexis.com/${locale}/tools/affordability`,
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
          {isPt ? "Metodologia de Capacidade de Compra Imobiliária" : "Home Affordability Methodology"}
        </h2>
        <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
          {isPt
            ? "A avaliação de poder de compra utiliza as diretrizes prudenciais bancárias DTI (Debt-to-Income), determinando a capacidade máxima de financiamento a partir do limite de renda e passivos mensais existentes:"
            : "Affordability modeling calculates maximum loan capacity based on strict DTI parameters, evaluating gross income against existing recurring liabilities:"}
        </p>

        <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
          {"Max Monthly Payment = (Gross Monthly Income * 0.28) - Existing Monthly Debts"}
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
      <AffordabilityClient contentSection={contentSection} />
    </>
  );
}
