import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ShieldCheck } from 'lucide-react';

export default function ProjectCinema() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-dark" id="cinema" style={{ position: 'relative', paddingBottom: '0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label">Cinematic Experience</span>
          <h2 className="heading-display heading-lg">
            A Vision in{' '}<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Motion</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: 600, margin: '1rem auto 0' }}>
            Experience the 30-acre sports township through our official cinematic walkthrough. From the grand stadium entrance to the luxury of your private terrace.
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
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/q3_qJkrl05I?autoplay=1"
              title="Goel Ganga Legend County Official Walkthrough"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Video Placeholder Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.4)',
                  cursor: 'pointer'
                }}
                onClick={() => setIsPlaying(true)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#06080D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)'
                  }}
                >
                  <Play fill="#06080D" size={32} />
                </motion.div>
              </div>

              <img 
                src="/cinema-thumb.jpg" 
                alt="Goel Ganga Legend County 4K Cinema Drone Walkthrough"
                title="Goel Ganga Legend County Official Cinema Preview"
                loading="lazy"
                width={1280}
                height={720}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9)',
                }}
              />
            </>
          )}

          {/* Luxury Badge */}
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(9, 9, 11, 0.8)',
            backdropFilter: 'blur(12px)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-light)',
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-white)' }}>
              Official 4K Township Walkthrough · MahaRERA: P52100054578
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
