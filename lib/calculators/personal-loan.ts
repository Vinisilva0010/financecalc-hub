import Decimal from "decimal.js";

export interface PersonalLoanInput {
  loanAmount: number;
  interestRate: number; // annual percentage
  loanTermMonths: number;
}

export interface PersonalLoanResult {
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

export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanResult {
  const principal = new Decimal(input.loanAmount);
  const annualRate = new Decimal(input.interestRate);
  const months = input.loanTermMonths;

  const monthlyRate = annualRate.dividedBy(100).dividedBy(12);
  const numberOfPayments = months;

  let monthlyPayment: Decimal;

  if (monthlyRate.eq(0)) {
    monthlyPayment = principal.dividedBy(numberOfPayments);
  } else {
    const factor = monthlyRate.plus(1).pow(numberOfPayments);
    monthlyPayment = principal
      .times(monthlyRate.times(factor))
      .dividedBy(factor.minus(1));
  }

  const totalCost = monthlyPayment.times(numberOfPayments);
  const totalInterest = totalCost.minus(principal);

  // Generate amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = balance.times(monthlyRate);
    const principalPayment = monthlyPayment.minus(interestPayment);
    balance = balance.minus(principalPayment);

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
    monthlyPayment,
    totalInterest,
    totalCost,
    numberOfPayments,
    amortizationSchedule: schedule,
  };
}