import Image from 'next/image';
import { motion } from 'framer-motion';

const BLUR_DATA = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Background Image */}
      {/* TODO: replace with official Vano Baby press photo */}
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Vano Baby"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        priority
        placeholder="blur"
        blurDataURL={BLUR_DATA}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.92) 100%)',
          zIndex: 1,
        }}
      />
      {/* Red tint overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 70%, rgba(192,57,43,0.12) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />

      {/* Badge top-left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '100px',
          left: '2.5rem',
          zIndex: 10,
          borderLeft: '3px solid #C0392B',
          paddingLeft: '0.75rem',
        }}
      >
        <span style={{
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#ffffff',
          display: 'block',
          lineHeight: 1.6,
        }}>
          2014 — 2024 · 10 ANS DE RÈGNE
        </span>
      </motion.div>

      {/* Decorative "10" bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-2vw',
          right: '-1vw',
          zIndex: 3,
          fontSize: '28vw',
          fontFamily: 'var(--font-bebas)',
          WebkitTextStroke: '1px rgba(255,255,255,0.5)',
          color: 'transparent',
          opacity: 0.07,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        10
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 2.5rem 5rem' }}>
        {/* VANO */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(4rem, 18vw, 18vw)',
            WebkitTextStroke: '2px #ffffff',
            color: 'transparent',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}
        >
          VANO
        </motion.div>

        {/* BABY */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(4rem, 18vw, 18vw)',
            color: '#C0392B',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}
        >
          BABY
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            marginTop: '1.25rem',
            color: '#999999',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Rappeur béninois · Azéto Gbèdé · Cotonou
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#999', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 2,
            height: 60,
            backgroundColor: '#C0392B',
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  );
}
