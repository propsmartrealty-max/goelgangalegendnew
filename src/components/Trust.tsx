import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <section style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      padding: 'clamp(3rem, 5vw, 4.5rem) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: '-50%', left: '30%', position: 'absolute' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2rem',
          textAlign: 'center',
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

        {/* Developer Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(2rem, 3vw, 3rem)',
            paddingTop: 'clamp(2rem, 3vw, 3rem)',
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
