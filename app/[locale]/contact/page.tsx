"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "zanvexistech@gmail.com";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
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
              className="inline-flex items-center gap-2 border-[4px] border-black bg-black text-white px-6 py-3 text-sm font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
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
