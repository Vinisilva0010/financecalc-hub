"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export default function Footer() {
  const t = useTranslations();

  return (
    <>
      <footer className="border-t-[6px] border-black bg-black pt-14 pb-28 text-white md:pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
            
            {/* Coluna 1 - Brand */}
            <div className="space-y-4">
              <div className="inline-block border-[5px] border-white bg-yellow-300 px-4 py-1.5 text-2xl font-black uppercase text-black shadow-[5px_5px_0_#fff]">
                FinanceCalc
              </div>
              <p className="text-sm font-extrabold leading-snug text-neutral-300">
                {t("footer.description")}
              </p>
            </div>

            {/* Coluna 2 - Loans & Debt */}
            <div>
              <h3 className="mb-4 border-b-[3px] border-yellow-300/40 pb-1 text-base font-black uppercase tracking-wider text-yellow-300">
                {t("footer.loansTitle")}
              </h3>
              <ul className="space-y-2.5 text-sm font-bold">
                <li>
                  <Link href="/tools/mortgage-calculator" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.mortgage")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/personal-loan-calculator" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.personalLoan")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/credit-card-payoff" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.creditCard")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/debt-payoff" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.debtPayoff")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Investments & Savings */}
            <div>
              <h3 className="mb-4 border-b-[3px] border-yellow-300/40 pb-1 text-base font-black uppercase tracking-wider text-yellow-300">
                {t("footer.investmentsTitle")}
              </h3>
              <ul className="space-y-2.5 text-sm font-bold">
                <li>
                  <Link href="/tools/compound-interest" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.compoundInterest")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/savings-goal" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.savingsGoal")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/investment-return" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.investmentReturn")}
                  </Link>
                </li>
                <li>
                  <Link href="/tools/affordability" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("tools.affordability")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Legal */}
            <div>
              <h3 className="mb-4 border-b-[3px] border-yellow-300/40 pb-1 text-base font-black uppercase tracking-wider text-yellow-300">
                {t("footer.legalTitle")}
              </h3>
              <ul className="space-y-2.5 text-sm font-bold">
                <li>
                  <Link href="/about" className="transition-colors hover:text-yellow-300 hover:underline">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="transition-colors hover:text-yellow-300 hover:underline">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-yellow-300 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-yellow-300 hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-4 border-t-[3px] border-neutral-800 pt-8 text-xs font-black text-neutral-400 md:flex-row">
            <p>© {new Date().getFullYear()} FinanceCalc Hub. All rights reserved.</p>
            <p className="border-[2px] border-yellow-300 bg-neutral-900 px-3 py-1 uppercase tracking-widest text-yellow-300">
              {t("footer.badge")}
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE ANCHOR AD SLOT */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-[5px] border-black bg-neutral-900 p-2 text-center md:hidden">
        <span className="mb-0.5 block text-[9px] font-black uppercase tracking-widest text-yellow-300">
          Advertisement
        </span>
        <div className="flex min-h-[50px] items-center justify-center border-[2px] border-neutral-700 bg-black text-[11px] font-black uppercase text-white">
          [ Mobile Anchor Ad Slot ]
        </div>
      </div>
    </>
  );
}