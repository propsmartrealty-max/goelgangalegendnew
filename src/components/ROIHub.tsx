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
    <section id="roi-intelligence" className="section-dark" style={{ padding: 'var(--section-pad) 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-10%', left: '-10%', position: 'absolute' }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <TrendingUp size={14} style={{ color: '#10B981' }} />
            Wealth & Appreciation Intelligence
          </span>
          <h2 className="heading-display heading-lg">Bavdhan <span className="gradient-text-gold" style={{ fontStyle: 'italic' }}>ROI Hub</span></h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '620px', margin: '1rem auto 0' }}>
            Calculate the projected capital value of your investment. Bavdhan represents West Pune's highest-growth micro-corridor.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card-bold"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calculator style={{ color: 'var(--accent-gold)' }} size={20} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>Appreciation Calculator</h3>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Initial Investment Value
                </label>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  ₹{(investment / 10000000).toFixed(2)} Cr
                </div>
              </div>
              <input 
                type="range" 
                min="17700000" 
                max="35000000" 
                step="500000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '6px', cursor: 'pointer', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.1em' }}>
                Holding Period (Years)
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: years === y ? 'var(--accent-gradient-gold)' : 'rgba(255,255,255,0.06)',
                      color: years === y ? '#0F172A' : 'var(--text-white)',
                      border: years === y ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {y} Years
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '1.75rem', background: 'rgba(245, 158, 11, 0.12)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>Projected Asset Value (8.5% CAGR)</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FCD34D', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                ₹{(finalValue / 10000000).toFixed(2)} Cr
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.85rem', color: '#10B981', fontWeight: 700, fontSize: '0.92rem' }}>
                <TrendingUp size={18} />
                + ₹{(profit / 100000).toFixed(0)} Lakhs Estimated Gain
              </div>
            </div>
          </motion.div>

          {/* Data Side */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-bold"
              style={{ padding: '1.75rem 2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck style={{ color: '#10B981' }} size={20} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)' }}>Bavdhan Multiplier Effect</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-white-muted)', lineHeight: 1.65 }}>
                Bavdhan recorded <strong style={{ color: '#F8FAFC' }}>12% YoY appreciation</strong> following the multi-level Chandni Chowk flyover. Upcoming Pune Ring Road and Metro feeder lines are projected to drive an additional <strong style={{ color: '#FCD34D' }}>15–20% appreciation by 2028</strong>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card-bold"
              style={{ padding: '1.75rem 2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight style={{ color: 'var(--accent-gold)' }} size={20} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)' }}>Sports Township Premium (4.2% Yield)</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-white-muted)', lineHeight: 1.65 }}>
                Townships with Michael Phelps Swimming and international academies command a <strong style={{ color: '#F8FAFC' }}>22% rental premium</strong> over standalone buildings in West Pune, delivering reliable yields of ₹45,000–₹65,000/month.
              </p>
            </motion.div>

            <div style={{ marginTop: '0.5rem' }}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
              >
                Download Official Bavdhan ROI Monograph
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
