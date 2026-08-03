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
  };
}

export default function Page() {
  return <CreditCardPayoffClient />;
}
