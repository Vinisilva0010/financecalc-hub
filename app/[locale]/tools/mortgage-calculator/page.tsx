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
import AmortizationTable from "@/components/AmortizationTable";
import Disclaimer from "@/components/Disclaimer";
import RelatedTools from "@/components/RelatedTools";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { DollarSign, TrendingUp, Calendar, Home } from "lucide-react";

const relatedToolsList = [
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
  { key: "creditCard", href: "/tools/credit-card-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
  { key: "affordability", href: "/tools/affordability" },
];

const mortgageSchema = z.object({
  homePrice: z.number().min(1, "Home price must be greater than 0"),
  downPayment: z.number().min(0, "Down payment cannot be negative"),
  interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  loanTermYears: z.number().min(1).max(50, "Loan term must be between 1 and 50 years"),
});

type MortgageFormData = z.infer<typeof mortgageSchema>;

export default function MortgageCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      homePrice: 300000,
      downPayment: 60000,
      interestRate: 6.5,
      loanTermYears: 30,
    },
  });

  const homePrice = watch("homePrice");
  const downPayment = watch("downPayment");
  const interestRate = watch("interestRate");
  const loanTermYears = watch("loanTermYears");

  const result = useMemo(() => {
    try {
      return calculateMortgage({
        homePrice,
        downPayment,
        interestRate,
        loanTermYears,
      });
    } catch {
      return null;
    }
  }, [homePrice, downPayment, interestRate, loanTermYears]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const schedule = result.amortizationSchedule;
    const yearlyData = [];
    for (let year = 1; year <= loanTermYears; year++) {
      const startIdx = (year - 1) * 12;
      const endIdx = Math.min(year * 12, schedule.length);
      const yearPayments = schedule.slice(startIdx, endIdx);
      const principal = yearPayments.reduce((sum, p) => sum + p.principal, 0);
      const interest = yearPayments.reduce((sum, p) => sum + p.interest, 0);
      yearlyData.push({
        year: `Year ${year}`,
        principal: Math.round(principal),
        interest: Math.round(interest),
      });
    }
    return yearlyData;
  }, [result, loanTermYears]);

  return (
    <CalculatorLayout
      titleKey="tools.mortgage"
      descriptionKey="tools.mortgageDesc"
      resultSection={
        result && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t("common.result")}
            </h2>
            <ResultCard
              label={t("common.monthlyPayment")}
              value={`${currency}${formatCurrency(result.monthlyPayment.toNumber())}`}
              highlight
              icon={<DollarSign className="h-5 w-5" />}
            />
            <ResultCard
              label={t("common.loanAmount")}
              value={`${currency}${formatCurrency(result.loanAmount.toNumber())}`}
              icon={<Home className="h-5 w-5" />}
            />
            <ResultCard
              label={t("common.totalInterest")}
              value={`${currency}${formatCurrency(result.totalInterest.toNumber())}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={t("common.totalCost")}
              value={`${currency}${formatCurrency(result.totalCost.toNumber())}`}
              icon={<Calendar className="h-5 w-5" />}
              subtext={`${result.numberOfPayments} ${t("common.months")}`}
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
              { key: "principal", label: "Principal", color: "#000000" },
              { key: "interest", label: "Interest", color: "#facc15" },
            ]}
            title="Principal vs Interest by Year"
            height={280}
          />
        )
      }
      amortizationSection={
        result && (
          <AmortizationTable
            data={result.amortizationSchedule}
            currencySymbol={currency}
          />
        )
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="mortgage" />
      }
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Home Price"
          error={errors.homePrice?.message}
          {...register("homePrice", { valueAsNumber: true })}
        />
        <CurrencyInput
          label="Down Payment"
          error={errors.downPayment?.message}
          {...register("downPayment", { valueAsNumber: true })}
        />
        <PercentInput
          label="Interest Rate"
          error={errors.interestRate?.message}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label="Loan Term (Years)"
          error={errors.loanTermYears?.message}
          {...register("loanTermYears", { valueAsNumber: true })}
        />
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}
