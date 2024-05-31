import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { FinanceDataType } from "@/types/finance";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const res = await axios.get(`${process.env.BASE_API_URL}/api/finances`);
  return { props: { data: res.data } }
});

export default function Home({ data } : { data: FinanceDataType }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {JSON.stringify(data)}
    </main>
  );
}
