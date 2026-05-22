import { motion } from 'framer-motion';

export default function Developer() {
  return (
    <section id="developer" className="section-light" style={{ padding: '8rem 0', background: 'var(--bg-cream-deep)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Legacy Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label" style={{ color: 'var(--accent-dark)', marginBottom: '1rem', display: 'block' }}>The Legacy</span>
            <h2 className="heading-display heading-lg" style={{ color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              Built on <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Trust</span>
            </h2>
            <p className="body-md" style={{ color: 'var(--text-dark-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Goel Ganga Group is a brand name synonymous with trust, reliability, and quality. With over 4 decades of experience in the real estate industry, we have developed some of the most iconic landmarks across Pune, Mumbai, and Bengaluru.
            </p>
            <p className="body-md" style={{ color: 'var(--text-dark-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
              Our philosophy is simple: to create spaces that enhance the quality of life. Legend County is the pinnacle of this vision, combining luxury residential living with world-class sports infrastructure.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>40+</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years of Excellence</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>100+</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Completed Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Vision Image/Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '1/1',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <img 
              src="/interior-luxury.webp" 
              alt="Goel Ganga Developments - Trusted Real Estate Developer in Pune" 
              title="Goel Ganga Developments Legacy"
              loading="lazy"
              width={500}
              height={500}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2.5rem'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>"Pure Delight"</div>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                Delivering excellence and creating lasting value for over 50,000 families.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Chronicle of Excellence */}
        <div style={{ 
          marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.05)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Awards</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>Real Estate Brand of the Year</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }}>Times Business Awards 2023</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Heritage</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>40+ Years of Quality</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }}>Transforming Pune's Skyline</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Footprint</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>50,000+ Happy Families</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }}>Across 100+ Completed Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
}
