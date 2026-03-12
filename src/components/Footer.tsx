import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OwlIcon from './OwlIcon';

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
      </svg>
    ),
  },
];

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Carrière', href: '/career' },
  { label: 'Musique', href: '/music' },
  { label: 'Concert', href: '/concert' },
  { label: 'Contact', href: '/contact' },
];

const infoLinks = [
  { label: 'contact@vanobaby.bj', href: 'mailto:contact@vanobaby.bj' },
  { label: 'Booking international', href: '/contact' },
  { label: 'Presse & médias', href: '/contact' },
  { label: 'Red Line Records', href: '/contact' },
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>

      {/* Main footer grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <OwlIcon size={32} />
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', color: '#ffffff', letterSpacing: '0.06em' }}>
                VANO BABY
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C0392B', marginBottom: '1rem' }}>
              AZÉTO GBÈDÉ MUSIC
            </p>
            <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              10 ans au sommet du rap béninois. Un artiste, une légende, un mouvement.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  onMouseEnter={() => setHoveredSocial(s.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  aria-label={s.name}
                  style={{
                    color: hoveredSocial === s.name ? '#C0392B' : '#888',
                    transition: 'color 0.25s ease',
                    textDecoration: 'none',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1.25rem', fontFamily: 'var(--font-bebas)' }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                  >
                    <span style={{ color: '#C0392B', fontSize: '0.6rem' }}>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & infos */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1.25rem', fontFamily: 'var(--font-bebas)' }}>
              Contact & Infos
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {infoLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                  >
                    <span style={{ color: '#C0392B', fontSize: '0.6rem' }}>→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Concert CTA */}
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#111111', borderLeft: '2px solid #C0392B' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#C0392B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Prochain concert</p>
              <p style={{ fontFamily: 'var(--font-bebas)', color: '#ffffff', fontSize: '1rem', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>04 AVRIL 2026</p>
              <p style={{ color: '#999', fontSize: '0.72rem' }}>Cotonou, Bénin</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: '#555', fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            © 2024 Vano Baby — Azéto Gbèdé Music. Tous droits réservés.
          </p>
          <p style={{ color: '#C0392B', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: 'var(--font-bebas)' }}>
            10 ANS DE RÈGNE · 2014 — 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
