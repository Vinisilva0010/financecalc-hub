"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import PercentInput from "@/components/PercentInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import Disclaimer from "@/components/Disclaimer";
import RelatedTools from "@/components/RelatedTools";
import { calculateCreditCardPayoff, CreditCardDebt } from "@/lib/calculators/credit-card";
import { DollarSign, Clock, TrendingUp, Trash2, Plus } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
  { key: "debtPayoff", href: "/tools/debt-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
];

export default function CreditCardPayoffPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const [debts, setDebts] = useState<CreditCardDebt[]>([
    { name: "Credit Card 1", balance: 5000, interestRate: 18.99, minimumPayment: 150 },
    { name: "Credit Card 2", balance: 3000, interestRate: 15.99, minimumPayment: 100 },
  ]);

  const [activeStrategy, setActiveStrategy] = useState<"avalanche" | "snowball">("avalanche");

  const result = useMemo(() => {
    try {
      return calculateCreditCardPayoff(debts);
    } catch {
      return null;
    }
  }, [debts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const strategy = result ? result[activeStrategy] : null;

  const chartData = useMemo(() => {
    if (!strategy) return [];
    return strategy.payoffSchedule.filter((_, i) => i % 6 === 0 || i === strategy.payoffSchedule.length - 1).map((p) => ({
      month: `Month ${p.month}`,
      balance: Math.round(p.remainingBalance),
    }));
  }, [strategy]);

  const updateDebt = (index: number, field: keyof CreditCardDebt, value: string | number) => {
    const newDebts = [...debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setDebts(newDebts);
  };

  const addDebt = () => {
    setDebts([...debts, { name: `Credit Card ${debts.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 }]);
  };

  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  return (
    <CalculatorLayout
      titleKey="tools.creditCard"
      descriptionKey="tools.creditCardDesc"
      resultSection={
        strategy && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t(`creditCard.${activeStrategy}`)}
            </h2>
            <ResultCard
              label={t("creditCard.totalMonths")}
              value={`${strategy.totalMonths}`}
              highlight
              icon={<Clock className="h-5 w-5" />}
            />
            <ResultCard
              label={t("creditCard.totalInterestPaid")}
              value={`${currency}${formatCurrency(strategy.totalInterest.toNumber())}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={t("creditCard.totalAmountPaid")}
              value={`${currency}${formatCurrency(strategy.totalPaid.toNumber())}`}
              icon={<DollarSign className="h-5 w-5" />}
            />
            {result && (
              <div className="border-[4px] border-black bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wider text-black mb-2">{t("creditCard.compareMethods")}</p>
                <div className="space-y-2 text-sm font-bold">
                  <div className="flex justify-between">
                    <span>{t("creditCard.avalanche")}:</span>
                    <span>{result.avalanche.totalMonths} {t("common.months")}, {currency}{formatCurrency(result.avalanche.totalInterest.toNumber())} {t("common.interestRate")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("creditCard.snowball")}:</span>
                    <span>{result.snowball.totalMonths} {t("common.months")}, {currency}{formatCurrency(result.snowball.totalInterest.toNumber())} {t("common.interestRate")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }
      chartSection={
        strategy && (
          <ChartWrapper
            type="line"
            data={chartData}
            xKey="month"
            yKeys={[
              { key: "balance", label: t("creditCard.remainingBalance"), color: "#dc2626" },
            ]}
            title={t("creditCard.payoffProgress")}
            height={280}
          />
        )
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="creditCard" />
      }
    >
      <div className="space-y-6">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveStrategy("avalanche")}
            className={`flex-1 border-[4px] border-black py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_#000] transition-all ${activeStrategy === "avalanche" ? "bg-yellow-300" : "bg-white"}`}
          >
            {t("creditCard.avalanche")}
          </button>
          <button
            type="button"
            onClick={() => setActiveStrategy("snowball")}
            className={`flex-1 border-[4px] border-black py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_#000] transition-all ${activeStrategy === "snowball" ? "bg-yellow-300" : "bg-white"}`}
          >
            {t("creditCard.snowball")}
          </button>
        </div>

        {debts.map((debt, index) => (
          <div key={index} className="border-[4px] border-black bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(index, "name", e.target.value)}
                className="text-sm font-black uppercase tracking-tight border-[2px] border-black px-2 py-1"
              />
              <button
                onClick={() => removeDebt(index)}
                className="border-[2px] border-black bg-red-100 p-1.5 transition-colors hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
            <CurrencyInput
              label={t("creditCard.balance")}
              name={`balance-${index}`}
              value={debt.balance}
              onChange={(e) => updateDebt(index, "balance", Number(e.target.value))}
              min={0}
            />
            <PercentInput
              label={t("common.interestRate")}
              name={`rate-${index}`}
              value={debt.interestRate}
              onChange={(e) => updateDebt(index, "interestRate", Number(e.target.value))}
              min={0}
              max={100}
            />
            <CurrencyInput
              label={t("creditCard.minimumPayment")}
              name={`min-${index}`}
              value={debt.minimumPayment}
              onChange={(e) => updateDebt(index, "minimumPayment", Number(e.target.value))}
              min={0}
            />
          </div>
        ))}

        <button
          onClick={addDebt}
          className="flex w-full items-center justify-center gap-2 border-[4px] border-black bg-yellow-300 py-3 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000]"
        >
          <Plus className="h-4 w-4" /> {t("creditCard.addDebt")}
        </button>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}
