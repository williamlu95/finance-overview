import { Inter } from "next/font/google";
import axios from "axios";
import { CreditCardRowType, FinanceDataType } from "@/types/finance";
import { Container, Grid, Stack } from "@mui/material";
import CreditCardProgress from "@/components/CreditCardProgress";
import MinimumBalance from "@/components/MinimumBalance";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/api/finances`);
  return { props: { data: res.data } }
});

export default function Home({ data } : { data: FinanceDataType }) {
  const cards: CreditCardRowType[] = [...data.creditCards, data.food];

  return (
    <Container>
      <Stack height="100vh" justifyContent="center" spacing={3}>
        <Grid container rowGap={1}>
            <Grid xs={12} item ml={0.5}>Balances</Grid>

            {cards.map((cc) => (
              <Grid item xs={4} key={cc.name}>
                <CreditCardProgress creditCard={cc} />
              </Grid>
            ))}
        </Grid>

        <Grid container rowGap={1}>
          <Grid xs={12} item ml={0.5} mb={1}>Minimum</Grid>

          <Grid item xs={12} alignItems="center">
            <MinimumBalance name="Joint" balances={data.joint} />
          </Grid>

          <Grid item xs={12} alignItems="center">
            <MinimumBalance name="Personal" balances={data.personal} />
          </Grid>

          <Grid item xs={12} alignItems="center">
            <MinimumBalance name="Mother" balances={data.mother} />
          </Grid>
          

        </Grid>
      </Stack>
    </Container>
  );
}
