import type { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { BalanceRowType, CreditCardRowType, FinanceDataType } from '@/types/finance';

const jwt = new JWT({
  email: process.env.GOOGLE_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SHEETS: Record<string, string> = {
  JOINT: 'Joint Balance',
  MOTHER: "Mother's Balance",
  WILLIAM: "William's Balance",
  PERSONAL: 'Personal Balance',
};

const formatBalanceRows = (rows: GoogleSpreadsheetRow[]): BalanceRowType[] =>
  rows.map((row) => ({
    name: row.get('Name'),
    date: row.get('Date'),
    amount: row.get('Amount'),
    overall: row.get('Overall'),
  }));

const formatCreditCardRows = (rows: GoogleSpreadsheetRow[]): CreditCardRowType[] =>
  rows.map((row) => ({
    name: row.get('Name'),
    expectedBalance: row.get('Expected Balance'),
    actualBalance: row.get('Actual Balance'),
    difference: row.get('Difference'),
  }));

export default async function handler(req: NextApiRequest, res: NextApiResponse<FinanceDataType>) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID ?? '', jwt);
  await doc.loadInfo();

  const jointSheet = doc.sheetsByTitle[SHEETS.JOINT];
  const jointRows = await jointSheet.getRows();

  const motherSheet = doc.sheetsByTitle[SHEETS.MOTHER];
  const motherRows = await motherSheet.getRows();

  const williamSheet = doc.sheetsByTitle[SHEETS.WILLIAM];
  const williamRows = await williamSheet.getRows();

  const personalSheet = doc.sheetsByTitle[SHEETS.PERSONAL];
  const personalRows = await personalSheet.getRows();

  res.status(200).json({
    joint: formatBalanceRows(jointRows),
    mother: formatBalanceRows(motherRows),
    personal: formatBalanceRows(personalRows),
    creditCards: formatCreditCardRows(williamRows),
  });
}
