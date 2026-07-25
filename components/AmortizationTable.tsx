"use client";

import { useState } from "react";

export interface AmortizationRow {
  period?: number;
  month?: number;
  payment: string | number;
  principal: string | number;
  interest: string | number;
  balance: string | number;
  totalInterest?: string | number;
}

export interface AmortizationTableProps {
  data?: AmortizationRow[];
  schedule?: AmortizationRow[];
  currencySymbol?: string;
}

export default function AmortizationTable({ data, schedule, currencySymbol }: AmortizationTableProps) {
  const [showAll, setShowAll] = useState(false);
  const activeSchedule = data ?? schedule;

  if (!activeSchedule || !Array.isArray(activeSchedule) || activeSchedule.length === 0) {
    return null;
  }

  const displayedSchedule = showAll ? activeSchedule : activeSchedule.slice(0, 12);

  return (
    <div>
      <h3 className="text-2xl font-black uppercase mb-4 text-black border-b-[4px] border-black pb-2">
        Amortization Schedule
      </h3>

      <div className="overflow-x-auto border-[4px] border-black">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[4px] border-black bg-yellow-300 text-black text-xs font-black uppercase">
              <th className="p-3 border-r-[3px] border-black">#</th>
              <th className="p-3 border-r-[3px] border-black">Payment ({currencySymbol})</th>
              <th className="p-3 border-r-[3px] border-black">Principal</th>
              <th className="p-3 border-r-[3px] border-black">Interest</th>
              <th className="p-3">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y-[2px] divide-black font-bold text-xs">
            {displayedSchedule.map((row, idx) => (
              <tr key={row.period ?? row.month ?? idx} className="hover:bg-yellow-50">
                <td className="p-3 border-r-[2px] border-black font-mono">{row.period ?? row.month ?? idx + 1}</td>
                <td className="p-3 border-r-[2px] border-black">{row.payment}</td>
                <td className="p-3 border-r-[2px] border-black">{row.principal}</td>
                <td className="p-3 border-r-[2px] border-black text-red-600">{row.interest}</td>
                <td className="p-3 font-mono">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeSchedule.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 w-full border-[4px] border-black bg-black text-white py-3 px-6 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_#000] hover:bg-yellow-300 hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0_#000] transition-all"
        >
          {showAll ? "Show Initial 12 Months" : `Show All ${activeSchedule.length} Months`}
        </button>
      )}
    </div>
  );
}
