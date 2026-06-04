import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, User, Mail, Home, MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import { vaultSave, getUtmParams, dispatchLead } from './ConversionEngine';

const WHATSAPP_NUMBER = '917744009295';

function formatWhatsAppMessage(data: Record<string, string>) {
  return encodeURIComponent(
    `🏠 *New Legend County Enquiry*\n\n` +
    `👤 Name: ${data.name}\n` +
    `📱 Phone: ${data.phone}\n` +
    `📧 Email: ${data.email || 'N/A'}\n` +
    `🏡 Config: ${data.config}\n` +
    `💬 Message: ${data.message || 'N/A'}\n\n` +
    `Source: Website`
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', config: '3 BHK', message: '' });
  const [honeypot, setHoneypot] = useState(''); // Anti-spam

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam check
    if (honeypot) return;

    // Phone validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    const utmParams = getUtmParams();
    const leadData = {
      ...formData,
      ...utmParams,
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
    };

    // ─── Layer 1: Sovereign Vault (localStorage backup) ───
    vaultSave(leadData);
    dispatchLead(leadData);

    // ─── Layer 2: WhatsApp Protocol (instant dispatch) ───
    const waMsg = formatWhatsAppMessage(formData);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, '_blank');

    // ─── Layer 3: Email Mirror (mailto fallback) ───
    const mailSubject = encodeURIComponent(`LEGEND COUNTY: New Enquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(
      `NEW LEAD CAPTURED\n` +
      `-----------------\n` +
      `Project: Goel Ganga Legend County\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Configuration: ${formData.config}\n` +
      `Message: ${formData.message}\n` +
      `-----------------\n` +
      `Captured via: Contact Form\n` +
      `Sent to: propsmartrealty@gmail.com`
    );
    const mailLink = document.createElement('a');
    mailLink.href = `mailto:propsmartrealty@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    mailLink.style.display = 'none';
    document.body.appendChild(mailLink);
    // Don't auto-click mailto to avoid popup blockers — vault + whatsapp are primary

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', config: '3 BHK', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '1rem 1rem 1rem 3rem',
    borderRadius: 'var(--radius-md)', background: 'var(--bg-white)',
    border: '1.5px solid rgba(0,0,0,0.08)', fontSize: '0.92rem',
    fontWeight: 500, color: 'var(--text-dark)',
    transition: 'all 0.3s var(--ease-out)',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
    color: 'var(--accent)', opacity: 0.6, pointerEvents: 'none',
  };

  return (
    <section id="contact" className="section-light" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(201,150,59,0.06)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }}>
          
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="label" style={{ color: 'var(--accent-dark)', display: 'block', marginBottom: '1rem' }}>Get in Touch</span>
            <h2 className="heading-display heading-lg" style={{ color: 'var(--text-dark)', marginBottom: '1.25rem' }}>
              Begin Your{' '}<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Legend</span>
            </h2>
            <p className="body-lg" style={{ color: 'var(--text-dark-muted)', marginBottom: '2.5rem', maxWidth: 440 }}>
              Register for exclusive project details, site visit scheduling, and preferred payment plans. Our team will connect within 30 minutes.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {[
                { icon: <Phone size={20} />, title: 'Inquiry', value: 'Request Callback', href: '#' },
                { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: 'Chat with us instantly', href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I am interested in Legend County Bavdhan.')}` },
                { icon: <Home size={20} />, title: 'Visit', value: 'Sr. No. 34, Bavdhan Budruk, Pune', href: '#location' },
              ].map((item, i) => (
                <a key={i} href={item.href} 
                  onClick={(e) => {
                    if (item.value === 'Request Callback') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('openEnquiryModal'));
                    }
                  }}
                  target={item.title === 'WhatsApp' ? '_blank' : undefined} 
                  rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.25rem', borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.3s var(--ease-out)', boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget).style.transform = 'translateY(-2px)'; (e.currentTarget).style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.transform = 'translateY(0)'; (e.currentTarget).style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-sm)',
                    background: item.title === 'WhatsApp' ? 'rgba(37,211,102,0.1)' : 'var(--accent-glow)',
                    border: item.title === 'WhatsApp' ? '1px solid rgba(37,211,102,0.2)' : '1px solid rgba(201,150,59,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.title === 'WhatsApp' ? '#25D366' : 'var(--accent)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: '0.15rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-white)', border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
            }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={56} style={{ color: '#25D366', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>Enquiry Sent!</h3>
                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Your enquiry has been dispatched via WhatsApp.</p>
                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.82rem', opacity: 0.6 }}>Our team will connect within 30 minutes.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '0.35rem' }}>Register Your Interest</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-dark-muted)' }}>Get exclusive pricing & floor plans</p>
                  </div>

                  {/* Honeypot — hidden anti-spam */}
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div style={{ position: 'relative' }}>
                    <User size={16} style={iconStyle} />
                    <input type="text" placeholder="Full Name *" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={iconStyle} />
                    <input type="tel" placeholder="Phone Number *" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={iconStyle} />
                    <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Home size={16} style={iconStyle} />
                    <select value={formData.config} onChange={(e) => setFormData({...formData, config: e.target.value})} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                      <option value="3 BHK">3 BHK — from ₹1.77 Cr*</option>
                      <option value="3.5 BHK">3.5 BHK — from ₹2.10 Cr*</option>
                    </select>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <MessageSquare size={16} style={{ ...iconStyle, top: '1.5rem', transform: 'none' }} />
                    <textarea placeholder="Message (optional)" rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', marginTop: '0.5rem' }}>
                    <Send size={16} /> Submit Enquiry
                  </button>

                  <p style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                    By submitting, you agree to receive communication from Goel Ganga Developments.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
