import type { AppProps } from 'next/app';
import { Bebas_Neue, Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import '@/styles/globals.css';
import CustomCursor from '@/components/CustomCursor';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${bebasNeue.variable} ${playfairDisplay.variable}`}>
      <Head>
        <title>Vano Baby — 10 Ans de Règne</title>
        <meta name="description" content="Vano Baby, rappeur béninois. Azéto Gbèdé. 10 ans de carrière, 2014–2024. Découvrez la musique, la biographie et les événements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Vano Baby — 10 Ans de Règne" />
        <meta property="og:description" content="Le pionnier du rap béninois intergénérationnel. 10 ans de règne." />
        <meta property="og:type" content="website" />
      </Head>
      <CustomCursor />
      <Component {...pageProps} />
    </div>
  );
}
