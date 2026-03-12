import Timeline from '@/components/Timeline';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

const eras = [
  {
    period: '2013 — 2017',
    label: 'RAP BRUT',
    desc: 'Énergie de rue, flow percutant. Les premières années forgent un style authentique ancré dans le quotidien de Cotonou.',
    width: 33,
  },
  {
    period: '2018 — 2019',
    label: 'TRANSITION',
    desc: "Signature internationale, ouverture stylistique. L'artiste explore de nouveaux horizons sonores.",
    width: 20,
  },
  {
    period: '2020 — 2024',
    label: 'SON MÉLODIQUE',
    desc: 'Maturité artistique, mélodies envoûtantes, textes profonds. Vano Baby touche un public toujours plus large.',
    width: 47,
  },
];

const labels = [
  { name: 'MTN BÉNIN', role: 'Partenaire découverte', year: '2014' },
  { name: 'UNIVERSAL MUSIC AFRICA', role: 'Label international', year: '2018' },
  { name: 'RED LINE RECORDS', role: 'Label actuel', year: '2020' },
];

export default function CareerPage() {
  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }}>

      {/* HERO */}
      <PageHero
        eyebrow="02 — CARRIÈRE"
        title="10 Ans de Règne"
        subtitle="Une ascension implacable, une décennie de musique béninoise"
        seed={70}
      />

      <Timeline />

      {/* ÉVOLUTION DU SON */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            03 — ÉVOLUTION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            L'évolution du son
          </motion.h2>

          <div style={{ display: 'flex', gap: '4px', height: 12, marginBottom: '3rem', overflow: 'hidden', borderRadius: '2px' }}>
            {eras.map((era, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: 'easeOut' }}
                style={{
                  width: `${era.width}%`,
                  backgroundColor: i === 1 ? 'rgba(192,57,43,0.4)' : '#C0392B',
                  transformOrigin: 'left',
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eras.map((era, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#999', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{era.period}</p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', color: '#C0392B', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>{era.label}</p>
                <p style={{ color: '#999999', fontSize: '0.82rem', lineHeight: 1.7 }}>{era.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LABELS & PARTENARIATS */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            04 — LABELS & PARTENARIATS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Des partenaires de confiance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labels.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={{ backgroundColor: '#161616', border: '0.5px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem', textAlign: 'center' }}
              >
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#ffffff', letterSpacing: '0.06em', lineHeight: 1.2, marginBottom: '0.75rem' }}>{label.name}</p>
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label.role}</p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', color: '#C0392B' }}>{label.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
