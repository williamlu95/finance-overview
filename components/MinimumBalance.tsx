import { BalanceRowType } from "@/types/finance";
import { formatFromDollars, formatToDollars } from "@/utils/currency-formatter";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import TransactionDrawer from "./TransactionDrawer";

type Props = {
  name: string;
  balances: BalanceRowType[];
};

export default function MinimumBalance({ name, balances }: Props): JSX.Element { 
  const [balanceDrawerOpen, setBalanceDrawerOpen] = useState(false);
  const minBalance = Math.min(...balances.map(b => formatFromDollars(b.overall)));
  const minDate = balances.find(b => formatFromDollars(b.overall) === minBalance)?.date;
  const color = minBalance >= 0 ? 'green' : 'error';

  const handleOpenChange = (open: boolean) => setBalanceDrawerOpen(open);

  const handleDrawerOpen = () => setBalanceDrawerOpen(true);

  return (
    <>
      <Button onClick={handleDrawerOpen} fullWidth sx={{ p: '4px', textTransform: 'unset' }}>
        <Paper sx={{ width: '100%' }}>
            <Stack alignItems="center" py={1}>
              <Typography variant="body1">
                {name} {`(${minDate})`}
              </Typography>
              <Typography variant="body1" color={color}>
                {formatToDollars(minBalance)}
              </Typography>
            </Stack>
        </Paper>
      </Button>


      <TransactionDrawer name={name} balances={balances} minAmount={formatToDollars(minBalance)} open={balanceDrawerOpen} onOpenChange={handleOpenChange} />
    </>
  );
}