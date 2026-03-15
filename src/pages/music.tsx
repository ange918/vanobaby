import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/PageHero';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  HeartIcon,
  EllipsisHorizontalIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

type TrackType = 'SINGLE' | 'FEAT.';

interface Track {
  id: number;
  title: string;
  type: TrackType;
  year: string;
  duration: string;
}

const tracks: Track[] = [
  { id: 1,  title: "Drague Azonto",       type: "SINGLE", year: "2013", duration: "3:42" },
  { id: 2,  title: "Adigoue Gboun Gboun", type: "SINGLE", year: "2016", duration: "4:01" },
  { id: 3,  title: "Je s'en fou",         type: "SINGLE", year: "2017", duration: "3:28" },
  { id: 4,  title: "Tonssimè chap",       type: "FEAT.",  year: "2017", duration: "3:55" },
  { id: 5,  title: "Madame",              type: "SINGLE", year: "2019", duration: "4:12" },
  { id: 6,  title: "Bella",               type: "SINGLE", year: "2019", duration: "3:37" },
  { id: 7,  title: "Russie",              type: "SINGLE", year: "2020", duration: "3:50" },
  { id: 8,  title: "Vano wè",             type: "SINGLE", year: "2020", duration: "4:05" },
  { id: 9,  title: "Fitè",                type: "SINGLE", year: "2021", duration: "3:22" },
  { id: 10, title: "Diyo",                type: "SINGLE", year: "2022", duration: "4:18" },
  { id: 11, title: "Chéri Coco",          type: "SINGLE", year: "2022", duration: "3:44" },
  { id: 12, title: "Tu mérites tout",     type: "SINGLE", year: "2023", duration: "4:02" },
  { id: 13, title: "Oun mi oun",          type: "FEAT.",  year: "2023", duration: "3:31" },
  { id: 14, title: "Djonou",              type: "SINGLE", year: "2023", duration: "3:58" },
  { id: 15, title: "Yèdèn",              type: "SINGLE", year: "2024", duration: "4:10" },
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

function EqualizerBars() {
  return (
    <span style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          animate={{ scaleY: [0.4, 1, 0.6, 1, 0.3, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'linear' }}
          style={{
            display: 'block',
            width: '3px',
            height: '100%',
            backgroundColor: '#C0392B',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </span>
  );
}

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Tous');
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredTracks = tracks.filter(t => {
    if (activeTab === 'Tous') return true;
    if (activeTab === 'Singles') return t.type === 'SINGLE';
    return t.type === 'FEAT.';
  });

  const handleTrackClick = (track: Track) => {
    if (playingTrack?.id === track.id) {
      setIsPlaying(p => !p);
    } else {
      setPlayingTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (!playingTrack) return;
    const idx = tracks.findIndex(t => t.id === playingTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    setPlayingTrack(prev);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleNext = () => {
    if (!playingTrack) return;
    const idx = tracks.findIndex(t => t.id === playingTrack.id);
    const next = tracks[(idx + 1) % tracks.length];
    setPlayingTrack(next);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleClose = () => {
    setPlayingTrack(null);
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(progressRef.current!); return 100; }
          return p + 0.2;
        });
      }, 60);
    }
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [isPlaying, playingTrack]);

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', paddingBottom: playingTrack ? '72px' : '0' }}>

      {/* HERO */}
      <PageHero
        eyebrow="03 — DISCOGRAPHIE"
        title="La Musique"
        subtitle="10 ans de titres qui ont façonné le rap béninois"
        imageSrc="/page-music.jpg"
        imagePosition="center top"
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
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PLAYLIST */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 2.5rem) clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Playlist header */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '232px', height: '232px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden' }}>
              <Image
                src="https://picsum.photos/232/232?random=99"
                alt="Playlist cover"
                fill
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={BLUR}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.5rem' }}>
                PLAYLIST OFFICIELLE
              </p>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '3.5rem', color: '#ffffff', lineHeight: 1, marginBottom: '0.6rem' }}>
                VANO BABY — 10 ANS
              </h2>
              <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                Azéto Gbèdé Music · 2013–2024
              </p>
              <p style={{ color: '#999', fontSize: '0.8rem' }}>
                15 titres · 52 min
              </p>

              {/* Action row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => handleTrackClick(tracks[0])}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    backgroundColor: '#C0392B', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <PlayIcon style={{ width: 24, height: 24, color: '#fff', marginLeft: '3px' }} />
                </button>
                <span style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>TOUT LIRE</span>
                <HeartIcon style={{ width: 22, height: 22, color: '#fff', cursor: 'pointer', opacity: 0.7 }} />
                <EllipsisHorizontalIcon style={{ width: 22, height: 22, color: '#fff', cursor: 'pointer', opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 56px 1fr 1fr 80px 50px',
            gap: '0 1rem',
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid #222',
            position: 'sticky',
            top: 0,
            backgroundColor: '#080808',
            zIndex: 10,
            marginBottom: '0.25rem',
          }}>
            {['#', '', 'TITRE', 'ALBUM / TYPE', 'DATE', '⏱'].map((h, i) => (
              <span key={i} style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {h}
              </span>
            ))}
          </div>

          {/* Track rows */}
          <div>
            {filteredTracks.map((track) => {
              const isActive = playingTrack?.id === track.id;
              const isHovered = hoveredTrack === track.id;
              return (
                <motion.div
                  key={track.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleTrackClick(track)}
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 56px 1fr 1fr 80px 50px',
                    gap: '0 1rem',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: isHovered ? '#1a1a1a' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* Track number / play icon / equalizer */}
                  <span style={{ color: '#999', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isActive && isPlaying ? (
                      <EqualizerBars />
                    ) : isHovered ? (
                      <PlayIcon style={{ width: 14, height: 14, color: '#C0392B' }} />
                    ) : (
                      <span style={{ color: isActive ? '#C0392B' : '#999' }}>{track.id}</span>
                    )}
                  </span>

                  {/* Artwork */}
                  <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={`https://picsum.photos/40/40?random=${track.id}`}
                      alt={track.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Title + artist */}
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      color: isActive ? '#C0392B' : (isHovered ? '#fff' : '#fff'),
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {track.title}
                    </p>
                    <p style={{ color: '#999', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Vano Baby</p>
                  </div>

                  {/* Type badge */}
                  <div>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: '#222',
                      color: '#999',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '999px',
                    }}>
                      {track.type}
                    </span>
                  </div>

                  {/* Year */}
                  <span style={{ color: isHovered ? '#fff' : '#999', fontSize: '0.8rem', transition: 'color 0.15s' }}>
                    {track.year}
                  </span>

                  {/* Duration */}
                  <span style={{ color: isHovered ? '#fff' : '#999', fontSize: '0.8rem', fontFamily: 'monospace', transition: 'color 0.15s' }}>
                    {track.duration}
                  </span>
                </motion.div>
              );
            })}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayIcon style={{ width: 32, height: 32, color: 'white' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1rem', color: '#ffffff', letterSpacing: '0.1em', textAlign: 'center', padding: '0 1rem' }}>
                VANO BABY — DIYO (CLIP OFFICIEL)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MINI PLAYER */}
      <AnimatePresence>
        {playingTrack && (
          <motion.div
            initial={{ y: 72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 72, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '72px',
              backgroundColor: '#111111',
              borderTop: '1px solid #222',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              padding: '0 1.5rem',
              zIndex: 100,
              gap: '1rem',
            }}
          >
            {/* Left: track info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src={`https://picsum.photos/48/48?random=${playingTrack.id}`}
                  alt={playingTrack.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {playingTrack.title}
                </p>
                <p style={{ color: '#999', fontSize: '0.75rem' }}>Vano Baby</p>
              </div>
              <HeartIcon style={{ width: 18, height: 18, color: '#999', flexShrink: 0, cursor: 'pointer' }} />
            </div>

            {/* Center: controls + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <button onClick={handlePrev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <BackwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                </button>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: '#C0392B', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                      <rect x="2" y="1" width="4" height="12" rx="1" />
                      <rect x="8" y="1" width="4" height="12" rx="1" />
                    </svg>
                  ) : (
                    <PlayIcon style={{ width: 16, height: 16, color: '#fff', marginLeft: '2px' }} />
                  )}
                </button>
                <button onClick={handleNext} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <ForwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                </button>
              </div>
              {/* Progress bar */}
              <div style={{ width: '200px', height: '3px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#C0392B', transition: 'width 0.1s linear' }} />
              </div>
            </div>

            {/* Right: volume + close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <SpeakerWaveIcon style={{ width: 18, height: 18, color: '#999', flexShrink: 0 }} />
              <div style={{ width: '80px', height: '3px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', backgroundColor: '#C0392B' }} />
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <XMarkIcon style={{ width: 20, height: 20, color: '#999' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
