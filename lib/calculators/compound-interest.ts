import Decimal from "decimal.js";

export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
}

export interface YearlyBreakdown {
  year: number;
  principal: number;
  contributions: number;
  interest: number;
  total: number;
}

export interface CompoundInterestResult {
  finalAmount: Decimal;
  totalContributions: Decimal;
  totalInterest: Decimal;
  yearlyData: YearlyBreakdown[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const P = new Decimal(input.principal);
  const PMT = new Decimal(input.monthlyContribution);
  const r = new Decimal(input.annualRate).dividedBy(100);
  const t = input.years;
  const n = 12; // monthly compounding

  const yearlyData: YearlyBreakdown[] = [];
  let runningPrincipal = P;
  let runningContributions = new Decimal(0);
  let runningTotal = P;

  for (let year = 1; year <= t; year++) {
    const yearStartTotal = runningTotal;
    
    // Add monthly contributions for this year
    const yearContributions = PMT.times(12);
    runningContributions = runningContributions.plus(yearContributions);
    
    // Compound interest for this year
    runningTotal = runningTotal.plus(yearContributions).times(
      r.dividedBy(n).plus(1).pow(n)
    );

    const yearInterest = runningTotal.minus(yearStartTotal).minus(yearContributions);
    runningPrincipal = runningPrincipal.plus(yearContributions);

    yearlyData.push({
      year,
      principal: runningPrincipal.toNumber(),
      contributions: runningContributions.toNumber(),
      interest: yearInterest.toNumber(),
      total: runningTotal.toNumber(),
    });
  }

  const finalAmount = runningTotal;
  const totalContributions = runningContributions.plus(P);
  const totalInterest = finalAmount.minus(totalContributions);

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    yearlyData,
  };
}