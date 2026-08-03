import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ShieldCheck, Code, DollarSign, Award, UserCheck } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/about";

  const title = isPt ? "Sobre | FinanceCalc Hub" : "About | FinanceCalc Hub";
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";

  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": isPt ? "Sobre | FinanceCalc Hub" : "About | FinanceCalc Hub",
    "description": t("subtitle"),
    "url": `${baseUrl}/${locale}/about`,
    "mainEntity": {
      "@type": "Person",
      "name": "Vinicius Pontual",
      "jobTitle": "Software Engineer & Founder",
      "url": `${baseUrl}/${locale}/author/vinicius-pontual`,
      "sameAs": [
        "https://github.com/vnspo",
        "https://linkedin.com/in/vinicius-pontual"
      ]
    }
  };

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <div>
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-4">
              {t("title")}
            </h1>
            <p className="text-lg font-bold text-black/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 space-y-10">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("missionTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("missionDesc")}
            </p>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("authorTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed mb-6">
              {t("authorDesc")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/author/vinicius-pontual`}
                className="inline-flex items-center gap-2 border-[3px] border-black bg-black text-white px-4 py-2 font-mono text-xs font-black uppercase hover:bg-yellow-300 hover:text-black transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isPt ? "Ver Perfil do Autor" : "View Author Profile"}</span>
              </Link>
              <div className="inline-flex items-center gap-2 border-[3px] border-black bg-yellow-300 px-3 py-2 font-mono text-xs font-black uppercase">
                <Award className="w-4 h-4" />
                <span>{t("tddBadge")}</span>
              </div>
            </div>
          </div>

          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("transparencyTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed">
              {t("transparencyDesc")}
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
