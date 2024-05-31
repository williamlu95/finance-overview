import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return  ( 
  <ThemeProvider theme={createTheme()}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>);
}
