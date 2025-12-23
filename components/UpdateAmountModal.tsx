import { BalanceRowType } from "@/types/finance";
import { Button, Modal, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
    open: boolean;
    transaction: BalanceRowType | null;
    onAmountSubmit: (amount: string) => void;
    onClose: () => void;
}

export default function UpdateAmountModal({ open, transaction, onClose, onAmountSubmit }: Props) {
  const theme = useTheme();
  const [amount, setAmount] = useState(transaction?.amount || '$0.00');

  useEffect(() => {
    setAmount(transaction?.amount || '$0.00');
  }, [transaction])
  
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }

  const handleAmountSubmit = () => {
    onAmountSubmit(amount);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} hideBackdrop>
      <Stack justifyContent="end" height="100%">
        <Stack p={2} spacing={2} bgcolor={theme.palette.background.default}>
          <Stack>
            <Typography variant="h6">Update {transaction?.name}</Typography>
            <Typography>{transaction?.date}</Typography>
          </Stack>

          <TextField value={amount} onChange={handleAmountChange}/>

          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleAmountSubmit}>Update</Button>
            <Button onClick={onClose} variant="outlined">Cancel</Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}
