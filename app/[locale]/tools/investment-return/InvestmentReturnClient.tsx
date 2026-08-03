"use client";

import { useMemo, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import Disclaimer from "@/components/Disclaimer";
import RelatedTools from "@/components/RelatedTools";
import { DollarSign, TrendingUp, Percent, Calendar } from "lucide-react";

const relatedToolsList = [
  { key: "compoundInterest", href: "/tools/compound-interest" },
  { key: "savingsGoal", href: "/tools/savings-goal" },
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
];

const investmentReturnSchema = z.object({
  initialInvestment: z.number().min(1, "Initial investment must be greater than 0"),
  finalValue: z.number().min(0, "Final value must be non-negative"),
  years: z.number().min(0.1, "Duration must be greater than 0"),
});

type InvestmentReturnFormData = z.infer<typeof investmentReturnSchema>;

interface Props {
  contentSection?: ReactNode;
}

export default function InvestmentReturnClient({ contentSection }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<InvestmentReturnFormData>({
    resolver: zodResolver(investmentReturnSchema),
    defaultValues: {
      initialInvestment: 10000,
      finalValue: 25000,
      years: 5,
    },
  });

  const initialInvestment = watch("initialInvestment");
  const finalValue = watch("finalValue");
  const years = watch("years");

  const result = useMemo(() => {
    if (!initialInvestment || !finalValue || !years || initialInvestment <= 0 || years <= 0) {
      return null;
    }

    const totalReturn = finalValue - initialInvestment;
    const totalReturnPercent = (totalReturn / initialInvestment) * 100;
    const cagr = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;

    return {
      totalReturn,
      totalReturnPercent,
      cagr,
    };
  }, [initialInvestment, finalValue, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result || !years || years <= 0) return [];
    const points = [];
    const steps = Math.min(Math.ceil(years), 30);
    const stepYears = years / steps;

    for (let i = 0; i <= steps; i++) {
      const currentYear = Number((i * stepYears).toFixed(1));
      const valueAtPoint = initialInvestment * Math.pow(1 + result.cagr / 100, currentYear);
      points.push({
        year: isPt ? `${currentYear} ano(s)` : `Year ${currentYear}`,
        value: Math.round(valueAtPoint),
      });
    }
    return points;
  }, [result, initialInvestment, years, isPt]);

  return (
    <CalculatorLayout
      titleKey="tools.investmentReturn"
      descriptionKey="tools.investmentReturnDesc"
      resultSection={
        result && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t("common.result")}
            </h2>
            <ResultCard
              label={isPt ? "Taxa Anual Composta (CAGR)" : "Compound Annual Growth Rate (CAGR)"}
              value={`${result.cagr.toFixed(2)}%`}
              highlight
              icon={<Percent className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Ganho Total Absoluto" : "Total Profit / Loss"}
              value={`${currency}${formatCurrency(result.totalReturn)}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Retorno Percentual Total" : "Total Return (%)"}
              value={`${result.totalReturnPercent.toFixed(2)}%`}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Período do Investimento" : "Investment Period"}
              value={`${years} ${isPt ? "Anos" : "Years"}`}
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
            yKeys={[{ key: "value", label: isPt ? "Valor do Patrimônio" : "Portfolio Value", color: "#facc15" }]}
            title={isPt ? "Curva de Crescimento Anualizado" : "Annualized Growth Trajectory"}
            height={280}
          />
        )
      }
      contentSection={contentSection}
      relatedTools={<RelatedTools tools={relatedToolsList} currentToolKey="investmentReturn" />}
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Valor Inicial Investido" : "Initial Investment"}
          error={errors.initialInvestment?.message}
          {...register("initialInvestment", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Valor Final Obtido" : "Final Value"}
          error={errors.finalValue?.message}
          {...register("finalValue", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Período Total (Anos)" : "Investment Duration (Years)"}
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
