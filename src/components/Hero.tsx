import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Building, Trophy } from 'lucide-react';

const stats = [
  { icon: <MapPin size={18} />, value: '30', unit: 'Acres', label: 'Sprawling Estate' },
  { icon: <Building size={18} />, value: '12.5', unit: 'Acres', label: 'Sports Arena' },
  { icon: <Trophy size={18} />, value: '9+', unit: '', label: 'Pro Academies' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imgY }}
        className="hero-bg"
      >
        <img
          src="/hero-aerial.webp"
          alt="Goel Ganga Legend County Grand Entrance — Luxury Sports Township in Bavdhan Pune"
          fetchPriority="high"
          loading="eager"
          width={1024}
          height={1024}
          decoding="sync"
          style={{
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: 0.45,
          }}
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,11,20,0.65) 0%, rgba(7,11,20,0.2) 40%, rgba(7,11,20,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(7,11,20,0.85) 0%, transparent 60%, rgba(7,11,20,0.65) 100%)',
        }} />
      </motion.div>

      {/* Decorative Orb */}
      <div className="orb orb-gold" style={{
        width: 600, height: 600,
        top: '10%', right: '-10%',
        position: 'absolute',
      }} />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container"
      >
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 840 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
          >
            <span className="badge-titanium">
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 10px #10B981',
                animation: 'pulse-glow 2s infinite',
              }} />
              30-Acre Sports Township • Bavdhan
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--text-white-muted)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}>
              MahaRERA: P52100054578
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display heading-xl"
            style={{ marginBottom: '1.5rem', color: 'var(--text-white)', lineHeight: 0.95 }}
          >
            Goel Ganga <br />
            <span className="gradient-text-gold" style={{
              fontStyle: 'italic',
              fontWeight: 500,
              display: 'inline-block',
              paddingBottom: '0.2rem'
            }}>
              Legend County
            </span>
            <span style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0
            }}>
              - Premium 2, 3 & 3.5 BHK Flats & Apartments for Sale in Bavdhan Pune Sports Township near Chandni Chowk
            </span>
          </motion.h1>

          {/* Subtitle with Price Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <p
              className="body-lg"
              style={{
                color: 'var(--text-white-muted)',
                maxWidth: 620,
                lineHeight: 1.65,
                fontSize: '1.15rem',
              }}
            >
              Experience West Pune's premier 30-acre sports-first sanctuary near Chandni Chowk.
              Ultra-luxury 3 & 3.5 BHK hill-view residences with 9+ international academies.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1rem',
              padding: '0.4rem 1rem',
              background: 'rgba(245, 158, 11, 0.10)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '8px',
            }}>
              <span style={{ color: '#FCD34D', fontSize: '0.85rem', fontWeight: 700 }}>
                3 & 3.5 BHK Luxury Residences
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span style={{ color: '#F8FAFC', fontSize: '0.85rem', fontWeight: 800 }}>
                Starting ₹1.77 Cr*
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
          >
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Book VIP Site Visit
            </button>
            <a href="#floor-plans" className="btn-outline">
              Explore Floor Plans
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 'min(92%, 760px)',
        }}
      >
        <div
          className="glass-card-bold"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '1.25rem 1.5rem',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid var(--border-light)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <div style={{
                color: 'var(--accent-gold)',
                marginBottom: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.12)',
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'var(--text-white)',
                lineHeight: 1.1,
              }}>
                {stat.value}
                <span style={{ fontSize: '0.7em', fontWeight: 600, opacity: 0.5, marginLeft: '0.2em' }}>
                  {stat.unit}
                </span>
              </div>
              <div style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.3,
          zIndex: 10,
        }}
        className="hide-mobile"
      >
        <ArrowDown size={18} />
      </motion.div>

      <style>{`
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
      `}</style>
    </section>
  );
}
