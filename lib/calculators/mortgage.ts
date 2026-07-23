import Decimal from "decimal.js";

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number; // annual percentage
  loanTermYears: number;
}

export interface MortgageResult {
  loanAmount: Decimal;
  monthlyPayment: Decimal;
  totalInterest: Decimal;
  totalCost: Decimal;
  numberOfPayments: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const homePrice = new Decimal(input.homePrice);
  const downPayment = new Decimal(input.downPayment);
  const annualRate = new Decimal(input.interestRate);
  const years = input.loanTermYears;

  const loanAmount = homePrice.minus(downPayment);
  const monthlyRate = annualRate.dividedBy(100).dividedBy(12);
  const numberOfPayments = years * 12;

  let monthlyPayment: Decimal;

  if (monthlyRate.eq(0)) {
    monthlyPayment = loanAmount.dividedBy(numberOfPayments);
  } else {
    const factor = monthlyRate.plus(1).pow(numberOfPayments);
    monthlyPayment = loanAmount
      .times(monthlyRate.times(factor))
      .dividedBy(factor.minus(1));
  }

  const totalCost = monthlyPayment.times(numberOfPayments);
  const totalInterest = totalCost.minus(loanAmount);

  // Generate amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = balance.times(monthlyRate);
    const principalPayment = monthlyPayment.minus(interestPayment);
    balance = balance.minus(principalPayment);

    // Prevent negative balance due to rounding
    if (balance.lt(0)) balance = new Decimal(0);

    schedule.push({
      paymentNumber: i,
      payment: monthlyPayment.toNumber(),
      principal: principalPayment.toNumber(),
      interest: interestPayment.toNumber(),
      balance: balance.toNumber(),
    });
  }

  return {
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalCost,
    numberOfPayments,
    amortizationSchedule: schedule,
  };
}