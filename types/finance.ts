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
  mother: BalanceRowType[];
  personal: BalanceRowType[];
  food: CreditCardRowType;
  creditCards: CreditCardRowType[];
};
