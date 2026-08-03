import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclaimer" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/disclaimer";

  const title = isPt ? "Isenção de Responsabilidade | FinanceCalc Hub" : "Disclaimer | FinanceCalc Hub";
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { en: `${baseUrl}/en${path}`, pt: `${baseUrl}/pt${path}` },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}${path}`,
      siteName: "FinanceCalc Hub",
      locale: isPt ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DisclaimerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclaimer" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";

  const jsonLdDisclaimer = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isPt ? "Isenção de Responsabilidade | FinanceCalc Hub" : "Disclaimer | FinanceCalc Hub",
    "description": t("subtitle"),
    "url": `${baseUrl}/${locale}/disclaimer`,
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDisclaimer) }}
      />
      <div className="flex-1">
        {/* Header */}
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-4 inline-flex items-center gap-2 border-[4px] border-black bg-white px-3 py-1 text-xs font-black uppercase">
              <AlertTriangle className="h-4 w-4 text-black" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
              {t("title")}
            </h1>

            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="space-y-6 border-[5px] border-black bg-white p-6 shadow-[6px_6px_0_#000] md:p-8">
            <p className="text-base font-bold leading-relaxed text-black/80">
              {t("content1")}
            </p>

            <p className="text-base font-bold leading-relaxed text-black/80">
              {t("content2")}
            </p>

            <div className="border-[4px] border-black bg-yellow-300 p-5">
              <p className="text-base font-black leading-relaxed text-black">
                {t("content3")}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
