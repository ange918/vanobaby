import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const events = [
  { year: '2013', title: '"Drague Azonto"', desc: 'Premier single, naissance d\'un phénomène' },
  { year: '2014', title: 'MTN Découverte Talents', desc: 'Victoire du concours national (5M CFA)' },
  { year: '2016', title: '"Adigoue Gboun Gboun"', desc: 'Buzz national, percée au Bénin' },
  { year: '2017', title: '"Je s\'en fou" + "Tonssimè chap"', desc: 'Collaborations & hits' },
  { year: '2018', title: 'Contrat Universal Music Africa', desc: 'Reconnaissance internationale' },
  { year: '2019', title: '"Madame"', desc: 'Virage artistique, nouveau son romantique' },
  { year: '2020', title: 'Label Red Line Africa', desc: 'Nouveau partenariat' },
  { year: '2021', title: '1er Bénin Top 10 Awards', desc: 'Meilleur artiste béninois' },
  { year: '2022', title: '"Diyo"', desc: 'Tube à conscience sociale' },
  { year: '2023', title: 'Ambassadeur Betclic Bénin', desc: 'Rayonnement national' },
  { year: '2024', title: '10 ans de règne', desc: 'Méga-concert en préparation' },
];

function TimelineCard({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        alignItems: 'center',
        marginBottom: '2.5rem',
        position: 'relative',
      }}
    >
      {/* Left card or spacer */}
      <div>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: '#161616',
              border: '0.5px solid rgba(255,255,255,0.08)',
              padding: '1.5rem',
              textAlign: 'right',
            }}
          >
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', color: '#C0392B', lineHeight: 1, marginBottom: '0.25rem' }}>
              {event.year}
            </p>
            <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {event.title}
            </p>
            <p style={{ color: '#999999', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {event.desc}
            </p>
          </motion.div>
        ) : <div />}
      </div>

      {/* Center dot */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#C0392B',
            border: '2px solid #080808',
            boxShadow: '0 0 0 2px #C0392B',
            zIndex: 2,
          }}
        />
      </div>

      {/* Right card or spacer */}
      <div>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: '#161616',
              border: '0.5px solid rgba(255,255,255,0.08)',
              padding: '1.5rem',
              textAlign: 'left',
            }}
          >
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', color: '#C0392B', lineHeight: 1, marginBottom: '0.25rem' }}>
              {event.year}
            </p>
            <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {event.title}
            </p>
            <p style={{ color: '#999999', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {event.desc}
            </p>
          </motion.div>
        ) : <div />}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      style={{ backgroundColor: '#111111', padding: '8rem 2.5rem' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C0392B',
            marginBottom: '1rem',
          }}
        >
          02 — CARRIÈRE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: '#ffffff',
            marginBottom: '5rem',
          }}
        >
          10 ans d'une ascension implacable
        </motion.h2>

        {/* Timeline container with center line */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: '#C0392B',
              transform: 'translateX(-50%)',
              opacity: 0.4,
            }}
          />
          {events.map((event, i) => (
            <TimelineCard key={event.year} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
