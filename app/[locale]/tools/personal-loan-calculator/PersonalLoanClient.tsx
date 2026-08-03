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
import { calculatePersonalLoan } from "@/lib/calculators/personal-loan";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "creditCard", href: "/tools/credit-card-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
  { key: "affordability", href: "/tools/affordability" },
];

const personalLoanSchema = z.object({
  loanAmount: z.number().min(1, "Loan amount must be greater than 0"),
  interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  loanTermMonths: z.number().min(1).max(600, "Loan term must be between 1 and 600 months"),
});

type PersonalLoanFormData = z.infer<typeof personalLoanSchema>;

export default function PersonalLoanCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PersonalLoanFormData>({
    resolver: zodResolver(personalLoanSchema),
    defaultValues: {
      loanAmount: 20000,
      interestRate: 8.5,
      loanTermMonths: 60,
    },
  });

  const loanAmount = watch("loanAmount");
  const interestRate = watch("interestRate");
  const loanTermMonths = watch("loanTermMonths");

  const result = useMemo(() => {
    try {
      return calculatePersonalLoan({
        loanAmount,
        interestRate,
        loanTermMonths,
      });
    } catch {
      return null;
    }
  }, [loanAmount, interestRate, loanTermMonths]);

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
    const years = Math.ceil(loanTermMonths / 12);
    for (let year = 1; year <= years; year++) {
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
  }, [result, loanTermMonths]);

  return (
    <CalculatorLayout
      titleKey="tools.personalLoan"
      descriptionKey="tools.personalLoanDesc"
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
              value={`${currency}${formatCurrency(loanAmount)}`}
              icon={<CreditCard className="h-5 w-5" />}
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
        <RelatedTools tools={relatedToolsList} currentToolKey="personalLoan" />
      }
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Loan Amount"
          error={errors.loanAmount?.message}
          {...register("loanAmount", { valueAsNumber: true })}
        />
        <PercentInput
          label="Interest Rate"
          error={errors.interestRate?.message}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label="Loan Term (Months)"
          error={errors.loanTermMonths?.message}
          {...register("loanTermMonths", { valueAsNumber: true })}
        />
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}