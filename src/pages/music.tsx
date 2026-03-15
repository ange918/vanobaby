import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetStaticProps } from 'next';
import PageHero from '@/components/PageHero';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  HeartIcon,
  EllipsisHorizontalIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpotifyArtist {
  name: string;
  followers: { total: number };
  images: { url: string; width: number; height: number }[];
  popularity: number;
  genres: string[];
  external_urls: { spotify: string };
}

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
  album: {
    name: string;
    images: { url: string }[];
    release_date: string;
  };
  external_urls: { spotify: string };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: { url: string }[];
  total_tracks: number;
  external_urls: { spotify: string };
}

interface MusicPageProps {
  artist: SpotifyArtist | null;
  topTracks: SpotifyTrack[];
  albums: SpotifyAlbum[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ARTIST_ID = '6VxXJZxxq0cmpBvbVM8p0E';

const msToDuration = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const formatFollowers = (n: number) =>
  n.toLocaleString('fr-FR') + ' auditeurs';

// ─── Static fallback (used when Spotify API is unavailable) ───────────────────

const STATIC_TRACKS: SpotifyTrack[] = [
  { id: 'f1',  name: "Drague Azonto",       duration_ms: 222000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=1'},{url:'https://picsum.photos/300/300?random=1'},{url:'https://picsum.photos/64/64?random=1'}], release_date: '2013-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f2',  name: "Adigoue Gboun Gboun", duration_ms: 241000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=2'},{url:'https://picsum.photos/300/300?random=2'},{url:'https://picsum.photos/64/64?random=2'}], release_date: '2016-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f3',  name: "Je s'en fou",         duration_ms: 208000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=3'},{url:'https://picsum.photos/300/300?random=3'},{url:'https://picsum.photos/64/64?random=3'}], release_date: '2017-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f4',  name: "Tonssimè chap",       duration_ms: 235000, popularity: 50, preview_url: null, album: { name: 'Feat.', images: [{url:'https://picsum.photos/300/300?random=4'},{url:'https://picsum.photos/300/300?random=4'},{url:'https://picsum.photos/64/64?random=4'}], release_date: '2017-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f5',  name: "Madame",              duration_ms: 252000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=5'},{url:'https://picsum.photos/300/300?random=5'},{url:'https://picsum.photos/64/64?random=5'}], release_date: '2019-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f6',  name: "Bella",               duration_ms: 217000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=6'},{url:'https://picsum.photos/300/300?random=6'},{url:'https://picsum.photos/64/64?random=6'}], release_date: '2019-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f7',  name: "Russie",              duration_ms: 230000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=7'},{url:'https://picsum.photos/300/300?random=7'},{url:'https://picsum.photos/64/64?random=7'}], release_date: '2020-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f8',  name: "Vano wè",             duration_ms: 245000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=8'},{url:'https://picsum.photos/300/300?random=8'},{url:'https://picsum.photos/64/64?random=8'}], release_date: '2020-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f9',  name: "Fitè",                duration_ms: 202000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=9'},{url:'https://picsum.photos/300/300?random=9'},{url:'https://picsum.photos/64/64?random=9'}], release_date: '2021-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
  { id: 'f10', name: "Diyo",                duration_ms: 258000, popularity: 50, preview_url: null, album: { name: 'Single', images: [{url:'https://picsum.photos/300/300?random=10'},{url:'https://picsum.photos/300/300?random=10'},{url:'https://picsum.photos/64/64?random=10'}], release_date: '2022-01-01' }, external_urls: { spotify: 'https://open.spotify.com' } },
];

// ─── Static data (unchanged) ──────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function MusicPage({ artist, topTracks, albums }: MusicPageProps) {
  const displayTracks = topTracks.length > 0 ? topTracks : STATIC_TRACKS;

  const [activeTab, setActiveTab] = useState<Tab>('Tous');
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
    }
  };

