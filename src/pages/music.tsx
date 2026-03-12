import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

type TrackType = 'single' | 'collab';

const tracks: { title: string; year: string; seed: number; type: TrackType }[] = [
  { title: 'Madame', year: '2019', seed: 1, type: 'single' },
  { title: 'Fitè', year: '2020', seed: 2, type: 'single' },
  { title: 'Diyo', year: '2022', seed: 3, type: 'single' },
  { title: 'Chéri Coco', year: '2021', seed: 4, type: 'single' },
  { title: 'Tu mérites tout', year: '2023', seed: 5, type: 'single' },
  { title: 'Russie', year: '2018', seed: 6, type: 'collab' },
  { title: "Je s'en fou", year: '2017', seed: 7, type: 'single' },
  { title: 'Bella', year: '2020', seed: 8, type: 'collab' },
  { title: 'Vano wè', year: '2016', seed: 9, type: 'single' },
  { title: 'Drague Azonto', year: '2013', seed: 10, type: 'single' },
];

const platforms = [
  { name: 'Spotify', icon: '♫' },
  { name: 'Apple Music', icon: '♪' },
  { name: 'YouTube Music', icon: '▶' },
  { name: 'Deezer', icon: '≋' },
  { name: 'Audiomack', icon: '◈' },
  { name: 'Boomplay', icon: '◉' },
];

const tabs = ['Tous', 'Singles', 'Collaborations'] as const;
type Tab = typeof tabs[number];

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Tous');
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const filtered = tracks.filter(t => {
    if (activeTab === 'Tous') return true;
    if (activeTab === 'Singles') return t.type === 'single';
    return t.type === 'collab';
  });

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>

      {/* HERO */}
      <PageHero
        eyebrow="03 — DISCOGRAPHIE"
        title="La Musique"
        subtitle="10 ans de titres qui ont façonné le rap béninois"
        seed={80}
      />

      {/* Filter tabs */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4rem) clamp(1.25rem, 5vw, 2.5rem) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: activeTab === tab ? '#C0392B' : 'transparent',
                  color: activeTab === tab ? '#ffffff' : '#999999',
                  border: `1px solid ${activeTab === tab ? '#C0392B' : 'rgba(255,255,255,0.12)'}`,
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 2.5rem) clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((track, i) => (
              <motion.div
                key={track.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredTrack(track.seed)}
                onMouseLeave={() => setHoveredTrack(null)}
                style={{
                  backgroundColor: '#111111',
                  border: hoveredTrack === track.seed ? '2px solid #C0392B' : '0.5px solid rgba(255,255,255,0.08)',
                  transition: 'border 0.25s ease, transform 0.25s ease',
                  transform: hoveredTrack === track.seed ? 'scale(1.03)' : 'scale(1)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
                  {/* TODO: replace with official press photo */}
                  <Image
                    src={`https://picsum.photos/300/300?random=${track.seed}`}
                    alt={track.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={BLUR}
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(192,57,43,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hoveredTrack === track.seed ? 1 : 0, transition: 'opacity 0.25s ease' }}>
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="23" stroke="white" strokeWidth="1.5" />
                      <path d="M20 16l14 8-14 8V16z" fill="white" />
                    </svg>
                  </div>
                </div>
                <div style={{ padding: '0.9rem 1.1rem' }}>
                  <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{track.title}</p>
                  <p style={{ color: '#C0392B', fontSize: '0.7rem', letterSpacing: '0.05em', fontFamily: 'var(--font-bebas)' }}>{track.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STREAMING PLATFORMS */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            04 — STREAMING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            Disponible sur toutes les plateformes
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onMouseEnter={() => setHoveredPlatform(p.name)}
                onMouseLeave={() => setHoveredPlatform(null)}
                style={{
                  backgroundColor: '#161616',
                  border: hoveredPlatform === p.name ? '1px solid #C0392B' : '1px solid rgba(255,255,255,0.06)',
                  padding: '1.25rem 1rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'border 0.2s ease',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.icon}</div>
                <p style={{ color: '#ffffff', fontSize: '0.72rem', letterSpacing: '0.05em' }}>{p.name}</p>
                <p style={{ color: '#C0392B', fontSize: '0.7rem', marginTop: '0.4rem' }}>→</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CLIP VIDÉO */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            05 — CLIP OFFICIEL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: '2.5rem' }}
          >
            Diyo — Clip Officiel
          </motion.h2>
          {/* TODO: replace with official YouTube embed URL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1rem', color: '#ffffff', letterSpacing: '0.1em', textAlign: 'center', padding: '0 1rem' }}>
                VANO BABY — DIYO (CLIP OFFICIEL)
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
