import { motion, type Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  '30-acre integrated sports-first township',
  '12.5 acres dedicated to sports infrastructure',
  '9+ international-grade sports academies',
  'Luxury 3 & 3.5 BHK residences from ₹1.77 Cr*',
  'Prime Bavdhan location near Chandni Chowk',
  '1500+ families building a legacy together',
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" }
  }),
};

export default function About() {
  return (
    <section id="about" className="section-light" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: 500,
        height: 500,
        borderRadius: '50%',
        border: '1px solid rgba(201, 150, 59, 0.08)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'center',
        }}>
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '4/5',
              position: 'relative',
            }}>
              <img
                src="/about-architecture.png"
                alt="Goel Ganga Legend County 30-Acre Township Architecture"
                title="Goel Ganga Legend County - Official Township Architecture"
                loading="lazy"
                width={400}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s var(--ease-out)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
              }} />
            </div>

            {/* Floating price card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1rem',
                background: 'var(--bg-primary)',
                color: 'var(--text-white)',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 2,
              }}
            >
              <div style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.35rem',
              }}>
                Starting Price
              </div>
              <div style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1,
              }}>
                ₹1.77 <span style={{ fontSize: '1rem', opacity: 0.5 }}>Cr*</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label" style={{ color: 'var(--accent-dark)', marginBottom: '1rem', display: 'block' }}>
              About the Project
            </span>

            <h2
              className="heading-display heading-lg"
              style={{ color: 'var(--text-dark)', marginBottom: '1.5rem' }}
            >
              Pune's Largest{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                Sports Township
              </span>
            </h2>

            <p className="body-lg" style={{
              color: 'var(--text-dark-muted)',
              marginBottom: '2.5rem',
              maxWidth: 520,
            }}>
              Goel Ganga Legend County redefines modern living by integrating world-class sports 
              infrastructure with luxury residential spaces. Spread across 30 acres in prime 
              Bavdhan, it's where active lifestyles meet elegant comfort — creating a community 
              built for champions.
            </p>

            {/* Highlights */}
            <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-dark)',
                  }}
                >
                  <CheckCircle2
                    size={18}
                    style={{
                      color: 'var(--accent)',
                      flexShrink: 0,
                      marginTop: '0.15rem',
                    }}
                  />
                  {item}
                </motion.div>
              ))}
            </div>

            <a href="#amenities" className="btn-dark">
              Explore Amenities
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
