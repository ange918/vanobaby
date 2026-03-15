import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const BLUR_DATA = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

const tracks = [
  { title: 'Madame', year: '2019', seed: 1 },
  { title: 'Fitè', year: '2020', seed: 2 },
  { title: 'Diyo', year: '2022', seed: 3 },
  { title: 'Chéri Coco', year: '2021', seed: 4 },
  { title: 'Tu mérites tout', year: '2023', seed: 5 },
  { title: 'Russie', year: '2018', seed: 6 },
  { title: "Je s'en fou", year: '2017', seed: 7 },
  { title: 'Bella', year: '2020', seed: 8 },
  { title: 'Vano wè', year: '2016', seed: 9 },
  { title: 'Drague Azonto', year: '2013', seed: 10 },
];

function TrackCard({ track, index }: { track: typeof tracks[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#111111',
        border: hovered ? '2px solid #C0392B' : '0.5px solid rgba(255,255,255,0.08)',
        transition: 'border 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
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
          blurDataURL={BLUR_DATA}
        />

        {/* Play overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(192,57,43,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          <PlayCircleIcon style={{ width: 56, height: 56, color: 'white' }} />
        </div>
      </div>

      <div style={{ padding: '1rem 1.25rem' }}>
        <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
          {track.title}
        </p>
        <p style={{ color: '#C0392B', fontSize: '0.75rem', letterSpacing: '0.05em', fontFamily: 'var(--font-bebas)' }}>
          {track.year}
        </p>
      </div>
    </motion.div>
  );
}

export default function Discography() {
  return (
    <section
      id="music"
      style={{ backgroundColor: '#080808', padding: '8rem 2.5rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C0392B',
            marginBottom: '1rem',
          }}
        >
          03 — DISCOGRAPHIE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: '#ffffff',
            marginBottom: '4rem',
          }}
        >
          Les titres qui ont marqué une décennie
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tracks.map((track, i) => (
            <TrackCard key={track.title} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
