import Decimal from "decimal.js";

export interface InvestmentReturnInput {
  initialInvestment: number;
  finalValue: number;
  years: number;
}

export interface YearlyReturnData {
  [key: string]: number;
  year: number;
  value: number;
}

export interface InvestmentReturnOutput {
  cagr: number;
  totalReturnPercent: number;
  totalGain: number;
  yearlyData: YearlyReturnData[];
}

export function calculateInvestmentReturn(
  input: InvestmentReturnInput
): InvestmentReturnOutput {
  const initial = new Decimal(input.initialInvestment || 0);
  const finalVal = new Decimal(input.finalValue || 0);
  const yrs = new Decimal(input.years || 1);

  if (initial.lte(0) || yrs.lte(0)) {
    return {
      cagr: 0,
      totalReturnPercent: 0,
      totalGain: 0,
      yearlyData: [],
    };
  }

  const totalGain = finalVal.minus(initial);
  const totalReturnPercent = totalGain.div(initial).times(100);

  const ratio = finalVal.div(initial);
  let cagrDecimal = new Decimal(0);

  if (ratio.gt(0)) {
    const exponent = new Decimal(1).div(yrs);
    cagrDecimal = new Decimal(Math.pow(ratio.toNumber(), exponent.toNumber())).minus(1);
  }

  const cagr = cagrDecimal.times(100).toNumber();

  const yearlyData: YearlyReturnData[] = [];
  const cagrRate = cagrDecimal.plus(1);

  for (let year = 0; year <= yrs.toNumber(); year++) {
    if (year === 0) {
      yearlyData.push({ year: 0, value: initial.toNumber() });
    } else {
      const val = initial.times(Math.pow(cagrRate.toNumber(), year)).toNumber();
      yearlyData.push({ year, value: Number(val.toFixed(2)) });
    }
  }

  return {
    cagr: Number(cagr.toFixed(2)),
    totalReturnPercent: Number(totalReturnPercent.toFixed(2)),
    totalGain: Number(totalGain.toFixed(2)),
    yearlyData,
  };
}
