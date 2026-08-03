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
import { calculatePersonalLoan } from "@/lib/calculators/personal-loan";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "creditCard", href: "/tools/credit-card-payoff" },
  { key: "debtPayoff", href: "/tools/debt-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
];

const personalLoanSchema = z.object({
  loanAmount: z.number().min(1, "Loan amount must be greater than 0"),
  interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  loanTermMonths: z.number().min(1).max(360, "Term must be between 1 and 360 months"),
});

type PersonalLoanFormData = z.infer<typeof personalLoanSchema>;

interface Props {
  contentSection?: ReactNode;
}

export default function PersonalLoanClient({ contentSection }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PersonalLoanFormData>({
    resolver: zodResolver(personalLoanSchema),
    defaultValues: {
      loanAmount: 20000,
      interestRate: 12.5,
      loanTermMonths: 36,
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
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: isPt ? "Composição do Empréstimo" : "Loan Composition",
        principal: Math.round(loanAmount || 0),
        interest: Math.round(result.totalInterest.toNumber()),
      },
    ];
  }, [result, loanAmount, isPt]);

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
              label={isPt ? "Parcela Mensal Fixa" : "Monthly Payment"}
              value={`${currency}${formatCurrency(result.monthlyPayment.toNumber())}`}
              highlight
              icon={<CreditCard className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Valor do Empréstimo" : "Loan Amount"}
              value={`${currency}${formatCurrency(loanAmount || 0)}`}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Total de Juros" : "Total Interest"}
              value={`${currency}${formatCurrency(result.totalInterest.toNumber())}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <ResultCard
              label={isPt ? "Custo Total do Empréstimo" : "Total Cost"}
              value={`${currency}${formatCurrency(result.totalCost.toNumber())}`}
              icon={<Calendar className="h-5 w-5" />}
              subtext={`${loanTermMonths} ${isPt ? "meses" : "months"}`}
            />
          </div>
        )
      }
      chartSection={
        result && (
          <ChartWrapper
            type="bar"
            data={chartData}
            xKey="name"
            yKeys={[
              { key: "principal", label: isPt ? "Principal" : "Principal", color: "#000000" },
              { key: "interest", label: isPt ? "Juros Totais" : "Total Interest", color: "#facc15" },
            ]}
            title={isPt ? "Principal Solicitado vs Juros Pagos" : "Principal vs Interest Breakdown"}
            height={250}
          />
        )
      }
      contentSection={contentSection}
      relatedTools={<RelatedTools tools={relatedToolsList} currentToolKey="personalLoan" />}
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Valor Solicitado" : "Loan Amount"}
          error={errors.loanAmount?.message}
          {...register("loanAmount", { valueAsNumber: true })}
        />
        <PercentInput
          label={isPt ? "Taxa de Juros Anual (%)" : "Interest Rate (%)"}
          error={errors.interestRate?.message}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Prazo (Meses)" : "Loan Term (Months)"}
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
