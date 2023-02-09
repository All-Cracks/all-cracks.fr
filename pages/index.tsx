import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="text-red-500 text-xl font-bold">
        A simple nextjs template by <span className="underline">Konixy</span>
      </div>
    </>
  );
}
