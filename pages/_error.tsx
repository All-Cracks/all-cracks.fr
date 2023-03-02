import config from 'lib/config';
import Head from 'next/head';
import React from 'react';

export default function Error() {
  return (
    <>
      <Head>
        <title>{'404' + config.titleSufix}</title>
      </Head>
      <div className="absolute right-1/2 top-1/2 flex flex-auto -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center py-10 text-center sm:flex-row">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:mr-6 sm:border-r sm:border-slate-900/10 sm:pr-6 sm:text-3xl sm:dark:border-slate-300/10">
          404
        </h1>
        <h2 className="mt-2 text-lg text-slate-700 dark:text-slate-400 sm:mt-0">Cette page n&apos;éxiste pas.</h2>
      </div>
    </>
  );
}
