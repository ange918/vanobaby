import About from '@/components/About';
import OwlIcon from '@/components/OwlIcon';
import { motion } from 'framer-motion';

const awards = [
  { year: '2014', title: 'MTN Découverte Talents', desc: 'Vainqueur national — 5 millions FCFA' },
  { year: '2018', title: 'Universal Music Africa', desc: 'Signature & reconnaissance internationale' },
  { year: '2021', title: 'Bénin Top 10 Awards', desc: 'Meilleur artiste béninois' },
  { year: '2022', title: 'Bénin Top 10 Awards', desc: '2e consécration nationale' },
  { year: '2023', title: 'Bénin Top 10 Awards', desc: '3e titre consécutif' },
  { year: '2023', title: 'Ambassadeur Betclic', desc: 'Partenariat national de rayonnement' },
];

const quotes = [
  { text: '"Vano Baby redéfinit les codes du rap west-africain avec une sincérité désarmante."', source: 'Jeune Afrique Music' },
  { text: '"Sa capacité à traverser les générations fait de lui une figure unique dans le paysage musical béninois."', source: 'Africiné Magazine' },
  { text: "\u201cAzéto Gbèdé n\u2019est pas un artiste \u2014 c\u2019est un mouvement.\u201d", source: 'Bénin Culture Today' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <About />

      {/* L'EMBLÈME DU HIBOU */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '2rem' }}
          >
            02 — EMBLÈME
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
          >
            <OwlIcon size={200} animated />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: '1.5rem' }}
          >
            L'emblème du hibou
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: '#999999', lineHeight: 1.9, fontSize: '0.95rem' }}
          >
            Le hibou, totem de l'artiste, incarne la <strong style={{ color: '#fff' }}>sagesse ancestrale</strong>, la vision nocturne et la maîtrise de la nuit. Comme lui, Vano Baby voit ce que les autres ne voient pas — il transforme l'obscurité en lumière, le quotidien en art, et la rue en légende. L'Azéto Gbèdé est le maître de la nuit béninoise.
          </motion.p>
        </div>
      </section>

      {/* RÉCOMPENSES */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            03 — RÉCOMPENSES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Une décennie de reconnaissances
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, i) => (
              <motion.div
                key={`${award.year}-${award.title}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  backgroundColor: '#111111',
                  borderTop: '2px solid #C0392B',
                  padding: '1.5rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: '#C0392B', lineHeight: 1, marginBottom: '0.5rem' }}>
                  {award.year}
                </p>
                <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  {award.title}
                </p>
                <p style={{ color: '#999999', fontSize: '0.78rem', lineHeight: 1.5 }}>
                  {award.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CITATIONS PRESSE */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem', textAlign: 'center' }}
          >
            04 — PRESSE
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  borderLeft: `4px solid ${i % 2 === 0 ? '#C0392B' : 'rgba(255,255,255,0.15)'}`,
                  paddingLeft: '2rem',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  color: i % 2 === 0 ? '#ffffff' : '#C0392B',
                  lineHeight: 1.5,
                  marginBottom: '0.75rem',
                }}>
                  {q.text}
                </p>
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: '#999', textTransform: 'uppercase' }}>
                  — {q.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
