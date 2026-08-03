import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HomeClient from "./HomeClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://financecalchub.zanvexis.com";

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: { en: `${baseUrl}/en`, pt: `${baseUrl}/pt` },
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `${baseUrl}/${locale}`,
      siteName: "FinanceCalc Hub",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
