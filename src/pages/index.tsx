import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

const latestTracks = [
  { title: 'Tu mérites tout', year: '2023', seed: 5 },
  { title: 'Diyo', year: '2022', seed: 3 },
  { title: 'Chéri Coco', year: '2021', seed: 4 },
];

const reviews = [
  { name: 'Kouakou A.', city: 'Cotonou', stars: 5, text: 'Vano Baby, c\'est notre fierté ! Chaque sortie est un événement, chaque concert une communion. Un artiste rare.' },
  { name: 'Fatima D.', city: 'Lagos', stars: 5, text: 'Je suis nigériane mais Vano Baby m\'a conquise. Sa musique transcende les frontières, les langues, les cultures.' },
  { name: 'Roméo M.', city: 'Paris', stars: 5, text: 'Même de la diaspora, il nous ramène au Bénin à chaque écoute. Ce que peu d\'artistes réussissent à faire.' },
  { name: 'Adjovi K.', city: 'Abidjan', stars: 5, text: '10 ans au sommet, c\'est du travail, de la discipline et du génie. Respect total pour ce que Vano Baby accomplit.' },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C0392B', fontSize: '0.85rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: '#080808' }}>
      <Hero />

      {/* ─── MINI À PROPOS ─── */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Owl photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderTop: '3px solid #C0392B', borderRadius: '1rem' }}
            >
              <Image
                src="/about-owl.jpg"
                alt="Le hibou, emblème de Vano Baby"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.7) 100%)' }} />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}>
                01 — À PROPOS
              </p>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Le maître de la nuit béninoise
              </h2>
              <p style={{ color: '#999999', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1rem' }}>
                Aurel Sylvanus Adjivon, né le <strong style={{ color: '#fff' }}>9 mai 1994</strong>, s'est imposé en 10 ans comme la voix la plus distincte du rap béninois. Lauréat du MTN Découverte Talents 2014, signé chez Universal Music Africa, fondateur d'<strong style={{ color: '#C0392B' }}>Azéto Gbèdé Music</strong>.
              </p>
              <p style={{ color: '#999999', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2rem' }}>
                Plus de 50 titres, 4 récompenses nationales, et un lien émotionnel rare avec son public — de Cotonou à la diaspora africaine.
              </p>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#C0392B',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.12em',
                  borderBottom: '1px solid rgba(192,57,43,0.3)',
                  paddingBottom: '2px',
                }}
              >
                EN SAVOIR PLUS →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DERNIÈRES SORTIES ─── */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.75rem' }}
              >
                02 — MUSIQUE
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff' }}
              >
                Dernières sorties
              </motion.h2>
            </div>
            <Link
              href="/music"
              style={{ color: '#C0392B', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.1em', fontFamily: 'var(--font-bebas)', borderBottom: '1px solid rgba(192,57,43,0.3)', paddingBottom: '2px' }}
            >
              VOIR TOUT →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestTracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  {/* TODO: replace with official press photo */}
                  <Image
                    src={`https://picsum.photos/600/340?random=${track.seed}`}
                    alt={track.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={BLUR}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                    <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#C0392B' }}>{track.year}</p>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{track.title}</p>
                  <p style={{ color: '#999', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Vano Baby</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCHAIN ÉVÉNEMENT ─── */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.75rem' }}
          >
            03 — ÉVÉNEMENTS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Prochains événements
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: '0.5px solid rgba(192,57,43,0.25)',
            }}
          >
            {/* Background image */}
            <div style={{ position: 'absolute', inset: 0 }}>
              {/* TODO: replace with official event photo */}
              <Image src="https://picsum.photos/1200/500?random=99" alt="Concert" fill style={{ objectFit: 'cover', objectPosition: 'center 40%' }} placeholder="blur" blurDataURL={BLUR} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.97) 50%, rgba(8,8,8,0.4) 100%)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(2.5rem, 5vw, 4rem)' }} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div style={{ display: 'inline-block', backgroundColor: '#C0392B', padding: '0.25rem 0.75rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-bebas)', marginBottom: '1.5rem' }}>
                  CONCERT
                </div>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#ffffff', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                  10 ANS DE RÈGNE
                </h3>
                <p style={{ color: '#C0392B', fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  04 AVRIL 2026
                </p>
                <p style={{ color: '#999999', fontSize: '0.85rem', letterSpacing: '0.05em', marginBottom: '2rem' }}>
                  Cotonou, Bénin — 20H00
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/concert"
                    style={{
                      display: 'inline-block',
                      padding: '0.85rem 2rem',
                      backgroundColor: '#C0392B',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '0.9rem',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Réserver ma place
                  </Link>
                  <Link
                    href="/concert"
                    style={{
                      display: 'inline-block',
                      padding: '0.85rem 2rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '0.9rem',
                      letterSpacing: '0.12em',
                    }}
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>

              {/* Mini countdown digits */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} className="hidden md:flex">
                {[
                  { label: 'Jours', num: '23' },
                  { label: 'Heures', num: '14' },
                  { label: 'Minutes', num: '37' },
                ].map(d => (
                  <div key={d.label} style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#C0392B', lineHeight: 1 }}>{d.num}</p>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#999', textTransform: 'uppercase', marginTop: '0.25rem' }}>{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── AVIS DES AUDITEURS ─── */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.75rem' }}
          >
            04 — FANS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Ce que disent les auditeurs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '0.5px solid rgba(255,255,255,0.06)',
                  borderLeft: '3px solid #C0392B',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                }}
              >
                <Stars count={review.stars} />
                <p style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  color: '#dddddd',
                  fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
                  lineHeight: 1.75,
                  marginBottom: '1.25rem',
                }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C0392B' }} />
                  <p style={{ color: '#999999', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {review.name} — {review.city}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
