import { BalanceRowType } from "@/types/finance";
import { formatToDollars } from "@/utils/currency-formatter";
import { Button, Drawer, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { NumberFormatBase, NumberFormatValues } from "react-number-format";

type Props = {
    open: boolean;
    transaction: BalanceRowType | null;
    onAmountSubmit: (amount: string) => void;
    onClose: () => void;
}

export default function UpdateAmountDrawer({ open, transaction, onClose, onAmountSubmit }: Props) {
  const theme = useTheme();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(0);
  }, [transaction]);
  
  const handleAmountChange = (values: NumberFormatValues) => {
    setAmount(Number(values.value));
  }

  const handleAmountSubmit = () => {
    onAmountSubmit(formatToDollars(amount / 100));
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="bottom">
      <Stack justifyContent="end" height="100%">
        <Stack p={2} spacing={2} bgcolor={theme.palette.background.default}>
          <Stack>
            <Typography variant="h6">Update {transaction?.name}</Typography>
            <Typography>{transaction?.date}</Typography>
          </Stack>

          <NumberFormatBase value={amount} customInput={TextField} onValueChange={handleAmountChange} format={(value) => formatToDollars(Number(value) / 100)} />

          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleAmountSubmit}>Update</Button>
            <Button onClick={onClose} variant="outlined">Cancel</Button>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
}
