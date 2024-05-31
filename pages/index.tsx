import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { FinanceDataType } from "@/types/finance";
import { Container, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import CreditCardProgress from "@/components/CreditCardProgress";
import MinimumBalance from "@/components/MinimumBalance";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/api/finances`);
  return { props: { data: res.data } }
});

export default function Home({ data } : { data: FinanceDataType }) {
  return (
    <Container>
      <Stack spacing={1} py={2}>
        {data.creditCards.map(cc => <CreditCardProgress key={cc.name} creditCard={cc} />)}
      </Stack>

      <Grid container>
        <Grid item xs={4} alignItems="center">
          <MinimumBalance name="Joint" balances={data.joint} />
        </Grid>

        <Grid item xs={4} alignItems="center">
          <MinimumBalance name="Personal" balances={data.personal} />
        </Grid>

        <Grid item xs={4} alignItems="center">
          <MinimumBalance name="Mother" balances={data.mother} />
        </Grid>

      </Grid>
    </Container>
  );
}
