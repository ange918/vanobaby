import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Discography from '@/components/Discography';
import Concert from '@/components/Concert';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#080808' }}>
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Discography />
      <Concert />
      <Footer />
    </main>
  );
}
