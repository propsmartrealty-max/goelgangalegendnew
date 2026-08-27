import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, ShieldCheck, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { vaultSave, getUtmParams, dispatchLead } from './ConversionEngine';

export default function SiteVisitBooking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: 'Tomorrow',
    timeSlot: '11:00 AM - 01:00 PM',
    cabRequired: true,
    pickupLocation: 'Kothrud / Bavdhan',
    unitType: '3 BHK Grand'
  });

  const [submitted, setSubmitted] = useState(false);

  const dates = [
    { label: 'Today', sub: 'Instant VIP Slot' },
    { label: 'Tomorrow', sub: 'Showflat Tour' },
    { label: 'This Saturday', sub: 'Weekend Experiential' },
    { label: 'This Sunday', sub: 'Family Sports Tour' }
  ];

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const utmParams = getUtmParams();
    const leadData = {
      ...formData,
      ...utmParams,
      page: window.location.pathname,
      source: 'VIP_Site_Visit_Calendar',
      notes: `Site Visit on ${formData.date} at ${formData.timeSlot} | Cab: ${formData.cabRequired ? 'Yes - ' + formData.pickupLocation : 'No'}`
    };

    vaultSave(leadData);
    dispatchLead(leadData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="site-visit-booking" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-elevated)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Calendar size={14} style={{ color: '#F59E0B' }} />
            Personalized Experiential Site Tour
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Book Your <span className="gradient-text-gold">VIP Site Visit</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Experience the 12.5-acre sports arena, inspect the ready show apartments, and enjoy complimentary luxury chauffeur cab pickup.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-bold"
          style={{ maxWidth: '840px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle2 size={36} style={{ color: '#10B981' }} />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.75rem' }}>VIP Site Visit Confirmed!</h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-white-muted)', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Our Relationship Manager has reserved your slot for <strong style={{ color: '#FCD34D' }}>{formData.date} at {formData.timeSlot}</strong>.
                {formData.cabRequired && <span> Chauffeur pickup details will be sent to <strong style={{ color: '#F8FAFC' }}>{formData.phone}</strong> via WhatsApp.</span>}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                <ShieldCheck size={16} /> MahaRERA Reg: P52100054578
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
              
              {/* Step 1: Select Date */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                  <Calendar size={16} /> 1. Select Preferred Day
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, date: d.label })}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: formData.date === d.label ? 'var(--accent-gradient-gold)' : 'rgba(255,255,255,0.04)',
                        color: formData.date === d.label ? '#0F172A' : 'var(--text-white)',
                        border: formData.date === d.label ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{d.label}</div>
                      <div style={{ fontSize: '0.72rem', opacity: formData.date === d.label ? 0.8 : 0.6, marginTop: '2px' }}>{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Time Slot */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                  <Clock size={16} /> 2. Preferred Arrival Window
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: formData.timeSlot === slot ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.04)',
                        color: formData.timeSlot === slot ? '#FCD34D' : 'var(--text-white)',
                        border: formData.timeSlot === slot ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.08)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Complimentary Chauffeur Cab Option */}
              <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-lg)', border: '1px dashed rgba(245, 158, 11, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: formData.cabRequired ? '1rem' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Car size={18} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-white)' }}>Complimentary Chauffeur Cab Pickup</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)' }}>AC Luxury Sedan pickup from your residence in Pune / PCMC</div>
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.cabRequired}
                      onChange={(e) => setFormData({ ...formData, cabRequired: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FCD34D' }}>{formData.cabRequired ? 'Requested' : 'Self-Drive'}</span>
                  </label>
                </div>

                {formData.cabRequired && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pickup Neighborhood / Locality</label>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="e.g. Kothrud, Baner, Aundh, Hinjewadi, Viman Nagar..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Step 4: Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Unit Interest</label>
                  <select
                    value={formData.unitType}
                    onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: '#0B0F17',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="3 BHK Grand (1124 sq.ft)">3 BHK Grand (1,124 sq.ft.)</option>
                    <option value="3.5 BHK Elite (1380 sq.ft)">3.5 BHK Elite (1,380 sq.ft.)</option>
                    <option value="4 BHK Sky Duplex">4 BHK Sky Duplex</option>
                    <option value="2 BHK Smart Home">2 BHK Smart Home</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
              >
                <Send size={18} /> Confirm VIP Site Visit & Chauffeur Request
              </button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
