import { Inter } from "next/font/google";
import axios from "axios";
import { CreditCardRowType, FinanceDataType } from "@/types/finance";
import { Container, Grid, Stack } from "@mui/material";
import CreditCardProgress from "@/components/CreditCardProgress";
import MinimumBalance from "@/components/MinimumBalance";
import { JOINT_CREDIT_CARD } from "@/constants/credit-card";
import LastSyncedAts from "@/components/LastSyncedAts";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/api/finances`);
  return { props: { data: res.data } }
});

const getColumnLength = (data: unknown[], index: number) => {
  const hasOneExtra = data.length % 3 === 1;
  const hasTwoExtra = data.length % 3 === 2;

    if (hasOneExtra && index === 0) {
      return 12;
    }

    if (hasTwoExtra && [0, 1].includes(index)) {
      return 6;
    }

    return 4;
}

const SYNCED_AT_URL: Record<string, string> = {
  wallet: 'https://web.budgetbakers.com/dashboard',
  sofi: 'https://www.sofi.com/',
  teller: 'http://192.168.0.39:8001/'
};

export default function Home({ data } : { data: FinanceDataType }) {
  const personalCards: CreditCardRowType[] = data.creditCards.filter(cc => !Object.values(JOINT_CREDIT_CARD).includes(cc.name));
  const jointCards: CreditCardRowType[] = [...data.creditCards.filter(cc => Object.values(JOINT_CREDIT_CARD).includes(cc.name)), data.food];



  return (
    <Container>
      <Stack height="100vh" justifyContent="center" spacing={3}>
        <Grid container rowGap={1}>
            <Grid size={12} ml={0.5}>Personal</Grid>

            {personalCards.map((cc, index) => (
              <Grid size={getColumnLength(personalCards, index)} key={cc.name}>
                <CreditCardProgress creditCard={cc} />
              </Grid>
            ))}
        </Grid>

        <Grid container rowGap={1}>
            <Grid size={12} ml={0.5}>Joint</Grid>

            {jointCards.map((cc) => (
              <Grid size={4} key={cc.name}>
                <CreditCardProgress creditCard={cc} />
              </Grid>
            ))}
        </Grid>

        <Grid container>
          <Grid size={12} ml={0.5} mb={1}>Minimum</Grid>

          <Grid size={12} alignItems="center">
            <MinimumBalance name="Joint" balances={data.joint} />
          </Grid>

          <Grid size={6} alignItems="center">
            <MinimumBalance name="Personal" balances={data.personal} />
          </Grid>

          <Grid size={6} alignItems="center">
            <MinimumBalance name="Mother" balances={data.mother} />
          </Grid>
        </Grid>

        <Grid container rowGap={1}>
            <Grid size={12} ml={0.5}>Last Synced At</Grid>

            {data.syncs.map((sync, index) => (
              <Grid size={getColumnLength(data.syncs,index)} key={sync.source}>
                <LastSyncedAts sync={sync} url={SYNCED_AT_URL[sync.source]} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
}
