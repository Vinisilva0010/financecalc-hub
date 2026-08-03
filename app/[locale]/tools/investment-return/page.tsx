import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InvestmentReturnClient from "./InvestmentReturnClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/investment-return";

  return {
    title: `${t("tools.investmentReturn")} (2026) | FinanceCalc Hub`,
    description: t("tools.investmentReturnDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
  };
}

export default function Page() {
  return <InvestmentReturnClient />;
}
