import { BalanceRowType } from "@/types/finance";
import { Divider, Grid, GridProps, Typography, useTheme } from "@mui/material";
import { Fragment } from "react";

type Props = {
  minAmount: string;
  balances: BalanceRowType[];
};

const DIVIDER_COLOR = 'rgba(255, 255, 255, 0.12)';

const TABLE_CONFIG: Record<string, GridProps> = {
  name: {
    item: true,
    xs: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  date: {
    item: true,
    xs: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  amount: {
    item: true,
    xs: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  overall: {
    item: true,
    xs: 3,
  },
};


export default function TransactionTable({ balances, minAmount }: Props): React.ReactElement { 
  const theme = useTheme();   

  const renderHeaderCell = (text: string) => <Typography p={1} fontWeight="bold" fontSize={14}>{text}</Typography>

  const renderHeader = () => (
    <Grid item xs={12} mt={1} position="sticky" top={0} bgcolor={theme.palette.grey[700]}>
      <Grid container>
        <Grid {...TABLE_CONFIG.name}>{renderHeaderCell('Name')}</Grid>
        <Grid {...TABLE_CONFIG.date}>{renderHeaderCell('Date')}</Grid>
        <Grid {...TABLE_CONFIG.amount}>{renderHeaderCell('Amount')}</Grid>
        <Grid {...TABLE_CONFIG.overall}>{renderHeaderCell('Overall')}</Grid>

        <Grid item xs={12}><Divider /></Grid>
      </Grid>
    </Grid>
  );

  const renderRowCell = (text: string, color?: string) => <Typography p={1} fontSize={14} color={color}>{text}</Typography>

  const getAmountColor = (amount: string) => {
    if (amount === '$0.00') return;

    if (amount.startsWith('-')) return '#FF6962';

    return '#96DD99';
  };

  const getOverallColor = (overall: string) => {
    if (overall !== minAmount) return;
    return theme.palette.info.light;
  };

  const renderRow = (row: BalanceRowType) => (
    <Fragment key={Object.values(row).join('')}>
      <Grid {...TABLE_CONFIG.name}>{renderRowCell(row.name)}</Grid>
      <Grid {...TABLE_CONFIG.date}>{renderRowCell(row.date)}</Grid>
      <Grid {...TABLE_CONFIG.amount}>{renderRowCell(row.amount, getAmountColor(row.amount))}</Grid>
      <Grid id={row.overall} {...TABLE_CONFIG.overall}>{renderRowCell(row.overall, getOverallColor(row.overall))}</Grid>

      <Grid item xs={12}><Divider /></Grid>
    </Fragment>
  );

  return (
    <Grid container overflow="auto">
      {renderHeader()}
      {balances.map(renderRow)}
    </Grid>
  );
}