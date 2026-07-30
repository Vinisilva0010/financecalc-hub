"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

interface ToolItem {
  key: string;
  href: string;
}

interface RelatedToolsProps {
  currentToolKey?: string;
  tools?: ToolItem[];
}

export default function RelatedTools({ currentToolKey, tools }: RelatedToolsProps) {
  const t = useTranslations();

  const defaultTools: ToolItem[] = [
    { key: "mortgage", href: "/tools/mortgage-calculator" },
    { key: "personalLoan", href: "/tools/personal-loan-calculator" },
    { key: "creditCard", href: "/tools/credit-card-payoff" },
    { key: "compoundInterest", href: "/tools/compound-interest" },
    { key: "savingsGoal", href: "/tools/savings-goal" },
    { key: "debtPayoff", href: "/tools/debt-payoff" },
    { key: "investmentReturn", href: "/tools/investment-return" },
    { key: "affordability", href: "/tools/affordability" },
  ];

  const toolsList = tools ?? defaultTools;
  const filteredTools = currentToolKey
    ? toolsList.filter((tool) => tool.key !== currentToolKey).slice(0, 4)
    : toolsList.slice(0, 4);

  return (
    <div className="border-[5px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
      <h3 className="text-xl font-black uppercase text-black mb-4 border-b-[3px] border-black pb-2">
        {t("common.relatedTools")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.key}
            href={tool.href}
            className="border-[4px] border-black bg-yellow-300 p-4 font-black uppercase text-xs text-black shadow-[4px_4px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0_#000] transition-all block text-center"
          >
            {t(`tools.${tool.key}`, { defaultValue: tool.key })}
          </Link>
        ))}
      </div>
    </div>
  );
}
