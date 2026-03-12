import type { AppProps } from 'next/app';
import { Bebas_Neue, Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import '@/styles/globals.css';
import CustomCursor from '@/components/CustomCursor';
import IntroLoader from '@/components/IntroLoader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  const router = useRouter();

  return (
    <div className={`${bebasNeue.variable} ${playfairDisplay.variable}`}>
      <Head>
        <title>Vano Baby — 10 Ans de Règne</title>
        <meta name="description" content="Vano Baby, rappeur béninois. Azéto Gbèdé. 10 ans de carrière, 2014–2024." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Vano Baby — 10 Ans de Règne" />
        <meta property="og:description" content="Le pionnier du rap béninois intergénérationnel. 10 ans de règne." />
        <meta property="og:type" content="website" />
      </Head>
      <CustomCursor />
      <IntroLoader />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
