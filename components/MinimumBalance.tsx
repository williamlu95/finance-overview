import { BalanceRowType } from "@/types/finance";
import { formatFromDollars, formatToDollars } from "@/utils/currency-formatter";
import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  balances: BalanceRowType[];
};

export default function MinimumBalance({ name, balances }: Props): JSX.Element { 
  const minBalance = Math.min(...balances.map(b => formatFromDollars(b.overall)));
  const minDate = balances.find(b => formatFromDollars(b.overall) === minBalance)?.date;
  const color = minBalance >= 0 ? 'green' : 'error';

  return (
    <Paper sx={{ mx: 0.5 }}>
      <Stack alignItems="center" py={1}>
        <Typography variant="body1">
          {name} {`(${minDate})`}
        </Typography>
        <Typography variant="body1" color={color}>
          {formatToDollars(minBalance)}
        </Typography>
      </Stack>
    </Paper>
  );
}