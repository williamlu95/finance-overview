import { formatDifference, formatName } from "@/utils/name-formatter";
import { Alert, AlertTitle, SxProps, Theme } from "@mui/material";
import { BalanceRowType } from "@/types/finance";

type Props = {
  balance: BalanceRowType;
  sx?: SxProps<Theme>;
};

export default function SockDrawerCard({ balance, sx = {} }: Props): JSX.Element { 
  const getSeverity = () => {
    if (balance.amount === '$0.00') return '#AB161A';
    
    return '#395D42';
  }

  return (
    <>
        <Alert
          icon={false}
          variant="filled"
          sx={{ mx: 0.5, color: "#fff", bgcolor: getSeverity(), ...sx }}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatName(balance.name)}
          </AlertTitle>
          {formatDifference(balance.amount)}
        </Alert>
    </>
  );
}