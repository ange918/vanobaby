import Image from 'next/image';
import Concert from '@/components/Concert';
import PageHero from '@/components/PageHero';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EABoQAAIDAQEAAAAAAAAAAAAAAAECAwAEBf/aAAgBAQAA/wCwABmX2ikbdbVWJEb3fN//2Q==";

const tickets = [
  {
    label: 'STANDARD',
    price: '5 000 FCFA',
    perks: ['Accès zone debout', 'Animation pré-show', 'Stationnement gratuit'],
    featured: false,
  },
  {
    label: 'PREMIUM',
    price: '10 000 FCFA',
    perks: ['Zone principale élargie', 'Vue scène améliorée', 'Boisson incluse', 'Accès prioritaire'],
    featured: false,
  },
  {
    label: 'VIP',
    price: '50 000 FCFA',
    perks: ['Zone VIP exclusive', 'Places assises réservées', 'Open bar premium', 'Kit collector signé'],
    featured: true,
  },
  {
    label: 'VIP GOLD',
    price: '100 000 FCFA',
    perks: ['Loge privée', 'Meet & Greet artiste', 'Dîner VIP backstage', 'Séance photo exclusive'],
    featured: false,
  },
];

const faqItems = [
  { q: 'Comment accéder au site du concert ?', a: 'Le concert se tient à Cotonou. Les coordonnées GPS et les instructions de transport seront communiquées aux détenteurs de billets par email.' },
  { q: 'Y a-t-il un parking disponible ?', a: 'Oui, un parking sécurisé et gratuit est disponible pour tous les billets. Le co-voiturage est encouragé.' },
  { q: 'Quels objets sont interdits ?', a: "Les appareils photo professionnels, les selfie sticks, les boissons extérieures et tout objet pouvant nuire à la sécurité des participants sont interdits." },
  { q: 'Les billets sont-ils remboursables ?', a: "En cas d'annulation de l'événement, les billets seront intégralement remboursés. Aucun remboursement pour simple changement de plan." },
  { q: "Qu'est-ce qui est inclus dans l'espace VIP ?", a: "L'espace VIP comprend une zone exclusive avec vue privilégiée sur la scène, un open bar premium, un buffet et un meet & greet exclusif avec Vano Baby." },
  { q: 'Y aura-t-il un streaming du concert ?', a: 'Un streaming en direct sera disponible sur les réseaux sociaux de Vano Baby pour ceux qui ne peuvent pas assister en personne.' },
];

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', background: 'none', border: 'none', color: open ? '#C0392B' : '#ffffff', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', gap: '1rem', transition: 'color 0.2s' }}
      >
        <span>{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ fontSize: '1.5rem', color: '#C0392B', flexShrink: 0, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: '#999999', fontSize: '0.85rem', lineHeight: 1.8, paddingBottom: '1.25rem' }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ConcertPage() {
  const [ticketHovered, setTicketHovered] = useState<string | null>(null);
  const [photoHovered, setPhotoHovered] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>

      {/* HERO */}
      <PageHero
        eyebrow="04 — CONCERT"
        title="10 Ans de Règne"
        subtitle="04 Avril 2026 — Cotonou, Bénin"
        imageSrc="/page-concert.jpg"
        imagePosition="center center"
      />

      <Concert />

      {/* BILLETTERIE */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem', textAlign: 'center' }}
          >
            05 — BILLETTERIE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}
          >
            Choisissez votre expérience
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tickets.map((ticket, i) => (
              <motion.div
                key={ticket.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: '#0d0d0d',
                  border: ticket.featured ? '2px solid #C0392B' : '0.5px solid rgba(255,255,255,0.08)',
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                {ticket.featured && (
                  <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#C0392B', padding: '0.2rem 1rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', fontFamily: 'var(--font-bebas)', whiteSpace: 'nowrap' }}>
                    RECOMMANDÉ
                  </div>
                )}
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', color: '#ffffff', letterSpacing: '0.06em', marginBottom: '0.5rem', marginTop: ticket.featured ? '1rem' : '0' }}>
                  {ticket.label}
                </p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#C0392B', marginBottom: '1.5rem' }}>
                  {ticket.price}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {ticket.perks.map(perk => (
                    <li key={perk} style={{ color: '#999999', fontSize: '0.78rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: '#C0392B', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>—</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  onMouseEnter={() => setTicketHovered(ticket.label)}
                  onMouseLeave={() => setTicketHovered(null)}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '0.85rem',
                    backgroundColor: ticketHovered === ticket.label ? '#E74C3C' : '#C0392B',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  Choisir ce billet
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section style={{ backgroundColor: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            06 — GALERIE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            L'artiste en scène
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 9 }, (_, i) => i + 20).map((seed, i) => (
              <motion.div
                key={seed}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onMouseEnter={() => setPhotoHovered(seed)}
                onMouseLeave={() => setPhotoHovered(null)}
                style={{ position: 'relative', aspectRatio: i % 3 === 1 ? '1 / 1.4' : '1', overflow: 'hidden' }}
              >
                {/* TODO: replace with official press photos */}
                <Image
                  src={`https://picsum.photos/400/400?random=${seed}`}
                  alt={`Photo ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease', transform: photoHovered === seed ? 'scale(1.08)' : 'scale(1)' }}
                  placeholder="blur"
                  blurDataURL={BLUR}
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(192,57,43,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: photoHovered === seed ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                  <MagnifyingGlassPlusIcon style={{ width: 36, height: 36, color: 'white' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C0392B', marginBottom: '1rem' }}
          >
            07 — FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#ffffff', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            Questions fréquentes
          </motion.h2>
          {faqItems.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
