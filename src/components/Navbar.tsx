import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'À propos', href: '/about' },
  { label: 'Carrière', href: '/career' },
  { label: 'Musique', href: '/music' },
  { label: 'Concert', href: '/concert' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

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
          padding: '0 clamp(1rem, 4vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
            color: '#ffffff',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          VANO BABY
        </Link>

        <div style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 2.5rem)', alignItems: 'center' }} className="hidden md:flex">
          {links.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: active ? '#C0392B' : '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  paddingBottom: '4px',
                }}
                className={active ? '' : 'nav-link'}
              >
                {link.label}
                {active && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#C0392B',
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}
          className="flex md:hidden"
          aria-label="Menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B', transformOrigin: 'center' }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B' }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', width: 24, height: 2, backgroundColor: '#C0392B', transformOrigin: 'center' }} />
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
              padding: '2rem clamp(1rem, 5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              borderBottom: '2px solid #C0392B',
            }}
            className="md:hidden"
          >
            {links.map((link, i) => {
              const active = router.pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      color: active ? '#C0392B' : '#ffffff',
                      textDecoration: 'none',
                      fontSize: '2rem',
                      fontFamily: 'var(--font-bebas)',
                      letterSpacing: '0.08em',
                      borderLeft: `3px solid ${active ? '#C0392B' : 'rgba(192,57,43,0.4)'}`,
                      paddingLeft: '1rem',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
