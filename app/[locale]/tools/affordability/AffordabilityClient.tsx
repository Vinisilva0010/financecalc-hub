"use client";

import { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import CalculatorLayout from "@/components/CalculatorLayout";
import CurrencyInput from "@/components/CurrencyInput";
import NumberInput from "@/components/NumberInput";
import PercentInput from "@/components/PercentInput";
import ResultCard from "@/components/ResultCard";
import ChartWrapper from "@/components/ChartWrapper";
import Disclaimer from "@/components/Disclaimer";
import { Home, DollarSign, ShieldCheck, CreditCard } from "lucide-react";
import { calculateAffordability, AffordabilityInput } from "@/lib/calculators/affordability";

interface Props {
  contentSection?: ReactNode;
}

export default function AffordabilityClient({ contentSection }: Props) {
  const t = useTranslations("affordability");
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";

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
  const result = calculateAffordability(formValues);

  function formatCurrency(val: number): string {
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  }

  return (
    <CalculatorLayout
      titleKey="tools.affordability"
      descriptionKey="tools.affordabilityDesc"
      resultSection={
        <div className="space-y-4">
          <ResultCard
            label={isPt ? "Preço Máximo do Imóvel" : "Max Home Price"}
            value={`${currency}${formatCurrency(result.maxHomePrice)}`}
            highlight
            icon={<Home className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Valor Máximo do Financiamento" : "Max Loan Amount"}
            value={`${currency}${formatCurrency(result.maxLoanAmount)}`}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Parcela Mensal Máxima" : "Max Monthly Payment"}
            value={`${currency}${formatCurrency(result.maxMonthlyPayment)}`}
            icon={<CreditCard className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Orçamento Recomendado" : "Recommended Budget"}
            value={`${currency}${formatCurrency(result.recommendedBudget)}`}
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </div>
      }
      chartSection={
        <ChartWrapper
          type="bar"
          data={[
            { name: isPt ? "Entrada" : "Down Payment", value: formValues.downPayment },
            { name: isPt ? "Empréstimo Máximo" : "Max Loan", value: result.maxLoanAmount },
          ]}
          xKey="name"
          yKeys={[{ key: "value", label: isPt ? "Valor" : "Amount", color: "#facc15" }]}
          title={isPt ? "Composição do Poder de Compra" : "Home Purchasing Power Breakdown"}
          height={250}
        />
      }
      contentSection={contentSection}
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Renda Bruta Anual" : "Annual Gross Income"}
          {...register("annualIncome", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Pagamentos Mensais de Dívidas" : "Monthly Debt Payments"}
          {...register("monthlyDebts", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Valor Salvo para Entrada" : "Down Payment Savings"}
          {...register("downPayment", { valueAsNumber: true })}
        />
        <PercentInput
          label={isPt ? "Taxa de Juros Anual (%)" : "Interest Rate (%)"}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Prazo do Financiamento (Anos)" : "Loan Term (Years)"}
          {...register("loanTermYears", { valueAsNumber: true })}
        />
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}
