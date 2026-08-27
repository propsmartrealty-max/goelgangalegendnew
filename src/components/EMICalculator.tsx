import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Landmark, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EMICalculator() {
  const [propertyPrice, setPropertyPrice] = useState(17700000); // 1.77 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.40); // 8.40%
  const [tenureYears, setTenureYears] = useState(20); // 20 Years

  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPercent) / 100);
  }, [propertyPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return propertyPrice - downPaymentAmount;
  }, [propertyPrice, downPaymentAmount]);

  const monthlyEMI = useMemo(() => {
    const monthlyRate = interestRate / (12 * 100);
    const months = tenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  }, [loanAmount, interestRate, tenureYears]);

  const totalPayment = useMemo(() => {
    return monthlyEMI * tenureYears * 12;
  }, [monthlyEMI, tenureYears]);

  const totalInterest = useMemo(() => {
    return totalPayment - loanAmount;
  }, [totalPayment, loanAmount]);

  return (
    <section id="loan-calculator" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Landmark size={14} style={{ color: '#10B981' }} />
            Banking & Loan Intelligence
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Luxury <span className="gradient-text-gold">Home Loan & EMI</span> Calculator
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Plan your investment with precision. Pre-approved home loan lines available at special developer rates from top national banks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Controls Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card-bold"
            style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calculator style={{ color: 'var(--accent-gold)' }} size={20} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>Loan Parameters</h3>
            </div>

            {/* Property Price Slider */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Property Cost
                </label>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  ₹{(propertyPrice / 10000000).toFixed(2)} Cr
                </span>
              </div>
              <input
                type="range"
                min="17700000"
                max="30000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '6px', cursor: 'pointer' }}
              />
            </div>

            {/* Down Payment Slider */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  ₹{(downPaymentAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '6px', cursor: 'pointer' }}
              />
            </div>

            {/* Tenure Buttons */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
                Loan Tenure (Years)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[15, 20, 25, 30].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenureYears(t)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: tenureYears === t ? 'var(--accent-gradient-gold)' : 'rgba(255,255,255,0.06)',
                      color: tenureYears === t ? '#0F172A' : 'var(--text-white)',
                      border: tenureYears === t ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Bank Interest Rate
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  {interestRate.toFixed(2)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="8.0"
                max="10.5"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)', height: '6px', cursor: 'pointer' }}
              />
            </div>
          </motion.div>

          {/* Results & Banks Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gap: '1.5rem' }}
          >
            {/* Primary EMI Display */}
            <div className="glass-card-bold" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                Estimated Monthly EMI
              </div>
              <div style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', fontWeight: 900, color: '#FCD34D', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                ₹{monthlyEMI.toLocaleString('en-IN')}<span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-white-muted)' }}>/mo</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '2rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Principal Amount</span>
                  <strong style={{ fontSize: '1.15rem', color: '#F8FAFC' }}>₹{(loanAmount / 100000).toFixed(1)} Lakhs</strong>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Total Interest</span>
                  <strong style={{ fontSize: '1.15rem', color: '#FCD34D' }}>₹{(totalInterest / 100000).toFixed(1)} Lakhs</strong>
                </div>
              </div>
            </div>

            {/* Approved Banks Trust Badge */}
            <div className="glass-card-bold" style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ShieldCheck size={20} style={{ color: '#10B981' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-white)' }}>Pre-Approved Home Loan Partners</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Goel Ganga Legend County is fully approved by nationalized banking institutions, offering express processing, zero legal scrutiny charges, and concessional interest rates.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {['SBI Home Loans', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)' }}>
                    <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                    {bank}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '1rem', border: 'none', cursor: 'pointer' }}
            >
              Request Custom Bank Eligibility & Sanction Letter <ArrowRight size={16} />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
