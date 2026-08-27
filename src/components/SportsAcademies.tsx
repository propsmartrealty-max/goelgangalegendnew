import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap } from 'lucide-react';

const academies = [
  {
    name: 'Michael Phelps Swimming Academy',
    coach: 'Phelps Global Protocol',
    highlight: 'Olympic-sized competition pool',
    features: ['Video stroke analysis', 'Professional coaching for all ages', 'Heated water systems'],
    image: '/amenities-pool.webp'
  },
  {
    name: 'South United Football Academy',
    coach: 'SUFC Elite Staff',
    highlight: 'FIFA-grade synthetic turf',
    features: ['Tactical training rooms', 'Injury prevention protocols', 'Scouting opportunities'],
    image: '/gallery-clubhouse.webp'
  },
  {
    name: 'Tagda Raho by MS Dhoni',
    coach: 'Dhoni Fitness Protocol',
    highlight: 'First in West Pune',
    features: ['Ancient Indian equipment', 'Functional movement focus', 'High-intensity circuits'],
    image: '/interior-luxury.webp'
  }
];

export default function SportsAcademies() {
  return (
    <section id="academies" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-elevated)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Trophy size={14} style={{ color: '#F59E0B' }} />
            12.5-Acre Professional Sports Arena
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            World-Class <span className="gradient-text-gold" style={{ fontStyle: 'italic' }}>Academies</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Train like an Olympian. Exclusive subsidized coaching protocols and priority admissions for Legend County residents.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}>
          {academies.map((academy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-card-bold"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '230px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={academy.image} 
                  alt={`${academy.name} in Bavdhan Pune - Goel Ganga Legend County`} 
                  title={`${academy.name} at Goel Ganga Legend County`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.4rem 0.9rem',
                  background: 'var(--accent-gradient-gold)',
                  color: '#0F172A',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}>
                  Official Partner
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Trophy size={18} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)' }}>{academy.name}</h3>
                </div>
                
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FCD34D', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={14} fill="currentColor" />
                  {academy.highlight}
                </div>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem', flex: 1 }}>
                  {academy.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>
                      <Target size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={15} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.60rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-white-subtle)' }}>Curriculum</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-white)' }}>{academy.coach}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold-light)',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Enquire Admission →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
