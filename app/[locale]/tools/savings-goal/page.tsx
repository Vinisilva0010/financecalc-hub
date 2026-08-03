import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SavingsGoalClient from "./SavingsGoalClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/tools/savings-goal";

  return {
    title: `${t("tools.savingsGoal")} (2026) | FinanceCalc Hub`,
    description: t("tools.savingsGoalDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
  };
}

export default function Page() {
  return <SavingsGoalClient />;
}
