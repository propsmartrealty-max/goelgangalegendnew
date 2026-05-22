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
    <section id="floor-plans" className="section-light" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label" style={{ color: 'var(--accent-dark)', display: 'block', marginBottom: '1rem' }}>Residences</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-display heading-lg" style={{ color: 'var(--text-dark)' }}>
            Choose Your <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Home</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="body-lg" style={{ color: 'var(--text-dark-muted)', maxWidth: 560, margin: '1rem auto 0' }}>
            Meticulously crafted floor plans designed for spatial efficiency and premium comfort.
          </motion.p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          {plans.map((pl, i) => (
            <button key={pl.type} onClick={() => setIdx(i)} style={{
              padding: '0.85rem 2.5rem', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', fontWeight: 700,
              transition: 'all 0.4s var(--ease-out)',
              background: idx === i ? 'var(--bg-primary)' : 'transparent',
              color: idx === i ? 'var(--text-white)' : 'var(--text-dark)',
              border: idx === i ? '1.5px solid var(--bg-primary)' : '1.5px solid rgba(0,0,0,0.12)',
              transform: idx === i ? 'scale(1.05)' : 'scale(1)',
              boxShadow: idx === i ? 'var(--shadow-md)' : 'none',
            }}>
              <Home size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {pl.type}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={p.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'start' }}>
            
            {/* Blueprint Image Container */}
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#fff', aspectRatio: '4/3', position: 'relative', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={p.image} 
                alt={`${p.type} Floor Plan - Goel Ganga Legend County`}
                title={`${p.type} Unit Configuration - Bavdhan Pune`}
                width={p.width}
                height={p.height}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem', position: 'relative', zIndex: 2 }}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0';
                  const fallback = e.currentTarget.parentElement?.querySelector('.blueprint-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="blueprint-fallback" style={{ position: 'absolute', inset: 0, background: '#0e1525', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', zIndex: 1 }}>
                <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(201,150,59,0.08)', border: '1px solid rgba(201,150,59,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={40} style={{ color: 'var(--accent)', opacity: 0.6 }} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'rgba(201,150,59,0.15)', lineHeight: 1 }}>{p.type}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginTop: '1rem', letterSpacing: '0.2em' }}>ASSET NOT FOUND</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>Please upload {p.image} to /public/</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="heading-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-dark)', marginBottom: '1rem' }}>
                The {p.type} <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Residence</span>
              </h3>
              <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 480 }}>{p.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: '0.5rem' }}><Maximize2 size={12} /> Area</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>{p.area}</div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: '0.5rem' }}><IndianRupee size={12} /> Price</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>{p.price}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {p.highlights.map((h) => (
                  <span key={h} style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(201,150,59,0.08)', color: 'var(--accent-dark)', border: '1px solid rgba(201,150,59,0.15)' }}>{h}</span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '2.5rem' }}>
                {p.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                    <Check size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-dark">Request Floor Plan</a>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                  className="btn-outline" 
                  style={{ color: 'var(--text-dark)', borderColor: 'rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Request Callback
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
