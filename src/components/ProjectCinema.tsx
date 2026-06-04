import { motion } from 'framer-motion';
import { Play, Maximize2, ShieldCheck } from 'lucide-react';

export default function ProjectCinema() {
  return (
    <section className="section-dark" id="cinema" style={{ position: 'relative', paddingBottom: '0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label">Cinematic Experience</span>
          <h2 className="heading-display heading-lg">
            A Vision in{' '}<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Motion</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: 600, margin: '1rem auto 0' }}>
            Experience the 30-acre sports township through our cinematic walkthrough. From the grand stadium entrance to the luxury of your private terrace.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: '#000',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          {/* Video Placeholder Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)',
            cursor: 'pointer'
          }}
          onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px var(--accent-glow)'
              }}
            >
              <Play fill="#fff" size={32} />
            </motion.div>
          </div>

          <img 
            src="/hero-aerial.webp" 
            alt="Goel Ganga Legend County - Cinematic Project Walkthrough Video Preview" 
            title="Goel Ganga Legend County - Cinematic Project Walkthrough"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />

          <div style={{
            position: 'absolute', bottom: 24, left: 24, right: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 3, pointerEvents: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Official Project Film 2024</span>
            </div>
            <Maximize2 size={20} style={{ opacity: 0.5 }} />
          </div>
        </motion.div>

        {/* Cinematic Stats */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', 
          gap: '2rem', marginTop: '4rem', paddingBottom: '8rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Scope</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>30-Acre Township</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Theme</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Integrated Sports</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Status</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Stadium Life Active</div>
          </div>
        </div>
      </div>
    </section>
  );
}
