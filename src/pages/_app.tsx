import React from "react";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

import "../styles/globals.css";
import { DefaultLayout } from "@/components/DefaultLayout";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <BottomNav />
    </>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
