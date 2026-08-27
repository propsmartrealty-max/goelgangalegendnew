import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, IndianRupee, Layers, Home, Check } from 'lucide-react';

const plans = [
  {
    type: '3 BHK Luxe',
    area: '1124 — 1272 Sq.Ft.',
    price: '₹1.77 Cr*',
    desc: 'Luxe 2 Series residences meticulously engineered for high-performance living, featuring an L-shaped living-dining layout and a master suite with a walk-in wardrobe.',
    features: ['L-Shaped Living & Dining', 'Master Suite with Walk-in Wardrobe', 'Expansive Sports-View Balcony', 'Dry Balcony for Utility', 'Premium Vitrified Flooring', 'Anti-skid Bathroom Tiles'],
    highlights: ['Vastu Compliant', 'Stadium View', 'Smart Home Ready'],
    image: '/floorplan-3bhk.webp',
    width: 413,
    height: 310
  },
  {
    type: '3.5 BHK Elite',
    area: '1439.79 Sq.Ft.',
    price: '₹2.10 Cr*',
    desc: 'Elite 4 Series residences featuring a dedicated drawing room and dual-master master suites with walk-in ensuites, offering the ultimate in spatial luxury and privacy.',
    features: ['Dedicated Drawing Room', 'Dual Walk-in Ensuites', 'Grand Living-Dining Hub', 'Premium 3-Side Ventilation', 'Expanded Utility Dry Balcony', 'Imported Marble Foyer Option'],
    highlights: ['Premium Elevation', 'Corner Units', 'Panoramic Stadium Views'],
    image: '/floorplan-3.5bhk.webp',
    width: 877,
    height: 620
  },
];

export default function FloorPlans() {
  const [idx, setIdx] = useState(0);
  const p = plans[idx];

  return (
    <section id="floor-plans" className="section-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
            Architectural Masterpieces
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Choose Your <span className="gradient-text-gold" style={{ fontStyle: 'italic' }}>Residence</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: 620, margin: '1rem auto 0' }}>
            Meticulously engineered 3 & 3.5 BHK floor plans designed for high-performance living, optimal cross-ventilation, and panoramic NDA hill views.
          </motion.p>
        </div>

        {/* Plan Switcher Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: 'clamp(2.5rem, 4vw, 4rem)', flexWrap: 'wrap' }}>
          {plans.map((pl, i) => (
            <button key={pl.type} onClick={() => setIdx(i)} style={{
              padding: '0.9rem 2.25rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.88rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              transition: 'all 0.35s var(--ease-out)',
              background: idx === i ? 'var(--accent-gradient-gold)' : 'rgba(15, 23, 42, 0.7)',
              color: idx === i ? '#0F172A' : 'var(--text-white)',
              border: idx === i ? '1.5px solid transparent' : '1.5px solid rgba(255, 255, 255, 0.12)',
              transform: idx === i ? 'scale(1.04)' : 'scale(1)',
              boxShadow: idx === i ? 'var(--shadow-gold)' : 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <Home size={16} />
              {pl.type}
              <span style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-pill)',
                background: idx === i ? 'rgba(0, 0, 0, 0.18)' : 'rgba(245, 158, 11, 0.15)',
                color: idx === i ? '#0F172A' : '#FCD34D',
                fontWeight: 700,
                marginLeft: '0.25rem',
              }}>
                {pl.price}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center' }}>
            
            {/* Blueprint Image Container */}
            <div className="glass-card-bold" style={{ padding: '1.5rem', aspectRatio: '4/3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
              <img 
                src={p.image} 
                alt={`${p.type} Floor Plan - Goel Ganga Legend County`}
                title={`${p.type} Unit Configuration - Bavdhan Pune`}
                width={p.width}
                height={p.height}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'contrast(1.05)' }}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0';
                  const fallback = e.currentTarget.parentElement?.querySelector('.blueprint-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="blueprint-fallback" style={{ position: 'absolute', inset: 0, background: '#0e1525', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', zIndex: 1 }}>
                <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={40} style={{ color: 'var(--accent-gold)', opacity: 0.6 }} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'rgba(245,158,11,0.15)', lineHeight: 1 }}>{p.type}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '1rem', letterSpacing: '0.2em' }}>SCHEMATIC BLUEPRINT</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {p.highlights.map((h) => (
                  <span key={h} className="badge-titanium" style={{ fontSize: '0.68rem', padding: '0.35rem 0.85rem' }}>{h}</span>
                ))}
              </div>

              <h3 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-white)', marginBottom: '1rem', lineHeight: 1.1 }}>
                The {p.type} <span className="gradient-text-gold" style={{ fontStyle: 'italic' }}>Residence</span>
              </h3>
              <p style={{ color: 'var(--text-white-muted)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 520 }}>{p.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card-bold" style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                    <Maximize2 size={13} /> Carpet Area
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>{p.area}</div>
                </div>
                <div className="glass-card-bold" style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                    <IndianRupee size={13} /> Starting Price
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>{p.price}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {p.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-white)' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} style={{ color: '#10B981' }} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                  className="btn-primary"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Download Complete Blueprint PDF
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                  className="btn-outline" 
                  style={{ cursor: 'pointer' }}
                >
                  Schedule Show Flat Tour
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
