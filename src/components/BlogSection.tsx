import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: 'Pune Metro Line 3: Hinjewadi-Shivajinagar Metro Progress & Bavdhan Connectivity',
    excerpt: 'Track the progress of Pune Metro Line 3 (Hinjewadi-Shivajinagar) and how the planned connector and feeder services benefit Goel Ganga Legend County Bavdhan residents...',
    date: 'June 03, 2026',
    author: 'Research Team',
    keywords: 'Pune Metro Line 3, Hinjewadi Metro, Shivajinagar Metro, Bavdhan Metro connectivity',
    slug: 'goel-ganga-legend-county-pune-metro-line-3-bavdhan-connector'
  },
  {
    title: 'Post-Chandni Chowk Traffic Index: Commute Times to Baner & Kothrud in 2026',
    excerpt: 'An analysis of traffic index patterns, travel times, and connectivity benefits in Bavdhan following the multi-level Chandni Chowk flyover completion...',
    date: 'June 03, 2026',
    author: 'Research Team',
    keywords: 'Chandni Chowk flyover, Bavdhan traffic index, Bavdhan to Baner travel time, Bavdhan to Kothrud commute',
    slug: 'goel-ganga-legend-county-post-chandni-chowk-traffic-index-bavdhan'
  },
  {
    title: 'Top International Schools in Pune West: Family Relocation Guide to Bavdhan',
    excerpt: 'A comprehensive directory of top schools, universities, and healthcare facilities near Bavdhan, Pune West, for families planning to relocate...',
    date: 'June 03, 2026',
    author: 'Research Team',
    keywords: 'schools near Bavdhan, international schools in Pune West, hospitals in Bavdhan, Flame University Pune',
    slug: 'goel-ganga-legend-county-top-international-schools-pune-west-bavdhan'
  },
  {
    title: 'Under-40 Homebuyers: Tech Wealth Reshaping Pune Luxury Real Estate',
    excerpt: 'An analysis of why tech-savvy professionals under 40 represent 55% of Pune\'s luxury real estate sales, and how they prioritize wellness-first sports townships...',
    date: 'June 03, 2026',
    author: 'Research Team',
    keywords: 'Pune Real Estate, luxury residential projects in Pune, property market Pune, tech homebuyers Pune',
    slug: 'goel-ganga-legend-county-pune-luxury-real-estate-demographics-2026'
  },
  {
    title: 'Baner Pashan Link Road Market: The Ultimate Luxury Residential Guide',
    excerpt: 'An in-depth analysis of the Baner Pashan Link Road market, pricing trends, congestion index, and why luxury buyers are upgrade-shifting to nearby sports townships...',
    date: 'June 03, 2026',
    author: 'Research Team',
    keywords: 'luxury real estate Baner Pashan Link Road market, high end luxury Baner Pashan Link Road, Baner Pashan Link Road residential projects, properties near Baner Pashan Link Road',
    slug: 'goel-ganga-legend-county-baner-pashan-link-road-real-estate-guide'
  },
  {
    title: 'Cost of Living in Bavdhan Pune: A Comprehensive 2026 Guide',
    excerpt: 'Explore the cost of living, top schools, healthcare, and lifestyle amenities in Bavdhan, Pune\'s most sought-after residential hub...',
    date: 'May 15, 2026',
    author: 'Lifestyle Analyst',
    keywords: 'cost of living in Bavdhan, schools near Bavdhan, healthcare Bavdhan, lifestyle amenities Bavdhan',
    slug: 'goel-ganga-legend-county-cost-of-living-bavdhan-pune'
  },
  {
    title: 'Why Bavdhan is the Best Real Estate Investment in Pune West 2026',
    excerpt: 'Explore the high ROI potential and future growth corridor of Bavdhan Budruk near Chandni Chowk flyover...',
    date: 'May 12, 2026',
    author: 'Infrastructure Analyst',
    keywords: 'Real Estate Investment Bavdhan, Property Investment Pune West, High ROI Flats Bavdhan, Bavdhan Real Estate Growth',
    slug: 'goel-ganga-legend-county-bavdhan-real-estate-investment-2026'
  },
  {
    title: 'Stadium Life: The Rise of Sports-Integrated Townships in Pune',
    excerpt: 'Discover the unique lifestyle at Goel Ganga Legend County, featuring the Michael Phelps Swimming Academy and Tagda Raho by Dhoni...',
    date: 'May 10, 2026',
    author: 'Lifestyle Expert',
    keywords: 'Sports Township Pune, Luxury Gated Community Bavdhan, Goel Ganga Legend County Amenities, Modern Lifestyle Pune',
    slug: 'goel-ganga-legend-county-roi-sports-townships-pune'
  },
  {
    title: 'The Chandni Chowk Flyover: Transforming Connectivity for Legend County',
    excerpt: 'How the new multi-level flyover has slashed travel time from Bavdhan to Hinjewadi, Baner, and Kothrud...',
    date: 'May 08, 2026',
    author: 'Connectivity Reporter',
    keywords: 'Bavdhan near Chandni Chowk, Bavdhan to Hinjewadi, Bavdhan to Kothrud, Flats near Highway Touch',
    slug: 'goel-ganga-legend-county-bavdhan-vs-hinjewadi-real-estate'
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="section-light" style={{ padding: '8rem 0', background: 'var(--bg-cream-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label" style={{ color: 'var(--accent-dark)' }}>Project Insights</span>
          <h2 className="heading-display heading-md" style={{ color: 'var(--text-dark)' }}>Legendary <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Chronicles</span></h2>
          <p className="body-lg" style={{ color: 'var(--text-dark-muted)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Deep dives into the infrastructure, lifestyle, and investment potential of West Pune's premier sports township.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem' }}>
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#fff',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-dark)', textTransform: 'uppercase', opacity: 0.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> {blog.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} /> {blog.author}
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem', lineHeight: 1.3 }}>
                {blog.title}
              </h3>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark-muted)', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
                {blog.excerpt}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Related Keywords</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {blog.keywords.split(', ').map((kw, idx) => (
                    <span key={idx} style={{ fontSize: '0.65rem', background: 'rgba(201,150,59,0.05)', color: 'var(--text-dark-muted)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{kw}</span>
                  ))}
                </div>
              </div>

              <Link 
                to={`/insights/${blog.slug}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--accent-dark)', 
                  fontWeight: 800, 
                  fontSize: '0.85rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: 0
                }}
              >
                READ FULL ARTICLE <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '5rem', padding: '4rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
          <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-20%', right: '-10%', position: 'absolute', opacity: 0.1 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <h3 className="heading-md" style={{ color: '#fff', marginBottom: '1.5rem' }}>Goel Ganga Legend County: <span style={{ color: 'var(--accent)' }}>The Definitive Buyer Intent Guide</span></h3>
            <p className="body-md" style={{ color: 'var(--text-white-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              Searching for luxury flats in Bavdhan Pune? Or premium apartments near Chandni Chowk? Our comprehensive guide covers Goel Ganga Legend County floor plans, latest price lists, construction updates, and sample flat videos. Whether you are looking for ready-to-move 3 BHK in Bavdhan or under-construction 3.5 BHK investment flats, this is the most trusted residential project in West Pune for your family's future.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-primary" 
                style={{ border: 'none', cursor: 'pointer' }}
              >
                DOWNLOAD FULL PRICE LIST
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-outline"
              >
                BOOK VIRTUAL TOUR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
