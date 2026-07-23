import Decimal from "decimal.js";

export interface CreditCardDebt {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface PayoffStrategy {
  name: string;
  totalMonths: number;
  totalInterest: Decimal;
  totalPaid: Decimal;
  payoffSchedule: PayoffMonth[];
}

export interface PayoffMonth {
  month: number;
  payment: number;
  remainingBalance: number;
}

export interface CreditCardResult {
  debts: CreditCardDebt[];
  avalanche: PayoffStrategy;
  snowball: PayoffStrategy;
}

function calculateDebtPayoff(
  debts: CreditCardDebt[],
  sortFn: (a: CreditCardDebt, b: CreditCardDebt) => number
): PayoffStrategy {
  const sortedDebts = [...debts].sort(sortFn);
  let totalMonths = 0;
  let totalInterest = new Decimal(0);
  let totalPaid = new Decimal(0);
  const schedule: PayoffMonth[] = [];

  const balances = sortedDebts.map((d) => new Decimal(d.balance));
  const rates = sortedDebts.map((d) => new Decimal(d.interestRate).dividedBy(100).dividedBy(12));
  const minPayments = sortedDebts.map((d) => new Decimal(d.minimumPayment));

  const monthlyBudget = minPayments.reduce((sum, p) => sum.plus(p), new Decimal(0));
  // Add extra $200 for accelerated payoff
  const totalMonthlyPayment = monthlyBudget.plus(200);

  let month = 0;
  while (balances.some((b) => b.gt(0)) && month < 600) {
    month++;
    let availablePayment = totalMonthlyPayment;
    let monthInterest = new Decimal(0);
    let monthPayment = new Decimal(0);

    // Apply minimum payments to all debts
    for (let i = 0; i < balances.length; i++) {
      if (balances[i].gt(0)) {
        const interest = balances[i].times(rates[i]);
        monthInterest = monthInterest.plus(interest);
        balances[i] = balances[i].plus(interest);

        const payment = Decimal.min(minPayments[i], balances[i]);
        balances[i] = balances[i].minus(payment);
        availablePayment = availablePayment.minus(payment);
        monthPayment = monthPayment.plus(payment);
      }
    }

    // Apply remaining budget to first non-zero debt
    for (let i = 0; i < balances.length && availablePayment.gt(0); i++) {
      if (balances[i].gt(0)) {
        const extraPayment = Decimal.min(availablePayment, balances[i]);
        balances[i] = balances[i].minus(extraPayment);
        availablePayment = availablePayment.minus(extraPayment);
        monthPayment = monthPayment.plus(extraPayment);
      }
    }

    totalInterest = totalInterest.plus(monthInterest);
    totalPaid = totalPaid.plus(monthPayment);

    const totalRemaining = balances.reduce((sum, b) => sum.plus(b), new Decimal(0));
    schedule.push({
      month,
      payment: monthPayment.toNumber(),
      remainingBalance: totalRemaining.toNumber(),
    });
  }

  totalMonths = month;

  return {
    name: "",
    totalMonths,
    totalInterest,
    totalPaid,
    payoffSchedule: schedule,
  };
}

export function calculateCreditCardPayoff(debts: CreditCardDebt[]): CreditCardResult {
  const avalanche = calculateDebtPayoff(
    debts,
    (a, b) => b.interestRate - a.interestRate // Highest rate first
  );
  avalanche.name = "Avalanche Method";

  const snowball = calculateDebtPayoff(
    debts,
    (a, b) => a.balance - b.balance // Lowest balance first
  );
  snowball.name = "Snowball Method";

  return {
    debts,
    avalanche,
    snowball,
  };
}