import Head from "next/head";
import type { ReactNode } from "react";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Restaurant List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">{children}</main>
    </>
  );
};
