import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/hero-aerial.webp', title: 'Aerial View', desc: '30-acre integrated township' },
  { src: '/amenities-pool.webp', title: 'Olympic Swimming Pool', desc: 'Michael Phelps Academy' },
  { src: '/gallery-football.webp', title: 'Football Turf', desc: 'South United Academy' },
  { src: '/gallery-clubhouse.webp', title: 'Grand Clubhouse', desc: 'Premium lifestyle hub' },
  { src: '/interior-luxury.webp', title: 'Luxury Interiors', desc: '3 & 3.5 BHK residences' },
  { src: '/gallery-jogging.webp', title: 'Jogging Track', desc: 'Landscaped wellness trail' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <section id="gallery" className="section-dark" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="label" style={{ display: 'block', marginBottom: '1rem' }}>Visual Tour</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="heading-display heading-lg">
            Life at <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Legend County</span>
          </motion.h2>
        </div>
      </div>

      {/* Scrollable gallery */}
      <div style={{
        display: 'flex', gap: '1rem',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
        paddingLeft: 'clamp(1.25rem, 4vw, 2.5rem)',
        paddingRight: 'clamp(1.25rem, 4vw, 2.5rem)',
        paddingBottom: '1rem',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            onClick={() => setLightbox(i)}
            style={{
              flex: '0 0 min(85vw, 400px)',
              scrollSnapAlign: 'start',
              cursor: 'pointer',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '4/3',
            }}
          >
            <img src={img.src} alt={img.title} width={1024} height={1024} loading="lazy" decoding="async" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s var(--ease-out)',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '1.5rem', paddingTop: '3rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{img.title}</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.6 }}>{img.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              style={{
                position: 'absolute', top: 20, right: 20, zIndex: 10,
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><X size={20} /></button>

            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                width: 48, height: 48, borderRadius: '50%', zIndex: 10,
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><ChevronLeft size={24} /></button>

            <button onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                width: 48, height: 48, borderRadius: '50%', zIndex: 10,
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><ChevronRight size={24} /></button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={images[lightbox].src}
              alt={images[lightbox].title}
              width={1024}
              height={1024}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw', maxHeight: '85vh',
                objectFit: 'contain', borderRadius: 'var(--radius-md)',
              }}
            />

            <div style={{
              position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
              textAlign: 'center', color: '#fff',
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{images[lightbox].title}</div>
              <div style={{ fontSize: '0.82rem', opacity: 0.5 }}>{images[lightbox].desc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
