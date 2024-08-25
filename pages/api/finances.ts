import type { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { BalanceRowType, CreditCardRowType, FinanceDataType } from '@/types/finance';

const PRIVATE_KEY = Buffer.from(process.env.GOOGLE_PRIVATE_KEY || '', 'base64').toString('utf8');

const jwt = new JWT({
  email: process.env.GOOGLE_EMAIL,
  key: PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SHEETS: Record<string, string> = {
  JOINT: 'Joint Balance',
  MOTHER: "Mother's Balance",
  WILLIAM: "William's Balance",
  PERSONAL: 'Personal Balance',
};

const getDifference = (name: string, overall: string): string => {
  if (name !== 'Chase Checking') return overall;

  if (overall.startsWith('-')) return overall.replace('-', '');

  if (overall !== '$0.00') return `-${overall}`;

  return overall;
};

const formatBalanceRows = (rows: GoogleSpreadsheetRow[]): BalanceRowType[] =>
  rows.map((row) => ({
    name: row.get('Name'),
    date: row.get('Date'),
    amount: row.get('Amount'),
    overall: row.get('Overall'),
  }));

  const formatFoodBalanceRows = (rows: GoogleSpreadsheetRow[]): BalanceRowType[] => {
    const outstandingFoodBalance = rows.find(row => row.get('Name') === "Outstanding Food Balance");
    
    return [{
      name: outstandingFoodBalance?.get('Name') || '',
      date: outstandingFoodBalance?.get('Date') || new Date().toISOString(),
      amount: outstandingFoodBalance?.get('Amount') || '$0.00',
      overall: outstandingFoodBalance?.get('Amount').replace('-', '') || '$0.00', 
    }];
  };

const formatCreditCardRows = (rows: GoogleSpreadsheetRow[]): CreditCardRowType[] =>
  rows.map((row) => ({
    name: row.get('Name'),
    expectedBalance: row.get('Expected Balance'),
    actualBalance: row.get('Actual Balance'),
    difference: getDifference(row.get('Name'), row.get('Difference')),
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
    food: formatFoodBalanceRows(jointRows),
    mother: formatBalanceRows(motherRows),
    personal: formatBalanceRows(personalRows),
    creditCards: formatCreditCardRows(williamRows),
  });
}
