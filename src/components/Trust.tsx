import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, QrCode, CheckCircle2 } from 'lucide-react';

const counters = [
  { value: 30, suffix: '', unit: 'Acres', label: 'Integrated Township' },
  { value: 1500, suffix: '+', unit: '', label: 'Families & Growing' },
  { value: 9, suffix: '+', unit: '', label: 'Sports Academies' },
  { value: 40, suffix: '+', unit: 'Yrs', label: 'Developer Legacy' },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export default function Trust() {
  return (
    <section id="trust" style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: '-50%', left: '30%', position: 'absolute' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Animated Township Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2rem',
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          {counters.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'var(--accent)',
                marginBottom: '0.25rem',
              }}>
                <AnimatedCounter target={item.value} suffix={item.suffix} />
                {item.unit && (
                  <span style={{ fontSize: '0.5em', fontWeight: 600, opacity: 0.6, marginLeft: '0.15em' }}>
                    {item.unit}
                  </span>
                )}
              </div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-white-muted)',
                letterSpacing: '0.02em',
              }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Official MahaRERA & QR Code Verification Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card-bold"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            borderRadius: '24px',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 21, 39, 0.9) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Left: Statutory Compliance Details */}
          <div style={{ flex: '1 1 340px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34D399', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              <ShieldCheck size={16} />
              100% Government Regulatory Compliance
            </div>

            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '0.75rem' }}>
              MahaRERA Registration Number: <br />
              <span style={{ color: '#FCD34D', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                P52100054578
              </span>
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-white-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Goel Ganga Legend County Bavdhan is fully sanctioned by PMC &amp; PMRDA. Clear title, environmental approvals, and Phase delivery milestones are registered and legally safeguarded under Maharashtra Real Estate Regulatory Authority.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600 }}>
                <CheckCircle2 size={16} style={{ color: '#34D399' }} /> 100% Clear Title Land Parcel
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600 }}>
                <CheckCircle2 size={16} style={{ color: '#34D399' }} /> Bank Escrow Account Protected
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600 }}>
                <CheckCircle2 size={16} style={{ color: '#34D399' }} /> Sanctioned 30-Acre Master Layout
              </div>
            </div>

            <a
              href="https://maharera.maharashtra.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                fontSize: '0.82rem',
                padding: '0.8rem 1.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                textDecoration: 'none',
              }}
            >
              Verify on MahaRERA Official Portal <ExternalLink size={15} />
            </a>
          </div>

          {/* Right: Framed Official MahaRERA QR Code */}
          <div style={{
            flex: '0 0 auto',
            margin: '0 auto',
            textAlign: 'center',
            background: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#0F172A', fontWeight: 800, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.65rem' }}>
              <QrCode size={16} style={{ color: '#B45309' }} />
              Official MahaRERA QR Code
            </div>

            <div style={{ width: 140, height: 140, margin: '0 auto', overflow: 'hidden', borderRadius: '12px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/rera-qr-official.jpg"
                alt="Official MahaRERA QR Code for Goel Ganga Legend County Bavdhan - P52100054578"
                title="Scan with Mobile Camera to verify on Government MahaRERA Portal"
                width={140}
                height={140}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <span style={{ display: 'block', fontSize: '0.68rem', color: '#475569', fontWeight: 700, marginTop: '0.65rem' }}>
              Scan with Phone Camera to Verify
            </span>
          </div>
        </motion.div>

        {/* Developer Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
            paddingTop: 'clamp(2rem, 3vw, 2.5rem)',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-white-muted)',
            fontWeight: 500,
          }}>
            By <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Goel Ganga Group</span>
            {' · '}40+ Years of Excellence · 100+ Projects · Trusted by 50,000+ Families
          </p>
        </motion.div>
      </div>
    </section>
  );
}
