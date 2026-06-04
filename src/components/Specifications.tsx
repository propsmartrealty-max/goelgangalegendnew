import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Droplets, Grid, Layers, HardHat } from 'lucide-react';

const specs = [
  {
    category: "Structure & Walls",
    icon: <Layers size={24} />,
    items: [
      "Earthquake resistant RCC frame structure",
      "High-quality fly-ash bricks / AAC blocks",
      "Internal walls with gypsum finish",
      "External walls with double coat sand-faced plaster"
    ]
  },
  {
    category: "Flooring & Tiling",
    icon: <Grid size={24} />,
    items: [
      "800x800 Vitrified tiles in Living, Dining & Kitchen",
      "Anti-skid ceramic tiles in Terrace & Bathrooms",
      "Designer dado tiles in Bathrooms up to lintel level",
      "Granite platform in Kitchen with SS sink"
    ]
  },
  {
    category: "Electrical & Tech",
    icon: <Zap size={24} />,
    items: [
      "Concealed copper wiring with modular switches",
      "Provision for AC in all Bedrooms",
      "TV & Telephone points in Living & Master Bedroom",
      "Inverter backup for one fan & one light point"
    ]
  },
  {
    category: "Plumbing & Bath",
    icon: <Droplets size={24} />,
    items: [
      "Concealed plumbing with premium CP fittings",
      "Hot & Cold water mixer in all Bathrooms",
      "Provision for geyser & exhaust fan",
      "Branded sanitary ware (Jaquar / Kohler or equivalent)"
    ]
  },
  {
    category: "Safety & Doors",
    icon: <ShieldCheck size={24} />,
    items: [
      "Main door with digital lock & decorative laminate",
      "Powder coated aluminum sliding windows with mosquito net",
      "Video door phone integrated with lobby security",
      "3-tier security with CCTV surveillance"
    ]
  },
  {
    category: "Eco Features",
    icon: <HardHat size={24} />,
    items: [
      "Rainwater harvesting system",
      "Solar water heating for Master Bedroom",
      "Sewage Treatment Plant (STP)",
      "Organic Waste Converter (OWC)"
    ]
  }
];

export default function Specifications() {
  return (
    <section className="section-dark" id="specifications">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label">Technical Authority</span>
          <h2 className="heading-display heading-lg">
            Material{' '}<span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Monologue</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: 600, margin: '1rem auto 0' }}>
            Precision engineering meets elite materiality. Every specification is a testament to Goel Ganga's 40-year legacy of quality.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
          gap: '2rem' 
        }}>
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                transition: 'all 0.3s var(--ease-out)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)';
              }}
            >
              <div style={{ 
                width: 50, height: 50, borderRadius: 'var(--radius-md)', 
                background: 'var(--accent-glow)', border: '1px solid var(--accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', marginBottom: '1.5rem'
              }}>
                {spec.icon}
              </div>
              
              <h3 style={{ 
                fontFamily: 'var(--font-serif)', fontSize: '1.5rem', 
                marginBottom: '1.25rem', color: 'var(--text-white)' 
              }}>
                {spec.category}
              </h3>

              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
                {spec.items.map((item, idx) => (
                  <li key={idx} style={{ 
                    display: 'flex', gap: '0.75rem', fontSize: '0.88rem', 
                    color: 'var(--text-white-muted)', lineHeight: 1.5 
                  }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technical Trust Badge */}
        <div style={{ 
          marginTop: '5rem', padding: '3rem', borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(0, 114, 188, 0.05), transparent)',
          border: '1px solid var(--border-light)', textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.2em' }}>Quality Assurance</div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Earthquake Resistant Design</h3>
          <p style={{ maxWidth: 700, margin: '0 auto 2.5rem', color: 'var(--text-white-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Legend County is engineered using high-performance concrete and reinforced steel, compliant with IS 1893:2016 for seismic resistance. Every tower is a fortress of safety and durability.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
            className="btn-primary"
          >
            REQUEST TECHNICAL BROCHURE
          </button>
        </div>
      </div>
    </section>
  );
}
