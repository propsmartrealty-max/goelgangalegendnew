/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

// ─── Sovereign Vault: localStorage lead ledger ───
function vaultSave(lead: Record<string, unknown>) {
  try {
    const existing = JSON.parse(localStorage.getItem('gg_leads') || '[]');
    existing.push({ ...lead, timestamp: new Date().toISOString(), id: Date.now() });
    localStorage.setItem('gg_leads', JSON.stringify(existing));
  } catch { /* silent fail */ }
}

// ─── UTM Parameter Capture ───
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || 'organic',
    utm_campaign: params.get('utm_campaign') || '',
  };
}

// ─── Inventory Alert & Social Proof ───
export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'visitor' | 'inventory'>('visitor');
  const [count] = useState(() => Math.floor(Math.random() * 8) + 5);

  useEffect(() => {
    // Visitor Count Alert
    const timer1 = setTimeout(() => {
      setType('visitor');
      setVisible(true);
    }, 25000);
    const hide1 = setTimeout(() => setVisible(false), 32000);

    // Inventory Urgency Alert
    const timer2 = setTimeout(() => {
      setType('inventory');
      setVisible(true);
    }, 60000);
    const hide2 = setTimeout(() => setVisible(false), 68000);

    return () => { 
      clearTimeout(timer1); clearTimeout(hide1); 
      clearTimeout(timer2); clearTimeout(hide2); 
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', bottom: 100, left: 20, zIndex: 800,
            padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)',
            background: type === 'inventory' ? 'rgba(201, 150, 59, 0.95)' : 'rgba(9,9,11,0.92)', 
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-light)', maxWidth: 280,
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            color: type === 'inventory' ? '#000' : '#fff',
          }}
        >
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: type === 'inventory' ? '#fff' : '#25D366', 
            animation: 'pulse-glow 2s infinite',
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              {type === 'visitor' ? `${count} people enquired today` : 'Inventory Alert'}
            </div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
              {type === 'visitor' ? 'for Legend County, Bavdhan' : 'Only 4 units left in Building A'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Exit Intent Popup ───
export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !dismissed && !show) setShow(true);
  }, [dismissed, show]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseLeave);
    }, 15000); // Only activate after 15s on page
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => { setShow(false); setDismissed(true); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
          className="hide-mobile"
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-cream)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              maxWidth: 440,
              width: '90%',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
            }}
          >
            <button onClick={dismiss} style={{
              position: 'absolute', top: 16, right: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.05)', color: 'var(--text-dark)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><X size={16} /></button>

            <div style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--accent-dark)',
              marginBottom: '0.75rem',
            }}>
              Wait — Don't Miss This
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: '1.8rem',
              color: 'var(--text-dark)', marginBottom: '0.75rem', lineHeight: 1.2,
            }}>
              Get Exclusive Pricing & Floor Plans
            </h3>
            <p style={{
              fontSize: '0.92rem', color: 'var(--text-dark-muted)',
              marginBottom: '1.5rem', lineHeight: 1.6,
            }}>
              Register now to receive the complete Legend County brochure with 
              insider pricing and available inventory details.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => { dismiss(); window.dispatchEvent(new CustomEvent('openEnquiryModal')); }} 
                className="btn-dark" 
                style={{ flex: 1, justifyContent: 'center', border: 'none', cursor: 'pointer' }}
              >
                Register Interest
              </button>
              <a
                href={`https://wa.me/917744009295?text=${encodeURIComponent('Hi, I am interested in Legend County Bavdhan. Please share pricing.')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '0.85rem', borderRadius: 'var(--radius-pill)',
                  background: '#25D366', color: '#fff', fontSize: '0.8rem',
                  fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                }}
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Timed Slide-in CTA ───
export function TimedCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hide-mobile"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 800,
            padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)',
            background: 'rgba(9,9,11,0.92)', backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-accent)',
            maxWidth: 300, boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
          }}
        >
          <button onClick={() => setShow(false)} style={{
            position: 'absolute', top: 8, right: 8,
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', color: 'var(--text-white-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem',
          }}><X size={14} /></button>

          <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
            Limited Availability
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>
            Stadium Life Phase — Selling Fast
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-white-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Only select units remaining. Book your site visit today.
          </div>
          <button 
            onClick={() => { setShow(false); window.dispatchEvent(new CustomEvent('openEnquiryModal')); }} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', fontSize: '0.72rem', border: 'none', cursor: 'pointer' }}
          >
            Book Site Visit
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Sovereign Dispatch: Multi-channel lead mirroring ───
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyeBBq1zKvx5Cmu3wpgdzuhSw0z465b3iQyH_mPeTJKNAlFBAlm41DBNPkZYBLXimv2/exec';
const EMAIL_MIRROR = 'propsmartrealty@gmail.com'; 

async function dispatchLead(data: Record<string, unknown>) {
  const hardenedData = {
    project: 'Goel Ganga Legend County',
    domain: 'goelgangalegend.com',
    destination: EMAIL_MIRROR,
    ...data,
    captured_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    user_agent: navigator.userAgent,
  };

  // ─── Google Ads & GA4 Enhanced Conversion Tracking ───
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    try {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
        currency: 'INR',
        value: data.configuration === '3.5 BHK' ? 21000000 : 17700000,
        lead_type: String(data.source || 'Website Lead'),
        configuration: String(data.configuration || '3 BHK'),
        event_category: 'Real Estate Leads',
        event_label: 'Goel Ganga Legend County Bavdhan',
      });
    } catch {
      // Analytics non-blocking
    }
  }

  // Layer 1: Cloudflare Pages Edge Function (/api/lead)
  let edgeDispatched = false;
  try {
    const edgeRes = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hardenedData)
    });
    if (edgeRes.ok) {
      edgeDispatched = true;
    }
  } catch {
    // Edge endpoint unavailable or running in offline/local preview, proceed to Layer 2 fallback
  }

  // Layer 2: Google Apps Script Sovereign Webhook (Fallback or Direct Dispatch)
  if (!edgeDispatched && WEBHOOK_URL) {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hardenedData)
        });
        success = true;
      } catch (err) {
        attempt++;
        console.error(`Webhook failed on attempt ${attempt}. Retrying...`, err);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        }
      }
    }
  }

  // Layer 2: Formsubmit AJAX Dispatch (Currently Disabled due to third-party blocking)
  const FORMSUBMIT_ENDPOINT = ''; 
  if (FORMSUBMIT_ENDPOINT) {
    try {
      await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          ...hardenedData,
          _subject: "New High-Intent Lead | Legend County Bavdhan",
          _template: "table",
          _captcha: "false"
        })
      });
    } catch (err) { 
      console.error('Email dispatch fallback failed:', err);
    }
  }
}

// ─── Export vault utility for Contact form ───
export { vaultSave, getUtmParams, dispatchLead };

