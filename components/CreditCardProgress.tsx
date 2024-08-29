import { CreditCardRowType } from "@/types/finance";
import { formatDifference, formatName } from "@/utils/name-formatter";
import { Alert, AlertTitle, SxProps, Theme } from "@mui/material";

type Props = {
  creditCard: CreditCardRowType;
  sx?: SxProps<Theme>;
};

export default function CreditCardProgress({ creditCard, sx = {} }: Props): JSX.Element { 
  const getSeverity = () => {
    if (creditCard.difference === '$0.00') return '#395D42';
    
    if (creditCard.difference.startsWith('-')) return '#AB161A';

    return '#BF8211';
  }

  return (
    <>
        <Alert
          icon={false}
          variant="filled"
          sx={{ mx: 0.5, color: "#fff", bgcolor: getSeverity(), ...sx }}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatName(creditCard.name)}
          </AlertTitle>
          {formatDifference(creditCard.difference)}
        </Alert>
    </>
  );
}