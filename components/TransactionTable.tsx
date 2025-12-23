import { BalanceRowType } from "@/types/finance";
import { Button, Divider, Grid, GridProps, Typography, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import UpdateAmountDrawer from "./UpdateAmountDrawer";

type Props = {
  minAmount: string;
  transactions: BalanceRowType[];
  onAmountChange: (index: number, amount: string) => void
};

const DIVIDER_COLOR = 'rgba(255, 255, 255, 0.12)';

const TABLE_CONFIG: Record<string, GridProps> = {
  name: {
    size: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  date: {
    size: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  amount: {
    size: 3,
    sx: { borderRight: `1px solid ${DIVIDER_COLOR}` }
  },
  overall: {
    size: 3,
  },
};


export default function TransactionTable({ transactions, minAmount, onAmountChange }: Props): React.ReactElement { 
  const theme = useTheme();  
  const [transactionIndex, setTransactionIndex] = useState<number | null>(null);

  const renderHeaderCell = (text: string) => <Typography p={1} fontWeight="bold" fontSize={14}>{text}</Typography>

  const renderHeader = () => (
    <Grid size={12} mt={1} position="sticky" top={0} bgcolor={theme.palette.grey[700]} zIndex={1}>
      <Grid container>
        <Grid {...TABLE_CONFIG.name}>{renderHeaderCell('Name')}</Grid>
        <Grid {...TABLE_CONFIG.date}>{renderHeaderCell('Date')}</Grid>
        <Grid {...TABLE_CONFIG.amount}>{renderHeaderCell('Amount')}</Grid>
        <Grid {...TABLE_CONFIG.overall}>{renderHeaderCell('Overall')}</Grid>

        <Grid size={12}><Divider /></Grid>
      </Grid>
    </Grid>
  );

  const renderRowCell = (text: string, color?: string) => <Typography p={1} fontSize={14} color={color}>{text}</Typography>

  const getAmountColor = (amount: string) => {
    if (amount === '$0.00') return theme.palette.common.white;

    if (amount.startsWith('-')) return '#FF6962';

    return '#96DD99';
  };

  const getOverallColor = (overall: string) => {
    if (overall !== minAmount) return;
    return theme.palette.info.light;
  };

  const renderRow = (row: BalanceRowType, index: number) => (
    <Fragment key={Object.values(row).join('')}>
      <Grid {...TABLE_CONFIG.name}>{renderRowCell(row.name)}</Grid>
      <Grid {...TABLE_CONFIG.date}>{renderRowCell(row.date)}</Grid>
      <Grid {...TABLE_CONFIG.amount}>
        <Button onClick={() => setTransactionIndex(index)} sx={{ p: 0, zIndex: 0 }}>
         {renderRowCell(row.amount, getAmountColor(row.amount))}
        </Button>
      </Grid>
      <Grid id={row.overall} {...TABLE_CONFIG.overall}>{renderRowCell(row.overall, getOverallColor(row.overall))}</Grid>
      <Grid size={12}><Divider /></Grid>
    </Fragment>
  );

  const handleAmountSubmit = (amount: string) => {
    if (transactionIndex !== null)
      onAmountChange(transactionIndex, amount);
  };

  return (
    <Grid container overflow="auto">
      {renderHeader()}
      {transactions.map(renderRow)}

      <UpdateAmountDrawer 
        open={transactionIndex !== null} 
        transaction={transactionIndex === null ? null : transactions[transactionIndex]} 
        onAmountSubmit={handleAmountSubmit} 
        onClose={() => setTransactionIndex(null)} />
    </Grid>
  );
}
