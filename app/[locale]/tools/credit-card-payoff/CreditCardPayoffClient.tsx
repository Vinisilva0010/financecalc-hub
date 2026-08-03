"use client";

import { useState, useMemo, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
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

interface Props {
  contentSection?: ReactNode;
}

export default function CreditCardPayoffClient({ contentSection }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";

  const [debts, setDebts] = useState<CreditCardDebt[]>([
    { name: isPt ? "Cartão de Crédito 1" : "Credit Card 1", balance: 5000, interestRate: 18.99, minimumPayment: 150 },
    { name: isPt ? "Cartão de Crédito 2" : "Credit Card 2", balance: 3000, interestRate: 15.99, minimumPayment: 100 },
  ]);

  const [activeStrategy, setActiveStrategy] = useState<"avalanche" | "snowball">("avalanche");

  const result = useMemo(() => {
    try {
      return calculateCreditCardPayoff(debts);
    } catch {
      return null;
    }
  }, [debts]);

  const currentStrategyData = useMemo(() => {
    if (!result) return null;
    return activeStrategy === "avalanche" ? result.avalanche : result.snowball;
  }, [result, activeStrategy]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleDebtChange = (index: number, field: keyof CreditCardDebt, value: string | number) => {
    const updated = [...debts];
    updated[index] = { ...updated[index], [field]: value };
    setDebts(updated);
  };

  const addDebt = () => {
    setDebts([
      ...debts,
      {
        name: isPt ? `Cartão de Crédito ${debts.length + 1}` : `Credit Card ${debts.length + 1}`,
        balance: 1000,
        interestRate: 19.99,
        minimumPayment: 50,
      },
    ]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter((_, i) => i !== index));
    }
  };

  return (
    <CalculatorLayout
      titleKey="tools.creditCard"
      descriptionKey="tools.creditCardDesc"
      resultSection={
        currentStrategyData && (
          <div className="space-y-4">
            <ResultCard
              label={isPt ? "Meses até a Quitação" : "Months to Pay Off"}
              value={`${currentStrategyData.totalMonths}`}
              highlight
              icon={<Clock className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Total de Juros Pagos" : "Total Interest Paid"}
              value={`${currency}${formatCurrency(currentStrategyData.totalInterest.toNumber())}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Total Desembolsado" : "Total Amount Paid"}
              value={`${currency}${formatCurrency(currentStrategyData.totalPaid.toNumber())}`}
              icon={<DollarSign className="h-5 w-5" />}
            />
          </div>
        )
      }
      chartSection={
        currentStrategyData && (
          <ChartWrapper
            type="bar"
            data={currentStrategyData.payoffSchedule
              .filter((_, i) => i % 3 === 0)
              .map((d) => ({
                month: isPt ? `Mês ${d.month}` : `M${d.month}`,
                balance: Math.round(d.remainingBalance),
              }))}
            xKey="month"
            yKeys={[{ key: "balance", label: isPt ? "Saldo Devedor" : "Balance", color: "#facc15" }]}
            title={isPt ? "Redução Gradual do Saldo Devedor" : "Debt Balance Reduction"}
            height={250}
          />
        )
      }
      contentSection={contentSection}
      relatedTools={<RelatedTools tools={relatedToolsList} currentToolKey="creditCard" />}
    >
      <div className="space-y-6">
        <div className="flex gap-2 p-1 border-[3px] border-black bg-neutral-100">
          <button
            onClick={() => setActiveStrategy("avalanche")}
            className={`flex-1 py-2 text-xs font-black uppercase ${
              activeStrategy === "avalanche" ? "bg-black text-yellow-300" : "bg-transparent text-black"
            }`}
          >
            {isPt ? "Método Avalanche" : "Avalanche"}
          </button>
          <button
            onClick={() => setActiveStrategy("snowball")}
            className={`flex-1 py-2 text-xs font-black uppercase ${
              activeStrategy === "snowball" ? "bg-black text-yellow-300" : "bg-transparent text-black"
            }`}
          >
            {isPt ? "Método Bola de Neve" : "Snowball"}
          </button>
        </div>

        <div className="space-y-4 pt-4 border-t-[3px] border-black">
          {debts.map((debt, index) => (
            <div key={index} className="p-4 border-[3px] border-black bg-neutral-50 space-y-4 relative">
              <div className="flex justify-between items-center pb-2 border-b-[2px] border-black">
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => handleDebtChange(index, "name", e.target.value)}
                  className="font-black text-sm uppercase bg-transparent border-none focus:outline-none w-full"
                />
                {debts.length > 1 && (
                  <button onClick={() => removeDebt(index)} className="text-red-600 hover:text-black ml-2">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <CurrencyInput
                  name={`balance-${index}`}
                  label={isPt ? "Saldo Devedor" : "Balance"}
                  value={debt.balance}
                  onChange={(e) => handleDebtChange(index, "balance", Number(e.target.value) || 0)}
                />
                <PercentInput
                  name={`interestRate-${index}`}
                  label={isPt ? "Taxa de Juros Anual (%)" : "Rate (%)"}
                  value={debt.interestRate}
                  onChange={(e) => handleDebtChange(index, "interestRate", Number(e.target.value) || 0)}
                />
                <CurrencyInput
                  name={`minimumPayment-${index}`}
                  label={isPt ? "Pagamento Mínimo Mensal" : "Min Pay"}
                  value={debt.minimumPayment}
                  onChange={(e) => handleDebtChange(index, "minimumPayment", Number(e.target.value) || 0)}
                />
              </div>
            </div>
          ))}
          <button
            onClick={addDebt}
            className="w-full py-3 border-[3px] border-black bg-yellow-300 text-black font-black uppercase text-xs flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> {isPt ? "Adicionar Cartão" : "Add Card"}
          </button>
        </div>
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}
