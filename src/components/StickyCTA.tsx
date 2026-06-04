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
            background: 'rgba(9, 9, 11, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.6rem',
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
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Phone size={16} />
              Enquire
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
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: '#25D366',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
