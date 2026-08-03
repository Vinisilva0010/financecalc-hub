"use client";

import { useMemo, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import PercentInput from "@/components/PercentInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import Disclaimer from "@/components/Disclaimer";
import RelatedTools from "@/components/RelatedTools";
import { calculateSavingsGoal, calculateRequiredMonthly } from "@/lib/calculators/savings-goal";
import { Target, PiggyBank, TrendingUp, Calendar } from "lucide-react";

const relatedToolsList = [
  { key: "compoundInterest", href: "/tools/compound-interest" },
  { key: "investmentReturn", href: "/tools/investment-return" },
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
];

const savingsGoalSchema = z.object({
  targetAmount: z.number().min(1, "Target amount must be greater than 0"),
  initialSavings: z.number().min(0, "Initial savings cannot be negative"),
  annualRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  years: z.number().min(1).max(100, "Timeframe must be between 1 and 100 years"),
});

type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;

interface Props {
  contentSection?: ReactNode;
}

export default function SavingsGoalClient({ contentSection }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SavingsGoalFormData>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      targetAmount: 50000,
      initialSavings: 5000,
      annualRate: 7,
      years: 5,
    },
  });

  const targetAmount = watch("targetAmount") || 0;
  const initialSavings = watch("initialSavings") || 0;
  const annualRate = watch("annualRate") || 0;
  const years = watch("years") || 1;

  const result = useMemo(() => {
    try {
      const requiredMonthly = calculateRequiredMonthly(
        targetAmount,
        initialSavings,
        annualRate,
        years
      );

      const simResult = calculateSavingsGoal({
        goalAmount: targetAmount,
        currentSavings: initialSavings,
        monthlyContribution: requiredMonthly,
        annualInterestRate: annualRate,
        timeframeYears: years,
      });

      return {
        monthlyContribution: requiredMonthly,
        totalInterestEarned: simResult.totalInterestEarned,
        totalContributions: simResult.totalContributions,
        monthlyData: simResult.monthlyData,
      };
    } catch {
      return null;
    }
  }, [targetAmount, initialSavings, annualRate, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result || !result.monthlyData) return [];
    return result.monthlyData
      .filter((d) => d.month % 12 === 0 || d.month === result.monthlyData.length - 1)
      .map((d) => ({
        year: isPt ? `Ano ${Math.floor(d.month / 12)}` : `Year ${Math.floor(d.month / 12)}`,
        balance: Math.round(d.balance),
        target: Math.round(targetAmount),
      }));
  }, [result, targetAmount, isPt]);

  return (
    <CalculatorLayout
      titleKey="tools.savingsGoal"
      descriptionKey="tools.savingsGoalDesc"
      resultSection={
        <div className="space-y-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-black">
            {t("common.result")}
          </h2>
          <ResultCard
            label={isPt ? "Aporte Mensal Necessário" : "Required Monthly Savings"}
            value={`${currency}${formatCurrency(result ? result.monthlyContribution : 0)}`}
            highlight
            icon={<PiggyBank className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Meta Final" : "Target Goal"}
            value={`${currency}${formatCurrency(targetAmount)}`}
            icon={<Target className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Total de Juros Acumulados" : "Total Interest Earned"}
            value={`${currency}${formatCurrency(result ? result.totalInterestEarned : 0)}`}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Prazo da Meta" : "Timeframe"}
            value={`${years} ${isPt ? "Anos" : "Years"}`}
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
      }
      chartSection={
        chartData.length > 0 ? (
          <ChartWrapper
            type="bar"
            data={chartData}
            xKey="year"
            yKeys={[
              { key: "balance", label: isPt ? "Patrimônio Acumulado" : "Accumulated Balance", color: "#facc15" },
              { key: "target", label: isPt ? "Meta Alvo" : "Goal Target", color: "#000000" },
            ]}
            title={isPt ? "Projeção de Acúmulo Até a Meta" : "Progress Projection Toward Goal"}
            height={280}
          />
        ) : undefined
      }
      contentSection={contentSection}
      relatedTools={<RelatedTools tools={relatedToolsList} currentToolKey="savingsGoal" />}
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Valor da Meta Financeira" : "Target Amount"}
          error={errors.targetAmount?.message}
          {...register("targetAmount", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Valor Inicial Disponível" : "Initial Savings"}
          error={errors.initialSavings?.message}
          {...register("initialSavings", { valueAsNumber: true })}
        />
        <PercentInput
          label={isPt ? "Rendimento Anual Esperado (%)" : "Expected Annual Return (%)"}
          error={errors.annualRate?.message}
          {...register("annualRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Prazo para Atingir (Anos)" : "Timeframe (Years)"}
          error={errors.years?.message}
          {...register("years", { valueAsNumber: true })}
        />
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}
