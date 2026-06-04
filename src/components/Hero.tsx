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
          background: 'linear-gradient(to bottom, rgba(9,9,11,0.6) 0%, transparent 40%, rgba(9,9,11,0.9) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(9,9,11,0.8) 0%, transparent 50%, rgba(9,9,11,0.6) 100%)',
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
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 800 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="label" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              background: 'var(--accent-glow)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-accent)',
              marginBottom: '1.5rem',
              fontSize: '0.65rem',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'pulse-glow 2s infinite',
              }} />
              Pune's Premier Sports Township
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display heading-xl"
            style={{ marginBottom: '1.5rem', color: 'var(--text-white)' }}
          >
            Goel Ganga <br />
            <span style={{
              color: 'var(--accent)',
              fontStyle: 'italic',
              position: 'relative',
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="body-lg"
            style={{
              color: 'var(--text-white-muted)',
              maxWidth: 560,
              marginBottom: '2.5rem',
            }}
          >
            Experience Bavdhan's iconic 30-acre sports-first township. Luxury 3 & 3.5 BHK residences
            with 9+ international sports academies, starting ₹1.77 Cr*.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Book a Site Visit
            </button>
            <a href="#floor-plans" className="btn-outline">
              View Floor Plans
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
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 'min(90%, 700px)',
        }}
      >
        <div
          className="glass"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            borderRadius: 'var(--radius-lg)',
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
                gap: '0.4rem',
              }}
            >
              <div style={{ color: 'var(--accent)', marginBottom: '0.25rem' }}>{stat.icon}</div>
              <div style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.02em',
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
