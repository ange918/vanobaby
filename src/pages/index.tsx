import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionBio from '@/components/SectionBio';
import SectionMusic from '@/components/SectionMusic';
import SectionEvents from '@/components/SectionEvents';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SectionBio />
      <SectionMusic />
      <SectionEvents />
      <Footer />
    </main>
  );
}
