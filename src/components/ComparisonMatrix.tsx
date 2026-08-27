import { motion } from 'framer-motion';
import { Check, X, Trophy, Shield, Droplets, MapPin, TrendingUp, Sparkles } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Professional Sports Infrastructure',
    icon: <Trophy size={18} className="text-amber-400" />,
    legendCounty: '12.5 Acres Arena + 9 Academies (Michael Phelps, Dhoni Tagda Raho, South United Football)',
    standalone: 'Basic 500 sq.ft gym or small lawn',
    valleyProjects: 'Scattered clubhouse amenities without international coaching'
  },
  {
    feature: 'Transit & Chandni Chowk Commute',
    icon: <MapPin size={18} className="text-amber-400" />,
    legendCounty: '3 Mins to Chandni Chowk flyover (Signal-free to Kothrud & Hinjewadi)',
    standalone: 'Bottlenecked inside narrow internal city roads',
    valleyProjects: 'Isolated deep valley access with 20+ min detour'
  },
  {
    feature: 'Water Security & Municipal Supply',
    icon: <Droplets size={18} className="text-amber-400" />,
    legendCounty: 'PMC Municipal Water Supply + Multi-stage Rainwater Harvesting Network',
    standalone: 'Heavy reliance on private daily water tankers',
    valleyProjects: 'Groundwater depletion risks & private tankers'
  },
  {
    feature: 'Layout Efficiency & Balcony Views',
    icon: <Sparkles size={18} className="text-amber-400" />,
    legendCounty: '1,124–1,440 sq.ft double-aspect balconies overlooking NDA reserved hills',
    standalone: 'Cramped 750–850 sq.ft facing adjacent concrete walls',
    valleyProjects: 'Standard carpet with steep gradient slopes'
  },
  {
    feature: 'Rental Yield & Capital Appreciation',
    icon: <TrendingUp size={18} className="text-amber-400" />,
    legendCounty: '4.2% Rental Yield (₹45k–₹65k/mo) + 12% YoY Historical Appreciation',
    standalone: '2.4%–2.8% Average rental yield with high vacancy',
    valleyProjects: '3.0% Rental yield with limited corporate tenant pool'
  },
  {
    feature: 'Legal Clearances & Approvals',
    icon: <Shield size={18} className="text-amber-400" />,
    legendCounty: 'MahaRERA: P52100054578, Title Clear, Pre-Approved by SBI/HDFC/ICICI',
    standalone: 'Varying developer compliance & delayed OC certificates',
    valleyProjects: 'Complex environmental clearance phases'
  }
];

export default function ComparisonMatrix() {
  return (
    <section id="comparison" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-elevated)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Trophy size={14} style={{ color: '#F59E0B' }} />
            Objective Market Benchmark
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Why <span className="gradient-text-gold">Legend County</span> Stands Unrivaled
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Compare Goel Ganga Legend County against standard standalone buildings and isolated valley developments in West Pune.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-bold hide-mobile"
          style={{ padding: '2rem', overflowX: 'auto' }}
        >
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-white-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '1rem 1.5rem', width: '28%' }}>Parameter</th>
                <th style={{
                  padding: '1rem 1.5rem',
                  width: '36%',
                  background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                  borderTop: '2px solid var(--accent-gold)',
                  borderLeft: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRight: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#FCD34D',
                  fontWeight: 900,
                  fontSize: '0.9rem'
                }}>
                  👑 Goel Ganga Legend County
                </th>
                <th style={{ padding: '1rem 1.5rem', width: '18%', opacity: 0.7 }}>Standalone Buildings</th>
                <th style={{ padding: '1rem 1.5rem', width: '18%', opacity: 0.7 }}>Valley Projects</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--text-white)', fontSize: '0.92rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {row.icon}
                      {row.feature}
                    </div>
                  </td>
                  <td style={{
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(245, 158, 11, 0.08)',
                    borderLeft: '1px solid rgba(245, 158, 11, 0.25)',
                    borderRight: '1px solid rgba(245, 158, 11, 0.25)',
                    color: '#F8FAFC',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    lineHeight: 1.5
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Check size={13} style={{ color: '#10B981' }} />
                      </div>
                      <span>{row.legendCounty}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-white-subtle)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <X size={15} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
                      <span>{row.standalone}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-white-subtle)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <X size={15} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px', opacity: 0.8 }} />
                      <span>{row.valleyProjects}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Comparison Cards */}
        <div className="hide-desktop" style={{ display: 'grid', gap: '1.5rem' }}>
          {comparisonData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-bold"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                {item.icon}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-white)' }}>{item.feature}</h3>
              </div>

              <div style={{
                padding: '1rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '0.85rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FCD34D', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  👑 Goel Ganga Legend County
                </div>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.5 }}>{item.legendCounty}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-white-muted)' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.2rem' }}>Standalone</span>
                  {item.standalone}
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.2rem' }}>Valley Projects</span>
                  {item.valleyProjects}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
            className="btn-primary"
            style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}
          >
            Download Full Project Comparison Monograph
          </button>
        </div>
      </div>
    </section>
  );
}
