import { BalanceRowType } from "@/types/finance";
import { Box, Button, Drawer, Link, Stack, Typography } from "@mui/material";
import TransactionTable from "./TransactionTable";

type Props = {
  name: string;
  minAmount: string;
  balances: BalanceRowType[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};


export default function TransactionDrawer({ name, minAmount, balances, open, onOpenChange }: Props): React.ReactElement {    
  const handleClose = () => onOpenChange(false);

  const handleMinAmountClick = () => {
    const amountCell = document.getElementById(minAmount);

    if (!amountCell) {
      return;
    }

    amountCell.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  return (
      <Drawer
        open={open}
        anchor="bottom"
        onClose={handleClose}
      >
        <Stack p={2} spacing={1} height="100vh">
          <Typography variant="h4">{name} Transactions</Typography>
          <Box>
            <Button onClick={handleMinAmountClick} sx={{ textTransform: 'none', p: 0 }}>Min Amount: {minAmount}</Button>
          </Box>

          <TransactionTable balances={balances} minAmount={minAmount} />

        <Box>
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </Box>
        </Stack>
      </Drawer>
  );
}