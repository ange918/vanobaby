import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OwlIcon from './OwlIcon';

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('vb_intro_seen')) {
      setDone(true);
      return;
    }
    setMounted(true);

    const startDelay = setTimeout(() => {
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= 100) {
          clearInterval(timer);
          setTimeout(() => setExiting(true), 300);
        }
      }, 25);
      return () => clearInterval(timer);
    }, 600);

    return () => clearTimeout(startDelay);
  }, []);

  if (done || !mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      {/* Top half panel */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: '#080808',
          zIndex: 2,
        }}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (exiting) {
            sessionStorage.setItem('vb_intro_seen', 'true');
            setDone(true);
          }
        }}
      />

      {/* Bottom half panel */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: '#080808',
          zIndex: 2,
        }}
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content */}
      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="intro-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <OwlIcon size={120} animated />

            <p
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '1.4rem',
                color: '#ffffff',
                letterSpacing: '0.4em',
                marginTop: '0.5rem',
              }}
            >
              VANO BABY
            </p>

            <div style={{ width: 'min(280px, 80vw)', marginTop: '1rem' }}>
              <div style={{ textAlign: 'right', marginBottom: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '3rem',
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  {count}
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${count}%`,
                    backgroundColor: '#C0392B',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#999999',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                CHARGEMENT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
