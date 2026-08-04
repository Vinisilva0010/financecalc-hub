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

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const baseUrl = "https://financecalchub.zanvexis.com";

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FinanceCalc Hub",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.ico`,
    "founder": {
      "@type": "Person",
      "name": "Vinicius Pontual",
      "url": `${baseUrl}/${locale}/author/vinicius-pontual`
    },
    "sameAs": [
      "https://github.com/vnspo",
      "https://linkedin.com/in/vinicius-pontual"
    ]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinanceCalc Hub",
    "url": baseUrl,
    "publisher": {
      "@type": "Organization",
      "name": "FinanceCalc Hub"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <HomeClient />
    </>
  );
}