  const handleTrackClick = (track: SpotifyTrack) => {
    if (!track.preview_url) {
      window.open(track.external_urls.spotify, '_blank');
      return;
    }

    if (playingTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    stopAudio();

    const audio = new Audio(track.preview_url);
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.play();
    setPlayingTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePrev = () => {
    if (!playingTrack) return;
    const idx = displayTracks.findIndex(t => t.id === playingTrack.id);
    handleTrackClick(displayTracks[(idx - 1 + displayTracks.length) % displayTracks.length]);
  };

  const handleNext = () => {
    if (!playingTrack) return;
    const idx = displayTracks.findIndex(t => t.id === playingTrack.id);
    handleTrackClick(displayTracks[(idx + 1) % displayTracks.length]);
  };

  const handleClose = () => {
    stopAudio();
    setPlayingTrack(null);
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => { stopAudio(); };
  }, []);

  const totalDuration = Math.round(
    displayTracks.reduce((acc, t) => acc + t.duration_ms, 0) / 60000
  );

  const coverUrl = artist?.images?.[0]?.url ?? `https://picsum.photos/232/232?random=99`;
  const artistSpotifyUrl = artist?.external_urls?.spotify ?? 'https://open.spotify.com';

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', paddingBottom: playingTrack ? '72px' : '0' }}>

      {/* RESPONSIVE STYLES */}
      <style>{`
        .mini-player { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem; }
        .mini-player-center { display: flex; }
        .mini-player-right { display: flex; }
        .mini-player-mobile-controls { display: none; }
        .mini-player-volume { display: flex; }
        .mini-player-heart { display: flex; }

        .track-row { display: grid !important; grid-template-columns: 40px 56px 1fr 1fr 80px 50px !important; gap: 0 1rem; align-items: center; }
        .track-col-album { display: block; }
        .track-col-year { display: block; }

        .albums-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

        @media (max-width: 639px) {
          .mini-player { grid-template-columns: 1fr auto; }
          .mini-player-center { display: none; }
          .mini-player-right { gap: 0.6rem; }
          .mini-player-mobile-controls { display: flex; align-items: center; gap: 0.6rem; }
          .mini-player-volume { display: none; }
          .mini-player-heart { display: none; }

          .track-row { grid-template-columns: 32px 44px 1fr 44px !important; }
          .track-col-album { display: none !important; }
          .track-col-year { display: none !important; }

          .albums-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

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
                src={coverUrl}
                alt="Artist cover"
                fill
                sizes="232px"
                style={{ objectFit: 'cover' }}
                unoptimized={coverUrl.startsWith('https://picsum')}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '0.5rem' }}>
                PLAYLIST OFFICIELLE
              </p>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', lineHeight: 1, marginBottom: '0.6rem' }}>
                VANO BABY — TOP TRACKS
              </h2>
              {artist ? (
                <>
                  <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    {formatFollowers(artist.followers.total)}
                  </p>
                  {artist.genres.length > 0 && (
                    <p style={{ color: '#999', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      {artist.genres.slice(0, 3).join(' · ')}
                    </p>
                  )}
                  <p style={{ color: '#999', fontSize: '0.75rem' }}>
                    Popularité : {artist.popularity}/100
                  </p>
                </>
              ) : (
                <p style={{ color: '#999', fontSize: '0.85rem' }}>Azéto Gbèdé Music</p>
              )}
              <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {displayTracks.length} titres · {totalDuration} min
              </p>

              {/* Action row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => displayTracks[0] && handleTrackClick(displayTracks[0])}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    backgroundColor: '#C0392B', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  <PlayIcon style={{ width: 24, height: 24, color: '#fff', marginLeft: '3px' }} />
                </button>
                <span style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>TOUT LIRE</span>
                <a
                  href={artistSpotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    backgroundColor: '#1DB954', color: '#000', fontSize: '0.65rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '0.4rem 0.9rem', borderRadius: '999px',
                    textDecoration: 'none', fontWeight: 700,
                  }}
                >
                  OUVRIR SUR SPOTIFY
                </a>
                <HeartIcon style={{ width: 22, height: 22, color: '#fff', cursor: 'pointer', opacity: 0.7 }} />
                <EllipsisHorizontalIcon style={{ width: 22, height: 22, color: '#fff', cursor: 'pointer', opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div
            className="track-row"
            style={{
              gap: '0 1rem',
              padding: '0.5rem 0.75rem',
              borderBottom: '1px solid #222',
              position: 'sticky',
              top: 0,
              backgroundColor: '#080808',
              zIndex: 10,
              marginBottom: '0.25rem',
            }}
          >
            <span style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>#</span>
            <span style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}></span>
            <span style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>TITRE</span>
            <span className="track-col-album" style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ALBUM</span>
            <span className="track-col-year" style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>DATE</span>
            <span style={{ color: '#999', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>⏱</span>
          </div>

          {/* Track rows */}
          <div>
            {displayTracks.map((track, i) => {
              const isActive = playingTrack?.id === track.id;
              const isHovered = hoveredTrack === track.id;
              const hasPreview = !!track.preview_url;
              const year = track.album.release_date?.slice(0, 4) ?? '';
              const artUrl = track.album.images?.[2]?.url ?? track.album.images?.[0]?.url ?? `https://picsum.photos/64/64?random=${i + 1}`;

              return (
                <motion.div
                  key={track.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleTrackClick(track)}
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  className="track-row"
                  style={{
                    gap: '0 1rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: isHovered ? '#1a1a1a' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* # / equalizer / play icon */}
                  <span style={{ color: '#999', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isActive && isPlaying ? (
                      <EqualizerBars />
                    ) : isHovered ? (
                      <PlayIcon style={{ width: 14, height: 14, color: '#C0392B' }} />
                    ) : (
                      <span style={{ color: isActive ? '#C0392B' : '#999' }}>{i + 1}</span>
                    )}
                  </span>

                  {/* Artwork */}
                  <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={artUrl}
                      alt={track.name}
                      fill
                      sizes="40px"
                      style={{ objectFit: 'cover' }}
                      unoptimized={artUrl.startsWith('https://picsum')}
                    />
                  </div>

                  {/* Title + album name */}
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      color: isActive ? '#C0392B' : '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {track.name}
                      {!hasPreview && (
                        <span title="Ouvrir sur Spotify" style={{ marginLeft: '0.4rem', opacity: 0.5, fontSize: '0.7rem' }}>↗</span>
                      )}
                    </p>
                    <p style={{ color: '#999', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Vano Baby</p>
                  </div>

                  {/* Album name */}
                  <div className="track-col-album" style={{ minWidth: 0 }}>
                    <span style={{
                      color: isHovered ? '#fff' : '#999',
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                      transition: 'color 0.15s',
                    }}>
                      {track.album.name}
                    </span>
                  </div>

                  {/* Year */}
                  <span className="track-col-year" style={{ color: isHovered ? '#fff' : '#999', fontSize: '0.8rem', transition: 'color 0.15s' }}>
                    {year}
                  </span>

                  {/* Duration */}
                  <span style={{ color: isHovered ? '#fff' : '#999', fontSize: '0.8rem', fontFamily: 'monospace', transition: 'color 0.15s' }}>
                    {msToDuration(track.duration_ms)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SINGLES & ALBUMS */}
      {albums.length > 0 && (
        <section style={{ backgroundColor: '#0d0d0d', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
            >
              04 — DISCOGRAPHIE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Singles &amp; Albums
            </motion.h2>
            <div className="albums-grid">
              {albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredAlbum(album.id)}
                  onMouseLeave={() => setHoveredAlbum(null)}
                  onClick={() => window.open(album.external_urls.spotify, '_blank')}
                  style={{
                    backgroundColor: '#161616',
                    border: hoveredAlbum === album.id ? '1px solid #C0392B' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border 0.2s ease',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
                    <Image
                      src={album.images?.[0]?.url ?? `https://picsum.photos/300/300?random=${i + 20}`}
                      alt={album.name}
                      fill
                      sizes="(max-width: 639px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {hoveredAlbum === album.id && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{
                          backgroundColor: '#1DB954', color: '#000', fontSize: '0.6rem',
                          fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                          padding: '0.45rem 0.9rem', borderRadius: '999px',
                        }}>
                          Ouvrir sur Spotify
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem 0.9rem' }}>
                    <p style={{ fontFamily: 'var(--font-bebas)', color: '#fff', fontSize: '0.95rem', letterSpacing: '0.05em', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {album.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#C0392B', fontSize: '0.72rem' }}>
                        {album.release_date.slice(0, 4)}
                      </span>
                      <span style={{
                        backgroundColor: '#222', color: '#999', fontSize: '0.58rem',
                        letterSpacing: '0.06em', padding: '0.15rem 0.45rem', borderRadius: '999px',
                      }}>
                        {album.total_tracks} {album.total_tracks === 1 ? 'titre' : 'titres'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STREAMING PLATFORMS */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            {albums.length > 0 ? '05' : '04'} — STREAMING
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
            {albums.length > 0 ? '06' : '05'} — CLIP OFFICIEL
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
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: 0, left: 0, right: 0,
              backgroundColor: '#111111',
              borderTop: '1px solid #222',
              zIndex: 100,
            }}
          >
            {/* Full-width progress bar */}
            <div style={{ width: '100%', height: '3px', backgroundColor: '#2a2a2a' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#C0392B', transition: 'width 0.1s linear' }} />
            </div>

            <div className="mini-player" style={{ padding: '0 1rem', height: '68px' }}>

              {/* Left: track info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                <div style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image
                    src={playingTrack.album.images?.[1]?.url ?? playingTrack.album.images?.[0]?.url ?? `https://picsum.photos/48/48?random=99`}
                    alt={playingTrack.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {playingTrack.name}
                  </p>
                  <p style={{ color: '#999', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {playingTrack.album.name}
                  </p>
                </div>
                <span className="mini-player-heart" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <HeartIcon style={{ width: 18, height: 18, color: '#999', flexShrink: 0, cursor: 'pointer' }} />
                </span>
              </div>

              {/* Center: controls (desktop only) */}
              <div className="mini-player-center" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <button onClick={handlePrev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <BackwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                  </button>
                  <button
                    onClick={() => {
                      if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
                      else { audioRef.current?.play(); setIsPlaying(true); }
                    }}
                    style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#C0392B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><rect x="2" y="1" width="4" height="12" rx="1" /><rect x="8" y="1" width="4" height="12" rx="1" /></svg>
                    ) : (
                      <PlayIcon style={{ width: 16, height: 16, color: '#fff', marginLeft: '2px' }} />
                    )}
                  </button>
                  <button onClick={handleNext} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <ForwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                  </button>
                </div>
                <div style={{ width: '200px', height: '3px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#C0392B', transition: 'width 0.1s linear' }} />
                </div>
              </div>

              {/* Right: mobile controls + volume (desktop) + spotify link + close */}
              <div className="mini-player-right" style={{ alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <span className="mini-player-mobile-controls">
                  <button onClick={handlePrev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <BackwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                  </button>
                  <button
                    onClick={() => {
                      if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
                      else { audioRef.current?.play(); setIsPlaying(true); }
                    }}
                    style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#C0392B', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><rect x="2" y="1" width="4" height="12" rx="1" /><rect x="8" y="1" width="4" height="12" rx="1" /></svg>
                    ) : (
                      <PlayIcon style={{ width: 16, height: 16, color: '#fff', marginLeft: '2px' }} />
                    )}
                  </button>
                  <button onClick={handleNext} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <ForwardIcon style={{ width: 18, height: 18, color: '#999' }} />
                  </button>
                </span>

                <span className="mini-player-volume" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <SpeakerWaveIcon style={{ width: 18, height: 18, color: '#999', flexShrink: 0 }} />
                  <div style={{ width: '80px', height: '3px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '70%', height: '100%', backgroundColor: '#C0392B' }} />
                  </div>
                </span>

                <a
                  href={playingTrack.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Écouter sur Spotify"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ArrowTopRightOnSquareIcon style={{ width: 18, height: 18, color: '#1DB954' }} />
                </a>

                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <XMarkIcon style={{ width: 20, height: 20, color: '#999' }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Data fetching ─────────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps = async () => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not configured');
    }

    const creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const { access_token } = await tokenRes.json();
    const headers = { Authorization: `Bearer ${access_token}` };

    const [artistRes, topTracksRes, albumsRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}`, { headers }),
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=BJ`, { headers }),
      fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=BJ&limit=20`,
        { headers }
      ),
    ]);

    const [artist, topTracksData, albumsData] = await Promise.all([
      artistRes.json(),
      topTracksRes.json(),
      albumsRes.json(),
    ]);

    return {
      props: {
        artist: artist ?? null,
        topTracks: topTracksData.tracks ?? [],
        albums: albumsData.items ?? [],
      },
      revalidate: 3600,
    };
  } catch {
    return {
      props: { artist: null, topTracks: [], albums: [] },
      revalidate: 3600,
    };
  }
};
