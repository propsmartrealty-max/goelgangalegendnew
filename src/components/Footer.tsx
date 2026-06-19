import { ArrowUp } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { Link, useNavigate } from 'react-router-dom';

const footerLinks = [
  { title: 'Quick Links', links: [
    { label: 'About', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ]},
  { title: 'Configurations', links: [
    { label: '3 BHK — ₹1.77 Cr*', href: '#floor-plans' },
    { label: '3.5 BHK — ₹2.10 Cr*', href: '#floor-plans' },
  ]},
  { title: 'Proximity', links: [
    { label: 'Chandni Chowk — 3 min', href: '#location' },
    { label: 'Kothrud — 8 min', href: '#location' },
    { label: 'Hinjewadi IT — 22 min', href: '#location' },
  ]},
];

export default function Footer() {
  const navigate = useNavigate();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-light)', position: 'relative' }}>
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: '2rem' }}>
        
        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                height: 40,
                padding: '4px 12px',
                background: '#fff',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}>
                <BrandLogo style={{ height: '42px', width: 'auto' }} />
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-white-muted)', maxWidth: 280 }}>
              Pune's premier 30-acre sports-first township. Luxury 3 & 3.5 BHK residences in Bavdhan.
            </p>
          </div>

          {/* West Pune Luxury Corridors */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>West Pune Corridors</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-pune-real-estate-market" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Pune Real Estate</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-west-pune-real-estate-market" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>West Pune Market</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-real-estate-baner-pashan-link-road" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Baner Pashan Link Road</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-apartments-chandni-chowk" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Chandni Chowk Link</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-schools-hospitals-near-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Infrastructure & Schools</Link></li>
            </ul>
          </div>

          {/* Comparative Hub */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>Comparative Hub</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-flats-kharadi-vs-bavdhan-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Kharadi vs Bavdhan</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-homes-koregaon-park-vs-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Koregaon Park vs Bavdhan</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-apartments-baner-vs-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Baner vs Bavdhan</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-flats-kothrud-vs-bavdhan-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Kothrud vs Bavdhan</Link></li>
            </ul>
          </div>

          {/* Configurations */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>Configurations</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-2bhk-flats-bavdhan-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>2 BHK Residences</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-3bhk-flats-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>3 BHK Residences</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-3.5-bhk-flats-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>3.5 BHK Residences</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-3bhk-flats-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Luxury 3 BHK Pune</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-investment-flats-bavdhan-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Investment Properties</Link></li>
            </ul>
          </div>

          {/* Elite Sports & Legal */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>Experience & Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-sports-township-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Sports Township</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-sports-township-pune-stadium-life" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Sports Stadium Life</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-michael-phelps-swimming-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Phelps Swimming</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-tagda-raho-dhoni-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Tagda Raho Center</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-luxury-projects-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Luxury Projects</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-best-investment-property-pune" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>Best Investment Property</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/goel-ganga-legend-county-rera-legal-compliance-bavdhan" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)' }}>MahaRERA Status</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="/sitemap.xml" className="footer-link" style={{ fontSize: '0.88rem', color: 'var(--accent)' }}>Digital Sitemap</a></li>
            </ul>
          </div>

          {/* Goel Ganga Portfolio */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>Goel Ganga Estates</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-white)' }}>Ganga Platino (Kharadi)</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', lineHeight: '1.4', marginTop: '0.15rem' }}>Award-winning premium residences featuring luxury waterfront parks.</p>
              </li>
              <li style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-white)' }}>Ganga Dham Towers (Market Yard)</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', lineHeight: '1.4', marginTop: '0.15rem' }}>Ultra-luxury sky-mansions with 360-degree scenic Pune views.</p>
              </li>
              <li style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-white)' }}>Ganga Asmi (Wakad)</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', lineHeight: '1.4', marginTop: '0.15rem' }}>Premium high-rise tower homes situated in the Wakad IT corridor.</p>
              </li>
              <li style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-white)' }}>Ganga Trueno (Viman Nagar)</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-white-muted)', lineHeight: '1.4', marginTop: '0.15rem' }}>Landmark Grade-A retail and corporate commercial structure.</p>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>{col.title}</h4>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {col.links.map((link) => (
                  <a key={link.label} href={link.href} onClick={(e) => handleClick(e, link.href)}
                    style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-white-muted)')}
                  >{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-white-subtle)' }}>
            © {new Date().getFullYear()} Goel Ganga Developments. All rights reserved. RERA: <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>P52100054578</a>
          </div>
          <button onClick={scrollTop} aria-label="Scroll to top" style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-white-muted)', transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg-primary)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-white-muted)'; }}
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* SEO Injection Cloud */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', marginTop: '2rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem', opacity: 0.6 }}>Project Metadata & Silo Index</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', opacity: 0.3 }}>
            {[
              'Pune Real Estate', 'West Pune Real Estate Market', 'luxury real estate Baner Pashan Link Road market',
              'high end luxury Baner Pashan Link Road', 'Baner Pashan Link Road residential projects', 'properties near Baner Pashan Link Road',
              'Goel Ganga Legend County Pune reviews', 'Goel Ganga Legend County Bavdhan price list', 'Goel Ganga Legend County Bavdhan brochure pdf',
              'Goel Ganga Legend County Bavdhan possession', 'Goel Ganga Legend County Bavdhan photos', 'Goel Ganga Legend County Bavdhan master plan',
              'Goel Ganga Legend County Bavdhan floor plans', 'Goel Ganga Legend County Bavdhan resale price', 'Goel Ganga Legend County Bavdhan rental yield',
              'Goel Ganga Legend County Bavdhan location map', 'Goel Ganga Legend County Bavdhan construction update', 'Goel Ganga Legend County Bavdhan sample flat video',
              'Goel Ganga Legend County Bavdhan virtual tour', 'Goel Ganga Legend County Bavdhan booking offers', 'Goel Ganga Legend County Bavdhan luxury project',
              'Goel Ganga Legend County Bavdhan investment opportunity', 'Goel Ganga Legend County Bavdhan premium township', 'Goel Ganga Legend County Bavdhan gated project',
              'Goel Ganga Legend County Bavdhan ready homes', 'Goel Ganga Legend County Bavdhan smart apartments', 'luxury flats in Bavdhan Pune',
              'premium apartments in Bavdhan Pune', 'high rise apartments in Bavdhan', 'scenic view flats in Bavdhan', 'forest facing apartments Pune',
              'nature homes in Bavdhan', 'premium township in Bavdhan Pune', 'modern gated community Bavdhan', 'luxury investment apartments Pune',
              'family homes in Pune West', 'flats with modern amenities Pune', 'residential township Bavdhan', 'apartments near Chandni Chowk Pune',
              'homes near Baner and Bavdhan', 'investment homes near Hinjewadi', 'luxury apartments near Kothrud', 'premium residences near NDA Road',
              'flats near Pune Bangalore Highway', 'premium towers near Bavdhan hills', 'luxury homes with clubhouse Bavdhan'
            ].map((kw) => (
              <span key={kw} style={{ fontSize: '0.6rem', color: 'var(--text-white-subtle)' }}>{kw} · </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
