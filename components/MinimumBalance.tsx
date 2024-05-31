import { BalanceRowType } from "@/types/finance";
import { formatFromDollars, formatToDollars } from "@/utils/currency-formatter";
import { Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  balances: BalanceRowType[];
};

export default function MinimumBalance({ name, balances }: Props): JSX.Element { 
  const minBalance = Math.min(...balances.map(b => formatFromDollars(b.overall)));
  const color = minBalance >= 0 ? 'green' : 'error';

  return (
    <>
      <Stack alignItems="center">
        <Typography variant="body1">
          {name}
        </Typography>
        <Typography variant="body1" color={color}>
          {formatToDollars(minBalance)}
        </Typography>
      </Stack>
    </>
  );
}