"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export default function Footer() {
  const t = useTranslations();

  return (
    <>
      <footer className="border-t-[6px] border-black bg-black text-white pt-14 pb-28 md:pb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Coluna 1 */}
            <div className="space-y-4">
              <div className="inline-block border-[5px] border-white bg-yellow-300 px-4 py-1.5 text-black font-black uppercase text-2xl shadow-[5px_5px_0_#fff]">
                FinanceCalc
              </div>
              <p className="font-extrabold text-sm text-neutral-300 leading-snug">
                Fast, accurate, and privacy-focused financial tools.
              </p>
            </div>

            {/* Coluna 2 */}
            <div>
              <h3 className="font-black uppercase text-yellow-300 text-base tracking-wider mb-4 border-b-[3px] border-yellow-300/40 pb-1">
                Loans & Debt
              </h3>
              <ul className="space-y-2.5 font-bold text-sm">
                <li>
                  <Link href="/tools/mortgage-calculator" className="hover:text-yellow-300 hover:underline">
                    Mortgage Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/personal-loan-calculator" className="hover:text-yellow-300 hover:underline">
                    Personal Loan
                  </Link>
                </li>
                <li>
                  <Link href="/tools/credit-card-payoff" className="hover:text-yellow-300 hover:underline">
                    Credit Card Payoff
                  </Link>
                </li>
                <li>
                  <Link href="/tools/debt-payoff" className="hover:text-yellow-300 hover:underline">
                    Debt Payoff
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3 */}
            <div>
              <h3 className="font-black uppercase text-yellow-300 text-base tracking-wider mb-4 border-b-[3px] border-yellow-300/40 pb-1">
                Investments & Savings
              </h3>
              <ul className="space-y-2.5 font-bold text-sm">
                <li>
                  <Link href="/tools/compound-interest" className="hover:text-yellow-300 hover:underline">
                    Compound Interest
                  </Link>
                </li>
                <li>
                  <Link href="/tools/savings-goal" className="hover:text-yellow-300 hover:underline">
                    Savings Goal
                  </Link>
                </li>
                <li>
                  <Link href="/tools/investment-return" className="hover:text-yellow-300 hover:underline">
                    Investment Return
                  </Link>
                </li>
                <li>
                  <Link href="/tools/affordability" className="hover:text-yellow-300 hover:underline">
                    Home Affordability
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 4 */}
            <div>
              <h3 className="font-black uppercase text-yellow-300 text-base tracking-wider mb-4 border-b-[3px] border-yellow-300/40 pb-1">
                Legal
              </h3>
              <ul className="space-y-2.5 font-bold text-sm">
                <li>
                  <Link href="/about" className="hover:text-yellow-300 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-yellow-300 hover:underline">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-yellow-300 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-yellow-300 hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-[3px] border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-black text-neutral-400">
            <p>© {new Date().getFullYear()} FinanceCalc Hub. All rights reserved.</p>
            <p className="uppercase tracking-widest text-yellow-300 bg-neutral-900 border-[2px] border-yellow-300 px-3 py-1">
              No signup required • 100% Free
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE ANCHOR AD SLOT */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t-[5px] border-black bg-neutral-900 p-2 text-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-yellow-300 block mb-0.5">
          Advertisement
        </span>
        <div className="min-h-[50px] flex items-center justify-center text-[11px] font-black text-white uppercase border-[2px] border-neutral-700 bg-black">
          [ Mobile Anchor Ad Slot ]
        </div>
      </div>
    </>
  );
}
