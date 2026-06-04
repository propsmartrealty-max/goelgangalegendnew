import { motion } from 'framer-motion';
import { Compass, Maximize, Map, TreePalm } from 'lucide-react';

const legendItems = [
  { id: '01', label: 'Main Entrance & Security Plaza', icon: <Map size={18} /> },
  { id: '02', label: '12.5 Acre Sports Arena', icon: <Maximize size={18} /> },
  { id: '03', label: 'Michael Phelps Swimming Academy', icon: <Compass size={18} /> },
  { id: '04', label: 'Grand Clubhouse & Lifestyle Hub', icon: <TreePalm size={18} /> },
  { id: '05', label: 'South United Football Turf', icon: <Map size={18} /> },
  { id: '06', label: 'Landscaped Jogging & Cycling Tracks', icon: <Maximize size={18} /> },
];

export default function MasterLayout() {
  return (
    <section id="master-layout" className="section-dark" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-gold" style={{ width: 600, height: 600, top: '10%', right: '-10%', position: 'absolute', opacity: 0.15 }} />
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label">Site Intelligence</span>
          <h2 className="heading-display heading-md">Master <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Layout</span></h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            A 30-acre master-planned ecosystem designed for optimal spatial flow, ventilation, and a sports-integrated lifestyle.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Master Plan Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ 
              position: 'relative', 
              borderRadius: 'var(--radius-xl)', 
              overflow: 'hidden', 
              border: '1px solid var(--border-light)',
              background: 'rgba(255,255,255,0.02)'
            }}
          >
            <img 
              src="/master-layout.webp" 
              alt="Goel Ganga Legend County 30-Acre Master Plan - Bavdhan Pune" 
              title="Official Master Layout of Goel Ganga Legend County - Featuring Sports Stadia, Schools & Central Park"
              width={1000}
              height={705}
              loading="lazy"
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9,9,11,0.8), transparent)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2.5rem'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-serif)' }}>30 Acre Township</div>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)' }}>Engineered for performance and peace.</p>
            </div>
          </motion.div>
 
          {/* Legend Details */}
          <div>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {legendItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,150,59,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    flexShrink: 0
                  }}>
                    {item.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{item.label}</div>
                  </div>
                  <div style={{ color: 'var(--accent)', opacity: 0.5 }}>
                    {item.icon}
                  </div>
                </motion.div>
              ))}
            </div>
 
            <div style={{ marginTop: '3rem' }}>
              <a href="#contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Download High-Res Master Plan</a>
            </div>
 
            {/* Programmatic Landmark Index for SEO */}
            <div style={{
              marginTop: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '1rem',
              opacity: 0.8,
              borderTop: '1px solid var(--border-light)',
              paddingTop: '2rem'
            }}>
              {[
                'GG International School', 'Sports & Athletics Stadia', 'Adventure Sports Trails', 
                'Central Park', 'Ganga Legends Plaza', 'Proposed Future Residential Zone', 
                'Club Ileseum', 'High Street Retail'
              ].map((item) => (
                <div key={item} style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                  • {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
