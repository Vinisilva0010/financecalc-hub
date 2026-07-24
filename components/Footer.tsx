"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t-[6px] border-black bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Topo do Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          
          {/* Coluna 1 - Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">
              FinanceCalc Hub
            </h3>
            <p className="mb-6 max-w-xs text-sm font-bold leading-relaxed text-white/70">
              Calculadoras financeiras precisas, rápidas e 100% privadas.
              Seus dados nunca saem do seu dispositivo.
            </p>
            <div className="inline-block border-[3px] border-white bg-yellow-300 px-4 py-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-black">
                100% Free
              </span>
            </div>
          </div>

          {/* Coluna 2 - Navigation */}
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[2px] text-yellow-300">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  {t("nav.tools")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Legal */}
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[2px] text-yellow-300">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-300"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="my-10 border-t-[3px] border-white/20"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs font-bold text-white/60 md:text-left">
            © {new Date().getFullYear()} FinanceCalc Hub. All rights reserved.
          </p>

          <p className="max-w-md text-center text-xs font-bold leading-relaxed text-white/50 md:text-right">
            This website provides estimates for informational purposes only.
            Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}