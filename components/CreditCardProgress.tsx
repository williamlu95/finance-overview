import { CreditCardRowType } from "@/types/finance";
import { formatDifference, formatName } from "@/utils/name-formatter";
import { Alert, AlertTitle, Typography } from "@mui/material";

type Props = {
  creditCard: CreditCardRowType;
};

export default function CreditCardProgress({ creditCard }: Props): JSX.Element { 
  const severity = creditCard.difference === "$0.00" ? '#395D42' : '#BF8211';
// #AB161A for negative balance

  return (
    <>
        <Alert
          icon={false}
          variant="filled"
          sx={{ mx: 0.5, color: "#fff", bgcolor: severity }}
        >
          <AlertTitle noWrap sx={{ mb: 0 }}>
            {formatName(creditCard.name)}
          </AlertTitle>
          {formatDifference(creditCard.difference)}
        </Alert>
    </>
  );
}