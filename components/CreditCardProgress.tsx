import { CreditCardRowType } from "@/types/finance";
import { LinearProgress, Stack, Typography } from "@mui/material";

type Props = {
  creditCard: CreditCardRowType;
};

export default function CreditCardProgress({ creditCard }: Props): JSX.Element { 
  const color = creditCard.difference === "$0.00" ? 'success' : 'warning';
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">
          {creditCard.name}
        </Typography>
        <Typography variant="body1">
          {creditCard.difference}
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={100} color={color} />
    </>
  );
}