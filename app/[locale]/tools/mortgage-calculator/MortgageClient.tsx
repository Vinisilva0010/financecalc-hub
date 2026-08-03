"use client";

import { useMemo } from "react";
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

interface MortgageClientProps {
  faqs?: { question: string; answer: string }[];
}

export default function MortgageClient({ faqs }: MortgageClientProps) {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";
  const isPt = locale === "pt";

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
        year: isPt ? `Ano ${year}` : `Year ${year}`,
        principal: Math.round(principal),
        interest: Math.round(interest),
      });
    }
    return yearlyData;
  }, [result, loanTermYears, isPt]);

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
              { key: "principal", label: isPt ? "Amortização Principal" : "Principal", color: "#000000" },
              { key: "interest", label: isPt ? "Juros" : "Interest", color: "#facc15" },
            ]}
            title={isPt ? "Amortização de Principal vs Juros por Ano" : "Principal vs Interest by Year"}
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
      contentSection={
        <div className="space-y-8 text-black">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
              {isPt ? "Metodologia e Formulação Matemática" : "Methodology & Mathematical Formulas"}
            </h2>
            <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4">
              {isPt
                ? "A Calculadora de Hipoteca do FinanceCalc Hub utiliza matemática de precisão decimal para projetar tabelas de amortização sem erros de arredondamento. O valor da parcela mensal é derivado da equação de anuidade:"
                : "FinanceCalc Hub's Mortgage Calculator uses decimal-precision arithmetic to generate exact amortization schedules. The monthly payment is computed using the standard fixed-rate annuity equation:"}
            </p>

            <div className="border-[2px] border-black bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm my-4 overflow-x-auto text-center font-bold shadow-[2px_2px_0_#000]">
              {"PMT = P * [i(1+i)^n] / [(1+i)^n - 1]"}
            </div>

            <p className="text-xs font-medium leading-relaxed text-neutral-700">
              {isPt
                ? "Onde PMT é o valor da parcela mensal, P é o saldo financiado (Preço do Imóvel - Entrada), i é a taxa de juros mensal (taxa anual dividida por 12) e n é o número total de meses (anos * 12)."
                : "Where PMT represents monthly payment, P is principal balance (Home Price - Down Payment), i is monthly interest rate (annual rate / 12), and n is total duration in months (years * 12)."}
            </p>
          </div>

          {faqs && faqs.length > 0 && (
            <>
              <hr className="border-[2px] border-black" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                  {isPt ? "Perguntas Frequentes (FAQ)" : "Frequently Asked Questions"}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-[2px] border-black p-4 bg-white shadow-[2px_2px_0_#000]">
                      <h3 className="font-black text-xs sm:text-sm uppercase mb-2">{faq.question}</h3>
                      <p className="text-xs font-medium text-neutral-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="mortgage" />
      }
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Preço do Imóvel" : "Home Price"}
          error={errors.homePrice?.message}
          {...register("homePrice", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Valor da Entrada" : "Down Payment"}
          error={errors.downPayment?.message}
          {...register("downPayment", { valueAsNumber: true })}
        />
        <PercentInput
          label={isPt ? "Taxa de Juros Anual (%)" : "Interest Rate (%)"}
          error={errors.interestRate?.message}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Prazo do Financiamento (Anos)" : "Loan Term (Years)"}
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
