import { Inter } from "next/font/google";
import axios from "axios";
import { CreditCardRowType, FinanceDataType } from "@/types/finance";
import { Container, Grid, Stack } from "@mui/material";
import CreditCardProgress from "@/components/CreditCardProgress";
import MinimumBalance from "@/components/MinimumBalance";
import { JOINT_CREDIT_CARD, SOCK_DRAWER_CARDS } from "@/constants/credit-card";
import SockDrawerCard from "@/components/SockDrawerCard";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/api/finances`);
  return { props: { data: res.data } }
});

export default function Home({ data } : { data: FinanceDataType }) {
  const personalCards: CreditCardRowType[] = data.creditCards.filter(cc => !Object.values(JOINT_CREDIT_CARD).includes(cc.name));
  const jointCards: CreditCardRowType[] = [...data.creditCards.filter(cc => Object.values(JOINT_CREDIT_CARD).includes(cc.name)), data.food];
  const hasOneExtra = personalCards.length % 3 === 1;
  const hasTwoExtra = personalCards.length % 3 === 2;
  const sockDrawerCards = data.personal.filter(cc => Object.values(SOCK_DRAWER_CARDS).includes(cc.name));

  const getColumnLength = (index: number) => {
    if (hasOneExtra && index === 0) {
      return 12;
    }

    if (hasTwoExtra && [0, 1].includes(index)) {
      return 6;
    }

    return 4;
  }

  return (
    <Container>
      <Stack height="100vh" justifyContent="center" spacing={3}>
        <Grid container rowGap={1}>
            <Grid xs={12} item ml={0.5}>Personal</Grid>

            {personalCards.map((cc, index) => (
              <Grid item xs={getColumnLength(index)} key={cc.name}>
                <CreditCardProgress creditCard={cc} />
              </Grid>
            ))}
        </Grid>

        <Grid container rowGap={1}>
            <Grid xs={12} item ml={0.5}>Joint</Grid>

            {jointCards.map((cc) => (
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

          <Grid item xs={6} alignItems="center">
            <MinimumBalance name="Personal" balances={data.personal} />
          </Grid>

          <Grid item xs={6} alignItems="center">
            <MinimumBalance name="Mother" balances={data.mother} />
          </Grid>
          

        </Grid>

        <Grid container rowGap={1}>
          <Grid xs={12} item ml={0.5} mb={1}>Sock Drawer Cards</Grid>

          {sockDrawerCards.map((cc) => (
              <Grid item xs={4} key={cc.name}>
                <SockDrawerCard balance={cc} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
}
