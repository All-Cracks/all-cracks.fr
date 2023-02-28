import React from 'react';
import Header from 'components/Header';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'lib/gameContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>All-Cracks.fr</title>
      </Head>
      <Provider>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
