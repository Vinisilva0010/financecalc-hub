"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import PercentInput from "@/components/PercentInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import { Home, DollarSign, ShieldCheck, CreditCard } from "lucide-react";
import { calculateAffordability, AffordabilityInput } from "@/lib/calculators/affordability";

function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(val);
}

export default function AffordabilityPage() {
  const t = useTranslations("affordability");

  const { register, watch } = useForm<AffordabilityInput>({
    defaultValues: {
      annualIncome: 120000,
      monthlyDebts: 500,
      downPayment: 50000,
      interestRate: 6.5,
      loanTermYears: 30,
    },
  });

  const formValues = watch();
  const results = calculateAffordability({
    annualIncome: Number(formValues.annualIncome) || 0,
    monthlyDebts: Number(formValues.monthlyDebts) || 0,
    downPayment: Number(formValues.downPayment) || 0,
    interestRate: Number(formValues.interestRate) || 0,
    loanTermYears: Number(formValues.loanTermYears) || 1,
  });

  const chartData = [
    {
      category: t("maxHomePrice"),
      amount: results.maxHomePrice,
    },
    {
      category: t("recommendedBudget"),
      amount: results.recommendedBudget,
    },
  ];

  return (
    <CalculatorLayout
      titleKey="affordability.title"
      descriptionKey="affordability.description"
      resultSection={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <ResultCard
            label={t("maxHomePrice")}
            value={formatCurrency(results.maxHomePrice)}
            icon={<Home className="w-6 h-6 text-black shrink-0" />}
            highlight={true}
          />
          <ResultCard
            label={t("recommendedBudget")}
            value={formatCurrency(results.recommendedBudget)}
            icon={<ShieldCheck className="w-6 h-6 text-black shrink-0" />}
          />
          <ResultCard
            label={t("maxLoanAmount")}
            value={formatCurrency(results.maxLoanAmount)}
            icon={<DollarSign className="w-6 h-6 text-black shrink-0" />}
          />
          <ResultCard
            label={t("maxMonthlyPayment")}
            value={formatCurrency(results.maxMonthlyPayment)}
            icon={<CreditCard className="w-6 h-6 text-black shrink-0" />}
          />
        </div>
      }
      chartSection={
        <ChartWrapper
          type="bar"
          data={chartData}
          xKey="category"
          yKeys={[{ key: "amount", label: "Value", color: "#facc15" }]}
          title={t("maxHomePrice")}
        />
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <CurrencyInput
          label={t("annualIncome")}
          {...register("annualIncome", { valueAsNumber: true })}
          min={0}
        />

        <CurrencyInput
          label={t("monthlyDebts")}
          {...register("monthlyDebts", { valueAsNumber: true })}
          min={0}
        />

        <CurrencyInput
          label={t("downPayment")}
          {...register("downPayment", { valueAsNumber: true })}
          min={0}
        />

        <PercentInput
          label={t("interestRate")}
          {...register("interestRate", { valueAsNumber: true })}
          min={0}
        />

        <NumberInput
          label={t("loanTermYears")}
          {...register("loanTermYears", { valueAsNumber: true })}
          min={1}
          max={50}
        />
      </form>
    </CalculatorLayout>
  );
}
