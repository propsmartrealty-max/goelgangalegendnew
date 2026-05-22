import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'About', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Master Layout', href: '#master-layout' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '20px',
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 1000,
          width: 'calc(100% - clamp(2.5rem, 8vw, 5rem))',
          maxWidth: 'var(--container-max)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0.65rem 2rem' : '0.85rem 2.5rem',
            background: scrolled
              ? 'rgba(9, 9, 11, 0.85)'
              : 'rgba(9, 9, 11, 0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 'var(--radius-pill)',
            border: `1px solid ${scrolled ? 'rgba(0, 114, 188, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {/* Left - Brand (Equalized Flex) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
              }}
            >
              <div style={{
                height: 36,
                padding: '4px 10px',
                background: '#fff',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <BrandLogo style={{ height: '38px', width: 'auto' }} />
              </div>
            </a>
          </div>

          {/* Middle - Links (Visual Center) */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: '"Outfit", sans-serif',
                  opacity: 0.8,
                  transition: 'all 0.3s',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.opacity = '1';
                  (e.target as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.8';
                  (e.target as HTMLElement).style.color = 'inherit';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Action (Equalized Flex) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary hide-mobile" 
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.65rem', letterSpacing: '0.12em', border: 'none', cursor: 'pointer' }}
            >
              ENQUIRE
            </button>
            <button
              className="hide-desktop"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--text-white)', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(9, 9, 11, 0.95)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-white)',
                  transition: 'color 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ width: '80%' }}
            >
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent('openEnquiryModal'));
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', border: 'none', cursor: 'pointer', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Phone size={18} />
                ENQUIRE NOW
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
