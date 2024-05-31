import { CreditCardRowType } from "@/types/finance";
import { formatDifference, formatName } from "@/utils/name-formatter";
import { Alert, AlertTitle, Typography } from "@mui/material";

type Props = {
  creditCard: CreditCardRowType;
};

export default function CreditCardProgress({ creditCard }: Props): JSX.Element { 
  const severity = creditCard.difference === "$0.00" ? 'success' : 'warning';

  return (
    <>
        <Alert
          icon={false}
          severity={severity}
          variant="filled"
          sx={{ mx: 0.5, color: "#fff" }}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatName(creditCard.name)}
          </AlertTitle>
          {formatDifference(creditCard.difference)}
        </Alert>
    </>
  );
}