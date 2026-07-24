import Decimal from "decimal.js";

export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  maxDtiPercent?: number; // Padrão 36% para DTI total
}

export interface AffordabilityOutput {
  maxHomePrice: number;
  maxLoanAmount: number;
  maxMonthlyPayment: number;
  recommendedBudget: number;
}

export function calculateAffordability(
  input: AffordabilityInput
): AffordabilityOutput {
  const annualInc = new Decimal(input.annualIncome || 0);
  const monthlyInc = annualInc.div(12);
  const debts = new Decimal(input.monthlyDebts || 0);
  const downPay = new Decimal(input.downPayment || 0);
  const rateAnnual = new Decimal(input.interestRate || 0);
  const years = new Decimal(input.loanTermYears || 1);
  const maxDti = new Decimal(input.maxDtiPercent || 36).div(100);

  if (monthlyInc.lte(0) || years.lte(0)) {
    return {
      maxHomePrice: 0,
      maxLoanAmount: 0,
      maxMonthlyPayment: 0,
      recommendedBudget: 0,
    };
  }

  // Capacidade total mensal comprometida (Renda mensal * Max DTI) - Outras dívidas
  const maxDebtAllowed = monthlyInc.times(maxDti);
  const maxMonthlyPaymentDecimal = maxDebtAllowed.minus(debts);

  if (maxMonthlyPaymentDecimal.lte(0)) {
    return {
      maxHomePrice: downPay.toNumber(),
      maxLoanAmount: 0,
      maxMonthlyPayment: 0,
      recommendedBudget: downPay.toNumber(),
    };
  }

  // Cálculo de valor presente do empréstimo (PV) baseado na parcela máxima
  const totalMonths = years.times(12);
  let maxLoanAmountDecimal = new Decimal(0);

  if (rateAnnual.gt(0)) {
    const monthlyRate = rateAnnual.div(100).div(12);
    // PV = PMT * [1 - (1 + r)^(-n)] / r
    const factor = new Decimal(1)
      .minus(new Decimal(1).plus(monthlyRate).pow(totalMonths.negated()))
      .div(monthlyRate);
    maxLoanAmountDecimal = maxMonthlyPaymentDecimal.times(factor);
  } else {
    maxLoanAmountDecimal = maxMonthlyPaymentDecimal.times(totalMonths);
  }

  const maxHomePriceDecimal = maxLoanAmountDecimal.plus(downPay);
  // Orçamento recomendado de segurança (85% do limite teórico máximo)
  const recommendedBudgetDecimal = maxHomePriceDecimal.times(0.85);

  return {
    maxHomePrice: Number(maxHomePriceDecimal.toFixed(2)),
    maxLoanAmount: Number(maxLoanAmountDecimal.toFixed(2)),
    maxMonthlyPayment: Number(maxMonthlyPaymentDecimal.toFixed(2)),
    recommendedBudget: Number(recommendedBudgetDecimal.toFixed(2)),
  };
}
