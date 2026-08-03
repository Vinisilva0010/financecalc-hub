"use client";

import { useMemo, useState, ReactNode } from "react";
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
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { Home, Percent, Calendar, DollarSign } from "lucide-react";

const relatedToolsList = [
  { key: "affordability", href: "/tools/affordability" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
  { key: "debtPayoff", href: "/tools/debt-payoff" },
];

const mortgageSchema = z.object({
  homePrice: z.number().min(1, "Home price must be greater than 0"),
  downPayment: z.number().min(0, "Down payment cannot be negative"),
  interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  loanTerm: z.number().min(1).max(50, "Loan term must be between 1 and 50 years"),
}).refine((data) => data.downPayment < data.homePrice, {
  message: "Down payment must be less than home price",
  path: ["downPayment"],
});

type MortgageFormData = z.infer<typeof mortgageSchema>;

interface Props {
  contentSection?: ReactNode;
}

export default function MortgageClient({ contentSection }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isPt = locale === "pt";
  const currency = isPt ? "R$" : "$";
  const [showAllSchedule, setShowAllSchedule] = useState(false);

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
      loanTerm: 30,
    },
  });

  const homePrice = watch("homePrice") || 0;
  const downPayment = watch("downPayment") || 0;
  const interestRate = watch("interestRate") || 0;
  const loanTerm = watch("loanTerm") || 1;

  const result = useMemo(() => {
    try {
      if (homePrice <= downPayment) return null;

      const calc = calculateMortgage({
        homePrice,
        downPayment,
        interestRate,
        loanTermYears: loanTerm,
      });

      return {
        loanAmount: calc.loanAmount.toNumber(),
        monthlyPayment: calc.monthlyPayment.toNumber(),
        totalInterest: calc.totalInterest.toNumber(),
        totalCost: calc.totalCost.toNumber(),
        numberOfPayments: calc.numberOfPayments,
        amortizationSchedule: calc.amortizationSchedule,
      };
    } catch {
      return null;
    }
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result || !result.amortizationSchedule) return [];
    
    return result.amortizationSchedule
      .filter((d) => d.paymentNumber === 1 || d.paymentNumber % 12 === 0)
      .map((d) => ({
        year: isPt ? `Ano ${Math.ceil(d.paymentNumber / 12)}` : `Year ${Math.ceil(d.paymentNumber / 12)}`,
        balance: Math.round(d.balance),
        paidPrincipal: Math.round(result.loanAmount - d.balance),
      }));
  }, [result, isPt]);

  const visibleSchedule = useMemo(() => {
    if (!result || !result.amortizationSchedule) return [];
    return showAllSchedule ? result.amortizationSchedule : result.amortizationSchedule.slice(0, 12);
  }, [result, showAllSchedule]);

  return (
    <CalculatorLayout
      titleKey="tools.mortgage"
      descriptionKey="tools.mortgageDesc"
      disclaimer={<></>}
      resultSection={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultCard
            label={isPt ? "Parcela Mensal" : "Monthly Payment"}
            value={`${currency}${formatCurrency(result ? result.monthlyPayment : 0)}`}
            highlight
            icon={<DollarSign className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Valor do Empréstimo" : "Loan Amount"}
            value={`${currency}${formatCurrency(result ? result.loanAmount : 0)}`}
            icon={<Home className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Total de Juros" : "Total Interest"}
            value={`${currency}${formatCurrency(result ? result.totalInterest : 0)}`}
            icon={<Percent className="h-5 w-5" />}
          />
          <ResultCard
            label={isPt ? "Custo Total (Empréstimo + Juros)" : "Total Cost (Loan + Interest)"}
            value={`${currency}${formatCurrency(result ? result.totalCost : 0)}`}
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
      }
      chartSection={
        result && chartData.length > 0 ? (
          <ChartWrapper
            type="line"
            data={chartData}
            xKey="year"
            yKeys={[
              { key: "balance", label: isPt ? "Saldo Devedor" : "Remaining Balance", color: "#000000" },
              { key: "paidPrincipal", label: isPt ? "Amortização Acumulada" : "Principal Paid", color: "#facc15" }
            ]}
            title={isPt ? "PROJEÇÃO DE AMORTIZAÇÃO" : "AMORTIZATION PROJECTION"}
            height={300}
          />
        ) : undefined
      }
      amortizationSection={
        result && visibleSchedule.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase text-black border-b-[3px] border-black pb-2">
              {isPt ? "TABELA DE AMORTIZAÇÃO" : "AMORTIZATION SCHEDULE"}
            </h3>

            <div className="overflow-x-auto border-[4px] border-black shadow-[4px_4px_0_#000]">
              <table className="w-full text-left font-mono text-xs sm:text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-yellow-400 border-b-[3px] border-black text-black uppercase font-black">
                    <th className="p-3 border-r-[2px] border-black text-center">#</th>
                    <th className="p-3 border-r-[2px] border-black">{isPt ? "PARCELA" : "PAYMENT"} ({currency})</th>
                    <th className="p-3 border-r-[2px] border-black">{isPt ? "PRINCIPAL" : "PRINCIPAL"}</th>
                    <th className="p-3 border-r-[2px] border-black">{isPt ? "JUROS" : "INTEREST"}</th>
                    <th className="p-3">{isPt ? "SALDO" : "BALANCE"}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleSchedule.map((row) => (
                    <tr key={row.paymentNumber} className="border-b-[1px] border-black hover:bg-neutral-100 font-bold">
                      <td className="p-3 border-r-[2px] border-black text-center bg-neutral-50">{row.paymentNumber}</td>
                      <td className="p-3 border-r-[2px] border-black">{formatCurrency(row.payment)}</td>
                      <td className="p-3 border-r-[2px] border-black text-black">{formatCurrency(row.principal)}</td>
                      <td className="p-3 border-r-[2px] border-black text-red-600">{formatCurrency(row.interest)}</td>
                      <td className="p-3 font-black">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {result.amortizationSchedule.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllSchedule(!showAllSchedule)}
                className="w-full py-3 bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0_#000] hover:bg-yellow-400 hover:text-black transition-colors"
              >
                {showAllSchedule
                  ? (isPt ? "MOSTRAR APENAS PRIMEIROS 12 MESES" : "SHOW FIRST 12 MONTHS ONLY")
                  : (isPt ? `MOSTRAR TODOS OS ${result.numberOfPayments} MESES` : `SHOW ALL ${result.numberOfPayments} MONTHS`)}
              </button>
            )}
          </div>
        ) : undefined
      }
      contentSection={contentSection}
      relatedTools={<RelatedTools tools={relatedToolsList} currentToolKey="mortgage" />}
    >
      <div className="space-y-6">
        <CurrencyInput
          label={isPt ? "Valor do Imóvel" : "Home Price"}
          error={errors.homePrice?.message}
          {...register("homePrice", { valueAsNumber: true })}
        />
        <CurrencyInput
          label={isPt ? "Valor da Entrada" : "Down Payment"}
          error={errors.downPayment?.message}
          {...register("downPayment", { valueAsNumber: true })}
        />
        <PercentInput
          label={isPt ? "Taxa de Juros Anual (%)" : "Annual Interest Rate (%)"}
          error={errors.interestRate?.message}
          {...register("interestRate", { valueAsNumber: true })}
        />
        <NumberInput
          label={isPt ? "Prazo (Anos)" : "Loan Term (Years)"}
          error={errors.loanTerm?.message}
          {...register("loanTerm", { valueAsNumber: true })}
        />
        <div className="pt-4">
          <Disclaimer />
        </div>
      </div>
    </CalculatorLayout>
  );
}
