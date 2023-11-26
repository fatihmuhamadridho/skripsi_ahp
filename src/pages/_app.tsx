import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/nprogress/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 6 * 1000,
      },
    },
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <NavigationProgress />
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}