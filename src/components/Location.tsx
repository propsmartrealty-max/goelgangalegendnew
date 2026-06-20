import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Building, Train, Plane, Clock, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const landmarks = [
  { icon: <MapPin size={18} />, title: 'Mumbai-Bangalore Highway', dist: '2 min' },
  { icon: <MapPin size={18} />, title: 'Chandni Chowk', dist: '3 min' },
  { icon: <GraduationCap size={18} />, title: 'Ryan International School', dist: '7 min' },
  { icon: <Building size={18} />, title: 'Kothrud', dist: '8 min' },
  { icon: <Building size={18} />, title: 'Baner / Balewadi', dist: '12 min' },
  { icon: <Train size={18} />, title: 'Pune Railway Station', dist: '15 min' },
  { icon: <Building size={18} />, title: 'Hinjewadi IT Park', dist: '22 min' },
  { icon: <Plane size={18} />, title: 'Pune Airport', dist: '45 min' },
];

export default function Location() {
  return (
    <section id="location" className="section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-gold" style={{ width: 600, height: 600, bottom: '-20%', left: '-10%', position: 'absolute' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          
          {/* Left - Info */}
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label" style={{ display: 'block', marginBottom: '1rem' }}>
              Prime Location
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-display heading-lg" style={{ marginBottom: '1.25rem' }}>
              Bavdhan,{' '}<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Pune</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="body-lg" style={{ color: 'var(--text-white-muted)', marginBottom: '2.5rem', maxWidth: 440 }}>
              Strategically located at the intersection of convenience and calm. Quick access to IT hubs, schools, hospitals, and lifestyle destinations.
            </motion.p>

            {/* Address Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{
              padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', marginBottom: '2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Navigation size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>Site Address</span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-white)', opacity: 0.8 }}>
                Sr. No. 34, Bavdhan Budruk,<br />Pune — 411021, Maharashtra
              </p>
            </motion.div>

            {/* Landmarks */}
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {landmarks.map((mark, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)',
                    transition: 'all 0.3s var(--ease-out)', cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,150,59,0.2)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent)', opacity: 0.7 }}>{mark.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{mark.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={12} style={{ opacity: 0.3 }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)' }}>{mark.dist}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Micro-Market Authority (Internal Linking) */}
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.6 }}>Explore Micro-Markets</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link to="/3bhk-flats-bavdhan" style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>3 BHK Bavdhan</Link>
                <Link to="/luxury-projects-bavdhan" style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Top Projects</Link>
                <Link to="/investment-flats-bavdhan-pune" style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>ROI Guide</Link>
                <Link to="/sports-township-pune" style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Sports Township</Link>
              </div>
            </div>
          </div>

          {/* Right - Map */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', position: 'relative', minHeight: 500 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.33256087547!2d73.7699!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf3831b1d1d9%3A0x86734316d2f35d21!2sGanga%20Legend%20County!5e0!3m2!1sen!2sin!4v1715340000000!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)', minHeight: 500 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Goel Ganga Legend County Location Map"
            />
            <div style={{
              position: 'absolute', top: 20, right: 20,
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.95)', color: '#1a1a1e',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              boxShadow: 'var(--shadow-md)', zIndex: 10,
            }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Maps_icon_%282020%29.svg/1024px-Google_Maps_icon_%282020%29.svg.png" 
                width={18} 
                height={18} 
                loading="lazy" 
                decoding="async"
                style={{ height: 18, width: 18 }} 
                alt="Google Maps Logo" 
              />
              <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>4.8 ★ <span style={{ opacity: 0.5, fontWeight: 500 }}> (520+ Reviews)</span></div>
            </div>

            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)',
              background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Get Directions</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.5 }}>Bavdhan Budruk, Pune 411021</div>
              </div>
              <a href="https://maps.google.com/?q=Ganga+Legend+County+Bavdhan+Pune" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.72rem' }}>
                Open Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
