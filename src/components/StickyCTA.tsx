import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappMsg = encodeURIComponent(
    'Hi, I am interested in Goel Ganga Legend County, Bavdhan. Please share details.'
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hide-desktop"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 900,
            padding: '0.75rem',
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            background: 'rgba(6, 8, 13, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-gradient-gold)',
                color: '#0F172A',
                fontSize: '0.80rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-gold)',
              }}
            >
              <Phone size={16} />
              Book Site Visit
            </button>
            <a
              href={`https://wa.me/917744009295?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                background: '#25D366',
                color: '#fff',
                fontSize: '0.80rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
              }}
            >
              <MessageCircle size={16} />
              WhatsApp VIP
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
