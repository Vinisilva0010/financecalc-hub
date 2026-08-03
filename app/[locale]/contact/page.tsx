import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "zanvexistech@gmail.com";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";
  const path = "/contact";

  const title = isPt ? "Contato | FinanceCalc Hub" : "Contact | FinanceCalc Hub";
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isPt = locale === "pt";
  const baseUrl = "https://financecalchub.zanvexis.com";

  const jsonLdContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": isPt ? "Contato | FinanceCalc Hub" : "Contact | FinanceCalc Hub",
    "description": t("subtitle"),
    "url": `${baseUrl}/${locale}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Zanvexis",
      "url": "https://financecalchub.zanvexis.com",
      "email": CONTACT_EMAIL,
    },
  };

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
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

        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="border-[5px] border-black bg-white p-8 shadow-[6px_6px_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-black" />
              <h2 className="text-2xl font-black uppercase text-black">
                {t("sectionTitle")}
              </h2>
            </div>
            <p className="font-bold text-sm text-black/80 leading-relaxed mb-6">
              {t("sectionDesc")}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 border-[4px] border-black bg-black text-white px-6 py-3 text-sm font-black uppercase tracking-wider hover:bg-yellow-300 hover:text-black transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{t("emailLabel")}: {CONTACT_EMAIL}</span>
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
