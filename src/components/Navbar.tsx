import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'À propos', href: '#about' },
  { label: 'Carrière', href: '#timeline' },
  { label: 'Musique', href: '#music' },
  { label: 'Concert', href: '#concert' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          backgroundColor: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(192,57,43,0.15)' : 'none',
          transition: 'background-color 0.4s ease, border-bottom 0.4s ease',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '1.75rem',
            color: '#ffffff',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          VANO BABY
        </a>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}
          className="flex md:hidden"
          aria-label="Menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B', transformOrigin: 'center', transition: 'background-color 0.2s' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B', transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(8,8,8,0.98)',
              zIndex: 9989,
              padding: '2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderBottom: '2px solid #C0392B',
            }}
            className="md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '2rem',
                  fontFamily: 'var(--font-bebas)',
                  letterSpacing: '0.08em',
                  borderLeft: '3px solid #C0392B',
                  paddingLeft: '1rem',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
