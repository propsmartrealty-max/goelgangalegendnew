import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function OnRoadPriceCalculator() {
  const [unitType, setUnitType] = useState<'3bhk' | '3.5bhk' | '4bhk'>('3bhk');

  const unitBasePrices = {
    '3bhk': { name: '3 BHK Grand Residence (1,124 sq.ft.)', basePrice: 17700000 },
    '3.5bhk': { name: '3.5 BHK Elite Residence (1,380 sq.ft.)', basePrice: 21000000 },
    '4bhk': { name: '4 BHK Sky Duplex / Penthouse (2,150 sq.ft.)', basePrice: 26500000 }
  };

  const current = unitBasePrices[unitType];

  // Maharashtra Real Estate Tax Structure (Pune Municipal Corporation)
  // Stamp Duty: 5% + LBT 1% + Metro Cess 1% = 7% Total Stamp Duty
  // Registration: ₹30,000 Flat for properties above ₹30L
  // GST: 5% on under-construction (0% for ready with OC)
  // Legal & Society Formation: ₹50,000 approx

  const stampDutyRate = 0.07; // 7% total stamp duty + cess
  const gstRate = 0.05; // 5% GST

  const breakdown = useMemo(() => {
    const base = current.basePrice;
    const stampDuty = Math.round(base * stampDutyRate);
    const registration = 30000;
    const gst = Math.round(base * gstRate);
    const legalSociety = 50000;
    const totalOnRoad = base + stampDuty + registration + gst + legalSociety;

    return {
      base,
      stampDuty,
      registration,
      gst,
      legalSociety,
      totalOnRoad
    };
  }, [current]);

  return (
    <section id="on-road-pricing" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-elevated)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Receipt size={14} style={{ color: '#F59E0B' }} />
            Total Cost Transparency
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Maharashtra <span className="gradient-text-gold">All-Inclusive On-Road</span> Cost Sheet
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Calculate the exact total disbursement cost including Maharashtra Stamp Duty, Metro Cess, Registration, and GST.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-bold"
          style={{ maxWidth: '840px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {/* Unit Selector */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { id: '3bhk', label: '3 BHK Grand (₹1.77 Cr*)' },
              { id: '3.5bhk', label: '3.5 BHK Elite (₹2.10 Cr*)' },
              { id: '4bhk', label: '4 BHK Sky Duplex (₹2.65 Cr*)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setUnitType(tab.id as any)}
                style={{
                  flex: 1,
                  minWidth: '180px',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: unitType === tab.id ? 'var(--accent-gradient-gold)' : 'rgba(255,255,255,0.05)',
                  color: unitType === tab.id ? '#0F172A' : 'var(--text-white)',
                  border: unitType === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Breakdown Table */}
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-white)', fontSize: '0.95rem' }}>Base Property Agreement Cost</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-white-subtle)' }}>Includes covered parking & clubhouse subscription</span>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-white)' }}>
                ₹{(breakdown.base / 10000000).toFixed(2)} Cr
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-white)', fontSize: '0.95rem' }}>Stamp Duty (5% + 1% LBT + 1% Metro Cess)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-white-subtle)' }}>Official Maharashtra Government IGR revenue</span>
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FCD34D' }}>
                ₹{(breakdown.stampDuty / 100000).toFixed(2)} Lakhs
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-white)', fontSize: '0.95rem' }}>Government Registration Fee</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-white-subtle)' }}>Standard flat government fee for properties {'>'} ₹30L</span>
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FCD34D' }}>
                ₹30,000
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-white)', fontSize: '0.95rem' }}>GST (5% under-construction)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-white-subtle)' }}>Input tax credited construction GST</span>
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FCD34D' }}>
                ₹{(breakdown.gst / 100000).toFixed(2)} Lakhs
              </span>
            </div>
          </div>

          {/* Grand Total Bar */}
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                Total All-Inclusive On-Road Cost
              </div>
              <div style={{ fontSize: 'clamp(2.2rem, 5vw, 2.8rem)', fontWeight: 900, color: '#FCD34D', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                ₹{(breakdown.totalOnRoad / 10000000).toFixed(2)} Cr*
              </div>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary"
              style={{ padding: '0.9rem 2rem', fontSize: '0.92rem' }}
            >
              <Download size={16} /> Download Official Payment Schedule
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
