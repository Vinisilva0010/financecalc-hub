import Decimal from "decimal.js";

export interface SavingsGoalInput {
  goalAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  annualInterestRate: number;
  timeframeYears: number;
}

export interface SavingsGoalResult {
  monthsToReach: number;
  totalContributions: number;
  totalInterestEarned: number;
  finalAmount: number;
  isReachable: boolean;
  shortfall: number;
  monthlyData: MonthlyDataPoint[];
}

export interface MonthlyDataPoint {
  month: number;
  balance: number;
  contributions: number;
  interest: number;
}

export function calculateSavingsGoal(input: SavingsGoalInput): SavingsGoalResult {
  const goal = new Decimal(input.goalAmount);
  const current = new Decimal(input.currentSavings);
  const monthly = new Decimal(input.monthlyContribution);
  const rate = new Decimal(input.annualInterestRate).div(100);
  const monthlyRate = rate.div(12);
  const maxMonths = new Decimal(input.timeframeYears).times(12);

  let balance = current;
  let totalContributions = current;
  let totalInterest = new Decimal(0);
  const monthlyData: MonthlyDataPoint[] = [];

  // Add initial point
  monthlyData.push({
    month: 0,
    balance: current.toNumber(),
    contributions: current.toNumber(),
    interest: 0,
  });

  let months = 0;
  let reached = false;

  for (let i = 1; i <= maxMonths.toNumber(); i++) {
    months = i;
    const interest = balance.times(monthlyRate);
    balance = balance.plus(interest).plus(monthly);
    totalContributions = totalContributions.plus(monthly);
    totalInterest = totalInterest.plus(interest);

    monthlyData.push({
      month: i,
      balance: balance.toNumber(),
      contributions: totalContributions.toNumber(),
      interest: totalInterest.toNumber(),
    });

    if (balance.gte(goal)) {
      reached = true;
      break;
    }
  }

  const shortfall = reached ? new Decimal(0) : goal.minus(balance);
  const finalAmount = reached ? balance : balance;

  return {
    monthsToReach: reached ? months : maxMonths.toNumber(),
    totalContributions: totalContributions.toNumber(),
    totalInterestEarned: totalInterest.toNumber(),
    finalAmount: finalAmount.toNumber(),
    isReachable: reached,
    shortfall: shortfall.toNumber(),
    monthlyData,
  };
}

export function calculateRequiredMonthly(
  goalAmount: number,
  currentSavings: number,
  annualInterestRate: number,
  timeframeYears: number
): number {
  const goal = new Decimal(goalAmount);
  const current = new Decimal(currentSavings);
  const rate = new Decimal(annualInterestRate).div(100);
  const monthlyRate = rate.div(12);
  const months = new Decimal(timeframeYears).times(12);

  if (monthlyRate.eq(0)) {
    const needed = goal.minus(current).div(months);
    return needed.toNumber();
  }

  // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
  // PMT = (FV - PV*(1+r)^n) / (((1+r)^n - 1)/r)
  const factor = Decimal.pow(new Decimal(1).plus(monthlyRate), months);
  const numerator = goal.minus(current.times(factor));
  const denominator = factor.minus(1).div(monthlyRate);

  if (denominator.lte(0)) {
    return 0;
  }

  const pmt = numerator.div(denominator);
  return pmt.gt(0) ? pmt.toNumber() : 0;
}