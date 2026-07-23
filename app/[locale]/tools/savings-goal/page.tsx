"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { calculateSavingsGoal, calculateRequiredMonthly } from "@/lib/calculators/savings-goal";
import { TrendingUp, Target, PiggyBank, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
  { key: "creditCard", href: "/tools/credit-card-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
];

const savingsGoalSchema = z.object({
  goalAmount: z.number().min(1, "Goal amount must be greater than 0"),
  currentSavings: z.number().min(0, "Current savings cannot be negative"),
  monthlyContribution: z.number().min(0, "Monthly contribution cannot be negative"),
  annualInterestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  timeframeYears: z.number().min(1).max(50, "Timeframe must be between 1 and 50 years"),
});

type SavingsGoalFormData = z.infer<typeof savingsGoalSchema>;

export default function SavingsGoalCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SavingsGoalFormData>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      goalAmount: 50000,
      currentSavings: 5000,
      monthlyContribution: 500,
      annualInterestRate: 5,
      timeframeYears: 10,
    },
  });

  const goalAmount = watch("goalAmount");
  const currentSavings = watch("currentSavings");
  const monthlyContribution = watch("monthlyContribution");
  const annualInterestRate = watch("annualInterestRate");
  const timeframeYears = watch("timeframeYears");

  const result = useMemo(() => {
    try {
      return calculateSavingsGoal({
        goalAmount,
        currentSavings,
        monthlyContribution,
        annualInterestRate,
        timeframeYears,
      });
    } catch {
      return null;
    }
  }, [goalAmount, currentSavings, monthlyContribution, annualInterestRate, timeframeYears]);

  const requiredMonthly = useMemo(() => {
    try {
      return calculateRequiredMonthly(goalAmount, currentSavings, annualInterestRate, timeframeYears);
    } catch {
      return 0;
    }
  }, [goalAmount, currentSavings, annualInterestRate, timeframeYears]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const schedule = result.monthlyData;
    const filtered = schedule.filter((_, i) => i % Math.ceil(schedule.length / 12) === 0 || i === schedule.length - 1);
    return filtered.map((d) => ({
      month: `${d.month}`,
      balance: Math.round(d.balance),
      contributions: Math.round(d.contributions),
      interest: Math.round(d.interest),
    }));
  }, [result]);

  return (
    <CalculatorLayout
      titleKey="tools.savingsGoal"
      descriptionKey="tools.savingsGoalDesc"
      resultSection={
        result && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t("common.result")}
            </h2>
            <ResultCard
              label={t("savingsGoal.isReachable")}
              value={result.isReachable ? t("savingsGoal.reachable") : t("savingsGoal.notReachable")}
              highlight={result.isReachable}
              icon={result.isReachable ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            />
            <ResultCard
              label={t("savingsGoal.monthsToReach")}
              value={result.isReachable ? `${result.monthsToReach} ${t("common.months")}` : `${result.monthsToReach}+ ${t("common.months")}`}
              icon={<Calendar className="h-5 w-5" />}
            />
            <ResultCard
              label={t("savingsGoal.finalAmount")}
              value={`${currency}${formatCurrency(result.finalAmount)}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={t("savingsGoal.totalContributions")}
              value={`${currency}${formatCurrency(result.totalContributions)}`}
              icon={<PiggyBank className="h-5 w-5" />}
            />
            <ResultCard
              label={t("savingsGoal.totalInterestEarned")}
              value={`${currency}${formatCurrency(result.totalInterestEarned)}`}
              icon={<Target className="h-5 w-5" />}
            />
            {!result.isReachable && (
              <ResultCard
                label={t("savingsGoal.shortfall")}
                value={`${currency}${formatCurrency(result.shortfall)}`}
                highlight={false}
                icon={<AlertTriangle className="h-5 w-5" />}
              />
            )}
            {!result.isReachable && (
              <div className="border-[4px] border-black bg-yellow-100 p-4 shadow-[4px_4px_0_#000]">
                <p className="font-bold text-sm uppercase tracking-wide mb-1">{t("savingsGoal.requiredMonthly")}</p>
                <p className="text-2xl font-black">{`${currency}${formatCurrency(requiredMonthly)}`}</p>
                <p className="text-sm font-bold mt-1 text-black/70">/ {t("common.months")}</p>
              </div>
            )}
          </div>
        )
      }
      chartSection={
        result && (
          <ChartWrapper
            type="line"
            data={chartData}
            xKey="month"
            yKeys={[
              { key: "balance", label: t("savingsGoal.balance"), color: "#facc15" },
              { key: "contributions", label: t("savingsGoal.contributions"), color: "#000000" },
              { key: "interest", label: t("savingsGoal.interest"), color: "#666666" },
            ]}
            title={t("savingsGoal.progressChart")}
            height={280}
          />
        )
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="savingsGoal" />
      }
    >
      <div className="space-y-6">
        <CurrencyInput
          label={t("savingsGoal.goalAmount")}
          error={errors.goalAmount?.message}
          {...register("goalAmount", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={t("savingsGoal.currentSavings")}
          error={errors.currentSavings?.message}
          {...register("currentSavings", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={t("savingsGoal.monthlyContribution")}
          error={errors.monthlyContribution?.message}
          {...register("monthlyContribution", { valueAsNumber: true })}
        />
        <PercentInput
          label={t("common.interestRate")}
          error={errors.annualInterestRate?.message}
          {...register("annualInterestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={t("savingsGoal.timeframe")}
          error={errors.timeframeYears?.message}
          {...register("timeframeYears", { valueAsNumber: true })}
        />
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}