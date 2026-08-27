import { motion } from 'framer-motion';
import { MapPin, Train, Road, Building2 } from 'lucide-react';

const projects = [
  {
    year: '2023',
    title: 'Chandni Chowk Flyover',
    desc: 'Completion of the multi-level flyover, slashing travel time to Kothrud and Baner by 70%.',
    icon: <Road size={20} />,
    status: 'Completed'
  },
  {
    year: '2025',
    title: 'Metro Line 3 Connectivity',
    desc: 'Direct access to the Hinjewadi-Shivajinagar Metro corridor, connecting Bavdhan to the IT hub.',
    icon: <Train size={20} />,
    status: 'In Progress'
  },
  {
    year: '2026',
    title: 'High-Street Retail Hub',
    desc: 'Launch of 50,000+ sq.ft. of premium retail and dining spaces adjacent to Legend County.',
    icon: <Building2 size={20} />,
    status: 'Planned'
  },
  {
    year: '2027',
    title: 'Pune Ring Road',
    desc: 'Strategic proximity to the upcoming Ring Road, enabling rapid transit to Pune Airport and Mumbai Highway.',
    icon: <MapPin size={20} />,
    status: 'Vision'
  }
];

export default function InfrastructureTracker() {
  return (
    <section className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-elevated)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Road size={14} style={{ color: '#F59E0B' }} />
            West Pune Growth Corridors
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Infrastructure <span className="gradient-text-gold" style={{ fontStyle: 'italic' }}>Catalysts</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '620px', margin: '1rem auto 0' }}>
            Bavdhan is the nucleus of Pune's mega-infrastructure investments, slashing commute times and multiplying capital valuations.
          </p>
        </div>

        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.4), transparent)',
            transform: 'translateX(-50%)',
          }} className="hide-mobile" />

          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {projects.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  width: '100%',
                  position: 'relative'
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: item.status === 'Completed' ? '#10B981' : '#F59E0B',
                  border: '4px solid #0B0F17',
                  boxShadow: item.status === 'Completed' ? '0 0 12px #10B981' : '0 0 12px #F59E0B',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }} className="hide-mobile" />

                <div 
                  className="glass-card-bold full-width-mobile"
                  style={{
                    width: '46%',
                    padding: '2rem',
                    textAlign: i % 2 === 0 ? 'right' : 'left'
                  }} 
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-gold-light)', fontFamily: 'var(--font-display)' }}>{item.year}</span>
                    <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', color: 'var(--accent-gold)' }}>
                      {item.icon}
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-white-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{item.desc}</p>
                  <div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      background: item.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: item.status === 'Completed' ? '#34D399' : '#FCD34D',
                      border: `1px solid ${item.status === 'Completed' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
