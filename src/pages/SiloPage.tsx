import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siloData } from '../data/siloData';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { injectInternalLinks } from '../utils/seoLinker';

export default function SiloPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? siloData[slug] : null;

  if (!data) return <Navigate to="/" replace />;

  return (
    <div style={{ paddingTop: '100px' }}>
      <SEO 
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        canonical={`/${data.slug}`}
        faq={data.faq}
      />

      {/* Hero Section */}
      <section className="section-dark" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0' }}>
        <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-20%', right: '-10%', position: 'absolute' }} />
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="label" 
              style={{ marginBottom: '1rem', display: 'block' }}
            >
              Legend County · Silo Monograph
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-display heading-lg" 
              style={{ marginBottom: '1.5rem' }}
            >
              {data.heading}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="body-lg" 
              style={{ color: 'var(--text-white-muted)', marginBottom: '2rem' }}
            >
              {data.subheading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-primary"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                Enquire for Inventory
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container" style={{ padding: '1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', opacity: 0.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--accent)' }}>{slug?.replace(/-/g, ' ')}</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="section-light" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem' }}>
            <div 
              className="silo-content-body"
              style={{ display: 'grid', gap: '1.5rem' }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const anchor = target.closest('a');
                if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
                  e.preventDefault();
                  const href = anchor.getAttribute('href');
                  if (href) {
                    navigate(href);
                  }
                }
              }}
            >
              {data.content.map((p, i) => (
                <p 
                  key={i} 
                  className="body-md" 
                  style={{ color: 'var(--text-dark-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: injectInternalLinks(p, data.slug) }}
                />
              ))}
              <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                  30-Acre Integrated Township
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                  12.5 Acres of Sports Infrastructure
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                  RERA Registered: P52100054578
                </div>
              </div>
            </div>
            
            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <div style={{ padding: '2rem', background: 'var(--bg-white)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-lg)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Get Exclusive Offers</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-dark-muted)', marginBottom: '1.5rem' }}>Download the complete monograph and price sheet for this configuration.</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                  className="btn-dark" 
                  style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-dark" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="label">FAQ</span>
            <h2 className="heading-display heading-md">Common Questions</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
            {data.faq.map((item, i) => (
              <div key={i} style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--accent)' }}>{item.question}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Styles for Silo internal linking */}
      <style>{`
        .silo-content-body a {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px dashed var(--accent);
          transition: all 0.3s;
          font-weight: 600;
        }
        .silo-content-body a:hover {
          color: var(--text-dark);
          border-bottom-style: solid;
        }
      `}</style>

      <Contact />
    </div>
  );
}
