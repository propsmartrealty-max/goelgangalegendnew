import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function ROIHub() {
  const [investment, setInvestment] = useState(17700000); // 1.77 Cr
  const [years, setYears] = useState(5);
  
  const appreciationRate = 0.085; // 8.5% historical CAGR for premium Bavdhan properties
  
  const finalValue = useMemo(() => {
    return Math.round(investment * Math.pow(1 + appreciationRate, years));
  }, [investment, years]);

  const profit = finalValue - investment;

  return (
    <section id="roi-intelligence" className="section-dark" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-10%', left: '-10%', position: 'absolute' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label">Wealth Intelligence</span>
          <h2 className="heading-display heading-lg">Bavdhan <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>ROI Hub</span></h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Calculate the projected value of your legacy. Legend County is located in Pune's highest-growth micro-market.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '4rem' }}>
          
          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Calculator style={{ color: 'var(--accent)' }} size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Appreciation Projection</h3>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                Initial Investment (₹)
              </label>
              <input 
                type="range" 
                min="17700000" 
                max="35000000" 
                step="500000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)', marginBottom: '1rem' }}
              />
              <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
                ₹{(investment / 10000000).toFixed(2)} Cr
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                Holding Period (Years)
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: years === y ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      color: years === y ? '#000' : '#fff',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {y} Years
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '2rem', background: 'rgba(201,150,59,0.1)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--accent)' }}>
              <div style={{ fontSize: '0.88rem', opacity: 0.7, marginBottom: '0.5rem' }}>Projected Asset Value</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-serif)' }}>
                ₹{(finalValue / 10000000).toFixed(2)} Cr
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#10b981', fontWeight: 700 }}>
                <TrendingUp size={18} />
                + ₹{(profit / 100000).toFixed(0)} Lakhs Estimated Gain
              </div>
            </div>
          </motion.div>

          {/* Data Side */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ padding: '2rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <ShieldCheck style={{ color: 'var(--accent)' }} size={24} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Bavdhan Multiplier Effect</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>
                Bavdhan has witnessed a **12% YoY appreciation** following the completion of the Chandni Chowk multi-level flyover. Upcoming Metro connectivity is projected to boost values by another **15-20%** by 2027.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ padding: '2rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <ArrowUpRight style={{ color: 'var(--accent)' }} size={24} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Demand Signal: Sports First</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>
                Integrated townships with professional sports academies command a **22% rental premium** over standalone buildings in Pune, ensuring higher yields for investors.
              </p>
            </motion.div>

            <div style={{ marginTop: '1rem' }}>
              <a href="#contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Request Market Report</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
