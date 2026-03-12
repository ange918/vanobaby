import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET = new Date('2026-04-04T20:00:00');

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          color: '#C0392B',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#999999',
          marginTop: '0.5rem',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div style={{
      fontFamily: 'var(--font-bebas)',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      color: 'rgba(192,57,43,0.4)',
      paddingBottom: '1.5rem',
      lineHeight: 1,
    }}>
      :
    </div>
  );
}

export default function Concert() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="concert"
      style={{ backgroundColor: '#080808', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5vw, 2.5rem)', textAlign: 'center' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#999999',
            marginBottom: '2rem',
          }}
        >
          04 — ÉVÉNEMENT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.25rem, 6vw, 5.5rem)',
            color: '#C0392B',
            letterSpacing: '0.04em',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          10 ANS DE RÈGNE — LE CONCERT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          04 AVRIL 2026 — Cotonou, Bénin
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{ color: '#999999', fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '3.5rem' }}
        >
          20H00 — Ouverture des portes à 18H00
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 3vw, 1.5rem)',
            marginBottom: '4rem',
            flexWrap: 'wrap',
          }}
        >
          <Digit value={timeLeft.days} label="Jours" />
          <Separator />
          <Digit value={timeLeft.hours} label="Heures" />
          <Separator />
          <Digit value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <Digit value={timeLeft.seconds} label="Secondes" />
        </motion.div>

        <div style={{ width: 60, height: 2, backgroundColor: '#C0392B', margin: '0 auto 3rem' }} />

        <motion.a
          href="/concert"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-block',
            padding: '1.1rem 3rem',
            backgroundColor: hovered ? '#ffffff' : '#C0392B',
            color: hovered ? '#C0392B' : '#ffffff',
            textDecoration: 'none',
            fontFamily: 'var(--font-bebas)',
            fontSize: '1.1rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          Réserver ma place
        </motion.a>
      </div>
    </section>
  );
}
