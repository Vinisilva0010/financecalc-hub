"use client";

import { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { calculateDebtPayoff } from "@/lib/calculators/debt-payoff";
import { Trash2, Plus, TrendingDown, Calendar, DollarSign, Scale } from "lucide-react";

const relatedToolsList = [
  { key: "mortgage", href: "/tools/mortgage-calculator" },
  { key: "personalLoan", href: "/tools/personal-loan-calculator" },
  { key: "creditCard", href: "/tools/credit-card-payoff" },
  { key: "compoundInterest", href: "/tools/compound-interest" },
];

const debtSchema = z.object({
  name: z.string().min(1, "Name is required"),
  balance: z.number().min(0.01, "Balance must be greater than 0"),
  interestRate: z.number().min(0).max(100, "Interest rate must be between 0 and 100"),
  minimumPayment: z.number().min(1, "Minimum payment must be at least 1"),
});

const debtPayoffSchema = z.object({
  debts: z.array(debtSchema).min(1, "At least one debt is required"),
  method: z.enum(["avalanche", "snowball", "compare"]),
});

type DebtPayoffFormData = z.infer<typeof debtPayoffSchema>;

export default function DebtPayoffCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const currency = locale === "pt" ? "R$" : "$";

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DebtPayoffFormData>({
    resolver: zodResolver(debtPayoffSchema),
    defaultValues: {
      debts: [
        { name: "", balance: 5000, interestRate: 15, minimumPayment: 200 },
        { name: "", balance: 3000, interestRate: 8, minimumPayment: 150 },
      ],
      method: "compare",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "debts",
  });

  const debts = watch("debts");
  const method = watch("method");

  const result = useMemo(() => {
    try {
      if (!debts || debts.length === 0) return null;
      return calculateDebtPayoff(debts);
    } catch {
      return null;
    }
  }, [debts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const maxLength = Math.max(
      result.avalanche.monthlyData.length,
      result.snowball.monthlyData.length
    );
    const data = [];
    for (let i = 0; i < maxLength; i++) {
      data.push({
        month: `${i}`,
        avalanche: result.avalanche.monthlyData[i]?.remainingBalance ?? 0,
        snowball: result.snowball.monthlyData[i]?.remainingBalance ?? 0,
      });
    }
    return data.filter(
      (_, i) => i % Math.ceil(data.length / 24) === 0 || i === data.length - 1
    );
  }, [result]);

  const activeResult =
    method === "avalanche"
      ? result?.avalanche
      : method === "snowball"
      ? result?.snowball
      : null;

  return (
    <CalculatorLayout
      titleKey="tools.debtPayoff"
      descriptionKey="tools.debtPayoffDesc"
      resultSection={
        result && (
          <div className="space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-black">
              {t("common.result")}
            </h2>

            {method === "compare" ? (
              <>
                <ResultCard
                  label={`${t("debtPayoff.avalanche")} — ${t("debtPayoff.totalMonths")}`}
                  value={`${result.avalanche.totalMonths} ${t("common.months")}`}
                  highlight={result.avalanche.totalMonths <= result.snowball.totalMonths}
                  icon={<TrendingDown className="h-5 w-5" />}
                />
                <ResultCard
                  label={`${t("debtPayoff.snowball")} — ${t("debtPayoff.totalMonths")}`}
                  value={`${result.snowball.totalMonths} ${t("common.months")}`}
                  highlight={result.snowball.totalMonths <= result.avalanche.totalMonths}
                  icon={<TrendingDown className="h-5 w-5" />}
                />
                <ResultCard
                  label={`${t("debtPayoff.avalanche")} — ${t("debtPayoff.totalInterestPaid")}`}
                  value={`${currency}${formatCurrency(result.avalanche.totalInterestPaid)}`}
                  icon={<DollarSign className="h-5 w-5" />}
                />
                <ResultCard
                  label={`${t("debtPayoff.snowball")} — ${t("debtPayoff.totalInterestPaid")}`}
                  value={`${currency}${formatCurrency(result.snowball.totalInterestPaid)}`}
                  icon={<DollarSign className="h-5 w-5" />}
                />
              </>
            ) : (
              activeResult && (
                <>
                  <ResultCard
                    label={t("debtPayoff.totalMonths")}
                    value={`${activeResult.totalMonths} ${t("common.months")}`}
                    highlight
                    icon={<Calendar className="h-5 w-5" />}
                  />
                  <ResultCard
                    label={t("debtPayoff.totalInterestPaid")}
                    value={`${currency}${formatCurrency(activeResult.totalInterestPaid)}`}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                  <ResultCard
                    label={t("debtPayoff.totalAmountPaid")}
                    value={`${currency}${formatCurrency(activeResult.totalAmountPaid)}`}
                    icon={<Scale className="h-5 w-5" />}
                  />
                </>
              )
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
              { key: "avalanche", label: t("debtPayoff.avalanche"), color: "#000000" },
              { key: "snowball", label: t("debtPayoff.snowball"), color: "#facc15" },
            ]}
            title={t("debtPayoff.payoffProgress")}
            height={280}
          />
        )
      }
      relatedTools={
        <RelatedTools tools={relatedToolsList} currentToolKey="debtPayoff" />
      }
    >
      <div className="space-y-6">
        {/* Method Toggle */}
        <div>
          <label className="block font-mono text-xs font-black uppercase tracking-[3px] mb-3">
            {t("debtPayoff.compareMethods")}
          </label>
          <div className="flex gap-2">
            {(["avalanche", "snowball", "compare"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setValue("method", m)}
                className={`flex-1 border-[4px] border-black px-4 py-3 font-black uppercase text-sm shadow-[4px_4px_0_#000] transition-all ${
                  method === m
                    ? "bg-yellow-300 -translate-x-0.5 -translate-y-0.5 shadow-[6px_6px_0_#000]"
                    : "bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000]"
                }`}
              >
                {t(`debtPayoff.${m}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Debts */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-[4px] border-black bg-white p-4 shadow-[4px_4px_0_#000] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black uppercase tracking-[3px]">
                  {t("debtPayoff.debtName")} #{index + 1}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="border-[3px] border-black bg-red-100 p-2 shadow-[3px_3px_0_#000] hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <NumberInput
                label={t("debtPayoff.debtName")}
                error={errors.debts?.[index]?.name?.message}
                {...register(`debts.${index}.name`)}
              />

              <CurrencyInput
                label={t("debtPayoff.balance")}
                error={errors.debts?.[index]?.balance?.message}
                {...register(`debts.${index}.balance`, { valueAsNumber: true })}
              />

              <PercentInput
                label={t("common.interestRate")}
                error={errors.debts?.[index]?.interestRate?.message}
                {...register(`debts.${index}.interestRate`, { valueAsNumber: true })}
              />

              <CurrencyInput
                label={t("debtPayoff.minimumPayment")}
                error={errors.debts?.[index]?.minimumPayment?.message}
                {...register(`debts.${index}.minimumPayment`, { valueAsNumber: true })}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", balance: 1000, interestRate: 10, minimumPayment: 100 })}
            className="w-full border-[4px] border-black bg-yellow-300 px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#000] transition-all flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("debtPayoff.addDebt")}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </CalculatorLayout>
  );
}