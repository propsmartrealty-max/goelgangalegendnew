import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const specs = [
  { label: 'Project Name', value: 'Goel Ganga Legend County' },
  { label: 'Developer', value: 'Goel Ganga Developments (Trusted Pune Developer)' },
  { label: 'Location', value: 'Bavdhan Budruk, Near Chandni Chowk, Pune West' },
  { label: 'Configuration', value: 'Luxury 2 BHK, 3 BHK & 3.5 BHK Flats' },
  { label: 'Township Scale', value: '30-Acre Premium Integrated Township' },
  { label: 'Sports Arena', value: '12.5 Acres of Elite Sports Infrastructure' },
  { label: 'RERA Number', value: 'P52100054578 (Phase II)' },
  { label: 'Connectivity', value: '3 Mins from Chandni Chowk, near Mumbai-Bangalore Highway' },
];

const clusters = [
  {
    title: 'Strategic Location Advantage',
    keywords: [
      'Bavdhan Pune', 'Bavdhan West Pune', 'Bavdhan near Kothrud', 'Bavdhan near Baner', 
      'Bavdhan near Hinjewadi', 'Bavdhan near Pashan', 'Bavdhan near NDA Road', 
      'Chandni Chowk Bavdhan', 'Bavdhan near Mumbai Bangalore Highway', 'Forest area Bavdhan'
    ]
  },
  {
    title: 'Investment & Lifecycle',
    keywords: [
      'Real Estate Investment Bavdhan', 'Property Investment Pune West', 'High ROI Flats Bavdhan', 
      'Appreciating Property Bavdhan', 'Ready to move flats Bavdhan', 'Under construction flats Bavdhan',
      'Goel Ganga Legend County possession', 'Goel Ganga Legend County price list', 'Resale flats Bavdhan'
    ]
  },
  {
    title: 'Premium Lifestyle & Amenities',
    keywords: [
      'Luxury gated community Bavdhan', 'Premium township Pune West', 'Hill facing apartments Bavdhan', 
      'Clubhouse Bavdhan', 'Swimming Pool Bavdhan', 'Michael Phelps Swimming Academy', 
      'Tagda Raho by MS Dhoni', 'South United Football Academy', 'Modern gated community'
    ]
  }
];

export default function ProjectMonograph() {
  return (
    <section className="section-dark" style={{ padding: '8rem 0', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem' }}>
          
          {/* Left - Strategic Summary */}
          <div>
            <span className="label">Project Monograph</span>
            <h2 className="heading-display heading-md" style={{ marginBottom: '2.5rem' }}>
              Strategic <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Insights</span>
            </h2>
            
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, letterSpacing: '0.05em' }}>{spec.label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, textAlign: 'right' }}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', display: 'grid', gap: '1rem' }}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
              >
                <Download size={18} /> DOWNLOAD BROCHURE PDF
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-outline" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                REQUEST PRICE LIST & OFFERS
              </button>
            </div>
          </div>

          {/* Right - Narrative SEO Injection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>The Legend County Ecosystem</h3>
              <p className="body-md" style={{ color: 'var(--text-white-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Goel Ganga Legend County Bavdhan is more than a residential project; it is a premium township in Bavdhan Pune designed for high-performance living. Situated near the Chandni Chowk Flyover and Pune Bangalore Highway, it offers unmatched connectivity to Hinjewadi IT Park, Kothrud, and Baner.
              </p>
              <p className="body-md" style={{ color: 'var(--text-white-muted)', lineHeight: 1.8 }}>
                Whether you are looking for luxury 3 BHK in Bavdhan or spacious 3.5 BHK flats, our hill-view apartments provide a resort-style living experience. As a trusted developer in Pune, Goel Ganga Developments has engineered this 30-acre gated project to include 12.5 acres of sports amenities, making it the best project in Bavdhan for families seeking green living and smart apartments.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              {clusters.map((cluster, i) => (
                <div key={i}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    {cluster.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cluster.keywords.map((kw, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', padding: '0.25rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Micro-Location Links */}
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem' }}>Silo Monographs (Hyper-Local Authority)</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Link to="/3bhk-flats-bavdhan" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   3 BHK Bavdhan <ArrowRight size={14} />
                </Link>
                <Link to="/sports-township-pune" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   Sports Township <ArrowRight size={14} />
                </Link>
                <Link to="/investment-flats-bavdhan-pune" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   Investment ROI <ArrowRight size={14} />
                </Link>
                <Link to="/luxury-projects-bavdhan" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   Luxury Projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
