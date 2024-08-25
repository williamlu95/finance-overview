export type BalanceRowType = {
  name: string;
  date: string;
  amount: string;
  overall: string;
};

export type CreditCardRowType = {
  name: string;
  expectedBalance: string;
  actualBalance: string;
  difference: string;
};

export type FinanceDataType = {
  joint: BalanceRowType[];
  food: BalanceRowType[];
  mother: BalanceRowType[];
  personal: BalanceRowType[];
  creditCards: CreditCardRowType[];
};
