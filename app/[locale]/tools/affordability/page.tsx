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
          question: "O que é o índice DTI (Debt-to-Income) e como ele é calculated?",
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
    <div className="space-y-10 text-black">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-black pb-2">
          {isPt ? "Metodologia da Capacidade de Compra (DTI)" : "Affordability & DTI Methodology"}
        </h2>
        
        <div className="space-y-4 text-sm sm:text-base font-medium leading-relaxed text-neutral-800">
          <p>
            {isPt
              ? "Determinar quanto você pode gastar na compra de um imóvel exige avaliar a proporção entre renda bruta e obrigações financeiras. O sistema financeiro mundial utiliza as métricas de DTI (Debt-to-Income) para estabelecer o limite máximo que um comprador pode assumir sem colocar em risco sua estabilidade econômica."
              : "Determining how much you can spend on a home requires evaluating the ratio between gross income and existing recurring debt. Banks worldwide rely on DTI (Debt-to-Income) frameworks to set maximum borrowing limits without compromising overall financial stability."}
          </p>

          <p>
            {isPt
              ? "Existem dois limites cruciais de DTI utilizados pelas instituições credoras:"
              : "There are two crucial DTI thresholds used by financial underwriters:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "1. DTI Front-End (Regra dos 28%)" : "1. Front-End DTI (28% Rule)"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Define que a parcela da habitação (principal, juros, seguros e impostos) não deve ultrapassar 28% da sua renda mensal bruta."
                  : "Mandates that total monthly housing costs (principal, interest, taxes, and insurance) should not exceed 28% of gross monthly income."}
              </p>
            </div>

            <div className="border-[2px] border-black bg-white p-4 shadow-[4px_4px_0_#000]">
              <h3 className="font-black text-base uppercase mb-2">
                {isPt ? "2. DTI Back-End (Regra dos 36%-43%)" : "2. Back-End DTI (36%-43% Limit)"}
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isPt
                  ? "Estabelece que a soma da parcela imobiliária com todas as outras dívidas recorrentes (cartões, empréstimos, financiamento de veículos) não pode ultrapassar de 36% a 43% da renda."
                  : "Stipulates that your housing payment plus all recurring debts (credit cards, auto loans, personal lines) cannot exceed 36% to 43% of total income."}
              </p>
            </div>
          </div>

          <p>
            {isPt
              ? "A fórmula para determinar a Capacidade Máxima de Parcela Mensal (PMT) considerando o DTI é:"
              : "The formula to derive the Maximum Allowable Monthly Payment (PMT) given debt constraints is:"}
          </p>

          <div className="border-[2px] border-black bg-white p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[4px_4px_0_#000]">
            PMT_Max = Min( RendaBruta × 0.28, (RendaBruta × 0.36) - DívidasOutras )
          </div>

          <p>
            {isPt
              ? "Com o valor do PMT_Max estabelecido, o cálculo reverso do saldo devedor financiável é feito utilizando a fórmula de valor presente amortizado, adicionando posteriormente o valor total disponível de Entrada (Down Payment) para determinar o Valor Máximo de Imóvel Recomendado."
              : "With PMT_Max established, the maximum loan principal is calculated using present value amortization, adding your available Down Payment to compute the total Max Home Purchase Price."}
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
          {isPt ? "Custos Ocultos e Reserva de Emergência" : "Closing Costs & Emergency Reserves"}
        </h2>
        <p className="text-sm font-medium leading-relaxed">
          {isPt
            ? "Nunca comprometa 100% da sua reserva na entrada. Custos cartorários, ITBI/Taxes e taxas administrativas consomem entre 3% e 5% do valor total da propriedade. Além disso, mantenha uma reserva operacional equivalente a pelo menos 6 meses de despesas imobiliárias para contingências."
            : "Never allocate 100% of liquid assets toward the down payment. Closing costs, title searches, and property transfer taxes eat up 3% to 5% of total home value. Always maintain at least 6 months of housing expenses in reserve."}
        </p>
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
