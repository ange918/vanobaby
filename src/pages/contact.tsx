import { useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'TikTok', href: '#' },
];

const inputStyle = {
  width: '100%',
  backgroundColor: '#161616',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#ffffff',
  padding: '0.85rem 1rem',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box' as const,
};

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: '', email: '', objet: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getBorderStyle = (field: string) => ({
    ...inputStyle,
    borderColor: focused === field ? '#C0392B' : 'rgba(255,255,255,0.08)',
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', paddingTop: '70px' }}>

      {/* Header */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 2.5rem) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            05 — CONTACT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Entrons en contact
          </motion.h1>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 2.5rem) clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* LEFT: Form */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {submitted ? (
                <div style={{
                  backgroundColor: '#111111',
                  border: '1px solid #C0392B',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: '#C0392B', marginBottom: '1rem' }}>
                    MESSAGE ENVOYÉ
                  </p>
                  <p style={{ color: '#999', fontSize: '0.9rem' }}>
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.4rem' }}>
                      Nom *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.nom}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                      onFocus={() => setFocused('nom')}
                      onBlur={() => setFocused(null)}
                      style={getBorderStyle('nom')}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.4rem' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={getBorderStyle('email')}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.4rem' }}>
                      Objet
                    </label>
                    <select
                      value={form.objet}
                      onChange={e => setForm({ ...form, objet: e.target.value })}
                      onFocus={() => setFocused('objet')}
                      onBlur={() => setFocused(null)}
                      style={{ ...getBorderStyle('objet'), cursor: 'pointer' }}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Booking">Booking</option>
                      <option value="Presse">Presse</option>
                      <option value="Partenariat">Partenariat</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.4rem' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{ ...getBorderStyle('message'), minHeight: '160px', resize: 'vertical' }}
                      placeholder="Votre message..."
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#C0392B',
                      color: '#ffffff',
                      border: 'none',
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '1rem',
                      letterSpacing: '0.15em',
                      marginTop: '0.5rem',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E74C3C')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C0392B')}
                  >
                    ENVOYER →
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT: Contact info */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', letterSpacing: '0.1em', color: '#C0392B', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
                  AZÉTO GBÈDÉ MUSIC
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '0.25rem' }}>Email</p>
                    <a href="mailto:contact@vanobaby.bj" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      contact@vanobaby.bj
                    </a>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '0.25rem' }}>Téléphone</p>
                    <a href="tel:+22900000000" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      +229 XX XX XX XX
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
                  Réseaux sociaux
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {socials.map(s => (
                    <a
                      key={s.name}
                      href={s.href}
                      style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C0392B')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
                    >
                      <span style={{ color: '#C0392B', fontSize: '0.7rem' }}>→</span>
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOOKING INTERNATIONAL */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 2.5rem) clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: '#111111',
              borderTop: '3px solid #C0392B',
              padding: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}>
              BOOKING INTERNATIONAL
            </p>
            <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', letterSpacing: '0.04em', marginBottom: '1rem' }}>
              RED LINE RECORDS
            </h3>
            <p style={{ color: '#999999', lineHeight: 1.8, fontSize: '0.9rem', maxWidth: '600px' }}>
              Pour toute demande de booking international, festival, tournée ou partenariat artistique hors du Bénin, veuillez contacter directement Red Line Records, label partenaire officiel de Vano Baby pour le marché international depuis 2020.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href="mailto:contact@vanobaby.bj"
                style={{
                  display: 'inline-block',
                  color: '#C0392B',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.12em',
                  borderBottom: '1px solid rgba(192,57,43,0.3)',
                  paddingBottom: '2px',
                }}
              >
                CONTACTER RED LINE RECORDS →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
