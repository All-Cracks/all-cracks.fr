import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v6.2.0/css/pro.min.css" />
        <link rel="icon" type="image/x-icon" href="@/public/assets/favicon.ico" />
        {/** Cloudflare Web Analytics */}
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "d4ee165fc9e34805ab94f1ffff8124f8"}'></script>
        {/** End Cloudflare Web Analytics */}
      </Head>
      <body className="bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
