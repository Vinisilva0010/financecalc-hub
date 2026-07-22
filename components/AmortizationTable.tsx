"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface AmortizationTableProps {
  data: AmortizationRow[];
  currencySymbol: string;
}

export default function AmortizationTable({
  data,
  currencySymbol,
}: AmortizationTableProps) {
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? data : data.slice(0, 12);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black uppercase tracking-tight text-black">
        Amortization Schedule
      </h3>

      <div className="overflow-x-auto border-[4px] border-black">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="border-r-[3px] border-white px-4 py-3 text-left text-xs font-black uppercase tracking-wider">
                #
              </th>
              <th className="border-r-[3px] border-white px-4 py-3 text-right text-xs font-black uppercase tracking-wider">
                Payment
              </th>
              <th className="border-r-[3px] border-white px-4 py-3 text-right text-xs font-black uppercase tracking-wider">
                Principal
              </th>
              <th className="border-r-[3px] border-white px-4 py-3 text-right text-xs font-black uppercase tracking-wider">
                Interest
              </th>
              <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wider">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr
                key={row.paymentNumber}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b-[2px] border-black transition-colors hover:bg-yellow-100`}
              >
                <td className="border-r-[2px] border-black px-4 py-2.5 text-sm font-black">
                  {row.paymentNumber}
                </td>
                <td className="border-r-[2px] border-black px-4 py-2.5 text-right text-sm font-bold">
                  {currencySymbol}
                  {formatCurrency(row.payment)}
                </td>
                <td className="border-r-[2px] border-black px-4 py-2.5 text-right text-sm font-bold">
                  {currencySymbol}
                  {formatCurrency(row.principal)}
                </td>
                <td className="border-r-[2px] border-black px-4 py-2.5 text-right text-sm font-bold">
                  {currencySymbol}
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-2.5 text-right text-sm font-bold">
                  {currencySymbol}
                  {formatCurrency(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex w-full items-center justify-center gap-2 border-[4px] border-black bg-white py-3 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#000]"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show All {data.length} Payments <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}