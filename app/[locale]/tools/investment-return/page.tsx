"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import { TrendingUp, Percent, DollarSign, Calendar } from "lucide-react";
import { calculateInvestmentReturn, InvestmentReturnInput } from "@/lib/calculators/investment-return";

function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(val);
}

export default function InvestmentReturnPage() {
  const t = useTranslations("investmentReturn");
  const common = useTranslations("common");

  const { register, watch } = useForm<InvestmentReturnInput>({
    defaultValues: {
      initialInvestment: 10000,
      finalValue: 25000,
      years: 5,
    },
  });

  const formValues = watch();
  const results = calculateInvestmentReturn({
    initialInvestment: Number(formValues.initialInvestment) || 0,
    finalValue: Number(formValues.finalValue) || 0,
    years: Number(formValues.years) || 1,
  });

  return (
    <CalculatorLayout
      titleKey="investmentReturn.title"
      descriptionKey="investmentReturn.description"
      resultSection={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <ResultCard
            label={t("cagr")}
            value={`${results.cagr}%`}
            icon={<TrendingUp className="w-6 h-6 text-black shrink-0" />}
            highlight={true}
          />
          <ResultCard
            label={t("totalReturn")}
            value={`${results.totalReturnPercent}%`}
            icon={<Percent className="w-6 h-6 text-black shrink-0" />}
          />
          <ResultCard
            label={t("totalGain")}
            value={formatCurrency(results.totalGain)}
            icon={<DollarSign className="w-6 h-6 text-black shrink-0" />}
          />
          <ResultCard
            label={common("years")}
            value={String(formValues.years || 0)}
            icon={<Calendar className="w-6 h-6 text-black shrink-0" />}
          />
        </div>
      }
      chartSection={
        <ChartWrapper
          type="line"
          data={results.yearlyData}
          xKey="year"
          yKeys={[{ key: "value", label: t("finalValue"), color: "#facc15" }]}
          title={t("growthChart")}
        />
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <CurrencyInput
          label={t("initialInvestment")}
          {...register("initialInvestment", { valueAsNumber: true })}
          min={0}
        />

        <CurrencyInput
          label={t("finalValue")}
          {...register("finalValue", { valueAsNumber: true })}
          min={0}
        />

        <NumberInput
          label={t("years")}
          {...register("years", { valueAsNumber: true })}
          min={1}
          max={100}
        />
      </form>
    </CalculatorLayout>
  );
}
