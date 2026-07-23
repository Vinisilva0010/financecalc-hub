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
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest";
import { DollarSign, TrendingUp, PiggyBank, Calendar } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
  { key: "savingsGoal", href: "/tools/savings-goal" },
  { key: "investmentReturn", href: "/tools/investment-return" },
];

const compoundInterestSchema = z.object({
  principal: z.number().min(0, "Principal must be non-negative"),
  monthlyContribution: z.number().min(0, "Contribution must be non-negative"),
  annualRate: z.number().min(0).max(100, "Rate must be between 0 and 100"),
  years: z.number().min(1).max(100, "Years must be between 1 and 100"),
});

type CompoundInterestFormData = z.infer<typeof compoundInterestSchema>;

export default function CompoundInterestCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<CompoundInterestFormData>({
    resolver: zodResolver(compoundInterestSchema),
    defaultValues: {
      principal: 10000,
      monthlyContribution: 500,
      annualRate: 7,
      years: 20,
    },
  });

  const principal = watch("principal");
  const monthlyContribution = watch("monthlyContribution");
  const annualRate = watch("annualRate");
  const years = watch("years");

  const result = useMemo(() => {
    try {
      return calculateCompoundInterest({
        principal,
        monthlyContribution,
        annualRate,
        years,
      });
    } catch {
      return null;
    }
  }, [principal, monthlyContribution, annualRate, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    return result.yearlyData.map((d) => ({
      year: `Year ${d.year}`,
      principal: Math.round(d.principal),
      interest: Math.round(d.interest),
      total: Math.round(d.total),
    }));
  }, [result]);

  return (
    <CalculatorLayout
      titleKey="tools.compoundInterest"
      descriptionKey="tools.compoundInterestDesc"
      resultSection={
        result && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t("common.result")}
            </h2>
            <ResultCard
              label={t("compoundInterest.finalAmount")}
              value={`${currency}${formatCurrency(result.finalAmount.toNumber())}`}
              highlight
              icon={<DollarSign className="h-5 w-5" />}
            />
            <ResultCard
              label={t("compoundInterest.totalContributions")}
              value={`${currency}${formatCurrency(result.totalContributions.toNumber())}`}
              icon={<PiggyBank className="h-5 w-5" />}
            />
            <ResultCard
              label={t("compoundInterest.totalInterestEarned")}
              value={`${currency}${formatCurrency(result.totalInterest.toNumber())}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={t("common.years")}
              value={`${years}`}
              icon={<Calendar className="h-5 w-5" />}
            />
          </div>
        )
      }
      chartSection={
        result && (
          <ChartWrapper
            type="bar"
            data={chartData}
            xKey="year"
            yKeys={[
              { key: "principal", label: t("compoundInterest.principal"), color: "#000000" },
              { key: "interest", label: t("compoundInterest.totalInterestEarned"), color: "#facc15" },
            ]}
            title={t("compoundInterest.growthChart")}
            height={280}
          />
        )
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="compoundInterest" />
      }
    >
      <div className="space-y-6">
        <CurrencyInput
          label={t("compoundInterest.principal")}
          error={errors.principal?.message}
          {...register("principal", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={t("compoundInterest.monthlyContribution")}
          error={errors.monthlyContribution?.message}
          {...register("monthlyContribution", { valueAsNumber: true })}
        />
        <PercentInput
          label={t("compoundInterest.annualRate")}
          error={errors.annualRate?.message}
          {...register("annualRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={t("compoundInterest.years")}
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
