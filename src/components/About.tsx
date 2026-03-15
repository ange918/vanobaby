import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 10, suffix: '+', label: 'ANS', sublabel: 'de carrière' },
  { value: 50, suffix: '+', label: 'TITRES', sublabel: 'sortis' },
  { value: 4, suffix: 'x', label: 'AWARDS', sublabel: 'remportés' },
  { value: 800, suffix: 'K+', label: 'FANS', sublabel: 'fidèles' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-bebas)', color: '#C0392B', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
      {count}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 8rem) clamp(1.25rem, 5vw, 2.5rem)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C0392B',
                marginBottom: '1.25rem',
              }}
            >
              01 — À PROPOS
            </motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '2rem',
              }}
            >
              Le pionnier du rap béninois intergénérationnel
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                color: '#999999',
                lineHeight: 1.9,
                fontSize: '0.95rem',
                marginBottom: '1.25rem',
              }}
            >
              Aurel Sylvanus Adjivon, né le <strong style={{ color: '#ffffff' }}>9 mai 1994</strong> à Sainte-Rita (Cotonou), originaire de Grand-Popo. Sa carrière est lancée en 2013, et il s'impose rapidement comme l'une des voix les plus distinctives du rap béninois.
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                color: '#999999',
                lineHeight: 1.9,
                fontSize: '0.95rem',
                marginBottom: '1.25rem',
              }}
            >
              Lauréat du <strong style={{ color: '#ffffff' }}>MTN Découverte Talents 2014</strong>, il fonde le label <strong style={{ color: '#C0392B' }}>Azéto Gbèdé Music</strong> et enchaîne les hits : <em>Madame</em>, <em>Fitè</em>, <em>Diyo</em>, <em>Chéri Coco</em>, <em>Tu mérites tout</em>…
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem',
                marginTop: '3rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1rem', letterSpacing: '0.1em', color: '#ffffff', marginTop: '0.25rem' }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#999', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {s.sublabel}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Decorative circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[280, 220, 160].map((size, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  border: `1px solid rgba(192,57,43,${0.15 + i * 0.15})`,
                }}
              />
            ))}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: '#C0392B',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: '#fff', lineHeight: 1 }}>10</span>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>ANS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
