import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imagePosition?: string;
}

export default function PageHero({ eyebrow, title, subtitle, imageSrc, imagePosition = 'center 30%' }: PageHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        height: 'clamp(320px, 48vh, 500px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        paddingTop: '70px',
      }}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        style={{ objectFit: 'cover', objectPosition: imagePosition }}
        priority
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.92) 100%)',
        }}
      />

      {/* Red left accent */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: '#C0392B',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C0392B',
            marginBottom: '0.6rem',
          }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            color: '#ffffff',
            letterSpacing: '0.04em',
            lineHeight: 1,
            marginBottom: subtitle ? '0.6rem' : '0',
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-playfair)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Thin decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ height: 2, backgroundColor: '#C0392B', marginTop: '1.25rem' }}
        />
      </div>
    </section>
  );
}
