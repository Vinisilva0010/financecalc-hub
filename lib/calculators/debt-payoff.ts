import Decimal from "decimal.js";

export interface Debt {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface PayoffResult {
  totalMonths: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  monthlyData: { month: number; remainingBalance: number }[];
}

export interface DebtPayoffResult {
  avalanche: PayoffResult;
  snowball: PayoffResult;
}

interface SimulatedDebt {
  balance: Decimal;
  rate: Decimal;
  minPayment: Decimal;
}

function simulatePayoff(
  debts: Debt[],
  sortFn: (a: SimulatedDebt, b: SimulatedDebt) => number
): PayoffResult {
  let activeDebts: SimulatedDebt[] = debts.map((d) => ({
    balance: new Decimal(d.balance),
    rate: new Decimal(d.interestRate).div(100).div(12),
    minPayment: new Decimal(d.minimumPayment),
  })).sort(sortFn);

  let totalInterest = new Decimal(0);
  let totalPaid = new Decimal(0);
  const monthlyData: { month: number; remainingBalance: number }[] = [];

  let month = 0;
  const initialBalance = activeDebts.reduce((sum, d) => sum.plus(d.balance), new Decimal(0));
  monthlyData.push({ month: 0, remainingBalance: initialBalance.toNumber() });

  while (activeDebts.length > 0 && month < 600) {
    month++;
    let extraPayment = new Decimal(0);
    const nextDebts: SimulatedDebt[] = [];

    for (let i = 0; i < activeDebts.length; i++) {
      const debt = activeDebts[i];

      const interest = debt.balance.times(debt.rate);
      debt.balance = debt.balance.plus(interest);
      totalInterest = totalInterest.plus(interest);

      let payment = debt.minPayment.plus(extraPayment);

      if (debt.balance.lte(payment)) {
        totalPaid = totalPaid.plus(debt.balance);
        extraPayment = payment.minus(debt.balance);
      } else {
        debt.balance = debt.balance.minus(payment);
        totalPaid = totalPaid.plus(payment);
        extraPayment = new Decimal(0);
        nextDebts.push(debt);
      }
    }

    activeDebts = nextDebts.sort(sortFn);
    const remainingBalance = activeDebts.reduce((sum, d) => sum.plus(d.balance), new Decimal(0));
    monthlyData.push({ month, remainingBalance: remainingBalance.toNumber() });
  }

  return {
    totalMonths: month,
    totalInterestPaid: totalInterest.toNumber(),
    totalAmountPaid: totalPaid.toNumber(),
    monthlyData,
  };
}

export function calculateDebtPayoff(debts: Debt[]): DebtPayoffResult {
  const avalanche = simulatePayoff(debts, (a, b) => b.rate.toNumber() - a.rate.toNumber());
  const snowball = simulatePayoff(debts, (a, b) => a.balance.toNumber() - b.balance.toNumber());
  return { avalanche, snowball };
}