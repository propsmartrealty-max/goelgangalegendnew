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
    <section id="academies" className="section-dark" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label">The Stadium Life</span>
          <h2 className="heading-display heading-md">Elite <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Academies</span></h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Train like a professional with world-class coaching integrated directly into your residential ecosystem.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {academies.map((academy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--bg-white)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                color: 'var(--text-dark)',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <div style={{ height: '240px', position: 'relative' }}>
                <img 
                  src={academy.image} 
                  alt={`${academy.name} in Bavdhan Pune - Goel Ganga Legend County`} 
                  title={`${academy.name} at Goel Ganga Legend County`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--accent)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Academy Partner
                </div>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Trophy size={20} style={{ color: 'var(--accent)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{academy.name}</h3>
                </div>
                
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={14} fill="currentColor" />
                  {academy.highlight}
                </div>

                <div style={{ display: 'grid', gap: '0.85rem' }}>
                  {academy.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-dark-muted)' }}>
                      <Target size={14} style={{ color: 'var(--accent)' }} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-cream-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>Curriculum</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{academy.coach}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
