import { motion } from 'framer-motion';
import { Home, Map, Trophy, Users } from 'lucide-react';

const stats = [
  { label: 'Total Land Area', value: '30 Acres', icon: <Map size={20} /> },
  { label: 'Sports Arena', value: '12.5 Acres', icon: <Trophy size={20} /> },
  { label: 'Happy Families', value: '1500+', icon: <Users size={20} /> },
  { label: 'Unit Types', value: '3 & 3.5 BHK', icon: <Home size={20} /> },
];

export default function Overview() {
  return (
    <section id="overview" className="section-light" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '5rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="label" style={{ color: 'var(--accent-dark)', marginBottom: '1rem', display: 'block' }}>Project Overview</span>
            <h2 className="heading-display heading-lg" style={{ color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              Where Life is a <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Grand Stadium</span>
            </h2>
            <p className="body-md" style={{ color: 'var(--text-dark-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Goel Ganga Legend County is Pune's premier 30-acre integrated sports-first township located in the upscale micro-market of Bavdhan. Designed for high-performance living, it seamlessly blends international-grade sports academies with luxury residential spaces.
            </p>
            <p className="body-md" style={{ color: 'var(--text-dark-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              With over 12.5 acres dedicated solely to sports infrastructure, residents have access to professional coaching at the Michael Phelps Swimming Academy, Tagda Raho by Dhoni, and South United Football Academy—creating an ecosystem where every day is an opportunity to excel.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ padding: '1.25rem', background: 'var(--bg-cream-deep)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent)' }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <img 
              src="/hero-aerial.webp" 
              alt="Goel Ganga Legend County Aerial View - Premium 30-Acre Sports Township in Bavdhan Pune" 
              title="Goel Ganga Legend County Aerial View"
              width={1024}
              height={1024}
              loading="lazy"
              style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.25rem' }}>RERA Registered</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>P52100054578 · Phase II</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
