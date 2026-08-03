import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/terms";

  const title = isPt ? "Termos de Uso | FinanceCalc Hub" : "Terms of Service | FinanceCalc Hub";
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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";

  const jsonLdTerms = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isPt ? "Termos de Uso | FinanceCalc Hub" : "Terms of Service | FinanceCalc Hub",
    "description": t("subtitle"),
    "url": `${baseUrl}/${locale}/terms`,
  };

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTerms) }}
      />
      <div>
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 border-[4px] border-black bg-white px-3 py-1 text-xs font-black uppercase mb-4">
              <FileText className="w-4 h-4 text-black" />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-4">
              {t("title")}
            </h1>
            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 space-y-8">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section1Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section1Desc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section2Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section2Desc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <h2 className="text-xl font-black uppercase text-black mb-3 border-b-[3px] border-black pb-2">
              {t("section3Title")}
            </h2>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("section3Desc")}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
