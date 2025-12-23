import { BalanceRowType } from "@/types/finance";
import { Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import TransactionTable from "./TransactionTable";
import { useEffect, useState } from "react";
import { formatFromDollars, formatToDollars } from "@/utils/currency-formatter";
import { Close } from "@mui/icons-material";
import equal from "fast-deep-equal";

type Props = {
  name: string;
  minAmount: string;
  balances: BalanceRowType[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};


export default function TransactionDrawer({ name, minAmount, balances, open, onOpenChange }: Props): React.ReactElement {
  const [transactions, setTransactions] = useState<BalanceRowType[]>([]);
  const [actualMinAmount, setActualMinAmount] = useState(minAmount);
  const isDirty = !equal(transactions, balances);

  useEffect(() => {
    setTransactions(structuredClone(balances));
  }, [balances]);
  
  useEffect(() => {
    setActualMinAmount(minAmount);
  }, [minAmount]);
  
  const handleClose = () => {
    setTransactions(structuredClone(balances));
    setActualMinAmount(minAmount);
    onOpenChange(false);
  };

  const handleMinAmountClick = () => {
    const amountCell = document.getElementById(actualMinAmount);

    if (!amountCell) {
      return;
    }

    amountCell.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleAmountChange = (index: number, amount: string) => {
    const updatedTransactions = structuredClone(transactions);
    updatedTransactions[index].amount = amount;
  
    updatedTransactions.forEach((_transaction, transactionIndex) => {
     if (transactionIndex === 0) {
        updatedTransactions[0].overall = updatedTransactions[0].amount;
        return;
      }

      const previousIndex = transactionIndex - 1;
      const currentOverall = formatFromDollars(updatedTransactions[previousIndex].overall);
      const currentAmount = formatFromDollars(updatedTransactions[transactionIndex].amount);
      updatedTransactions[transactionIndex].overall = formatToDollars(currentOverall + currentAmount);
    });

    const updatedMinAmount = Math.min(...updatedTransactions.map(t => formatFromDollars(t.overall)));
    setActualMinAmount(formatToDollars(updatedMinAmount));
    setTransactions(updatedTransactions);
  };

  const handleReset = () => {
    setActualMinAmount(minAmount);
    setTransactions(structuredClone(balances));
  };

  return (
      <Drawer
        open={open}
        anchor="bottom"
        onClose={handleClose}
      >
        <Stack p={2} spacing={1} height="100vh">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">{name} Transactions</Typography>
            
            <Box>
              <IconButton onClick={handleClose}><Close /></IconButton>
            </Box>
          </Stack>
          <Box>
            <Button onClick={handleMinAmountClick} sx={{ textTransform: 'none', p: 0 }}>Min Amount: {actualMinAmount}</Button>
          </Box>

          <TransactionTable transactions={transactions} minAmount={actualMinAmount} onAmountChange={handleAmountChange} />

        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={handleClose}>Close</Button>
          <Button variant="outlined" disabled={!isDirty} onClick={handleReset}>Reset</Button>
        </Stack>
        </Stack>
      </Drawer>
  );
}
