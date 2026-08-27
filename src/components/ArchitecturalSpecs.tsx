import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Compass, Layers, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface UnitPlan {
  name: string;
  carpetArea: string;
  balconyArea: string;
  facing: string;
  ceilingHeight: string;
  rooms: { name: string; dimFeet: string; dimMeters: string; flooring: string }[];
}

const unitSpecs: Record<string, UnitPlan> = {
  '3bhk': {
    name: '3 BHK Grand Residence',
    carpetArea: '1,124 Sq. Ft.',
    balconyArea: '142 Sq. Ft. (Deck + Dry Balcony)',
    facing: 'East / West (NDA Hill & Stadium View)',
    ceilingHeight: '10 Feet 4 Inches Clear',
    rooms: [
      { name: 'Grand Living & Dining Room', dimFeet: "21' 4\" × 12' 6\"", dimMeters: '6.50m × 3.81m', flooring: '800×1600mm Glazed Vitrified Tiles' },
      { name: 'Master Bedroom Suite', dimFeet: "14' 0\" × 12' 0\"", dimMeters: '4.27m × 3.66m', flooring: 'Laminated Premium Wooden Texture' },
      { name: 'Master Ensuite Bathroom', dimFeet: "8' 6\" × 5' 6\"", dimMeters: '2.59m × 1.68m', flooring: 'Anti-Skid Designer Tiles with Grohe/Kohler CP' },
      { name: 'Bedroom 2 (Guest Suite)', dimFeet: "12' 0\" × 11' 0\"", dimMeters: '3.66m × 3.35m', flooring: 'Vitrified High-Gloss Tile' },
      { name: 'Bedroom 3 (Children Suite)', dimFeet: "11' 6\" × 10' 6\"", dimMeters: '3.51m × 3.20m', flooring: 'Vitrified High-Gloss Tile' },
      { name: 'Gourmet Kitchen', dimFeet: "10' 6\" × 8' 0\"", dimMeters: '3.20m × 2.44m', flooring: 'Granite Platform + Piped Gas Provision' },
      { name: 'Panoramic Hill-Deck Balcony', dimFeet: "14' 6\" × 5' 0\"", dimMeters: '4.42m × 1.52m', flooring: 'Rustic Anti-Skid Deck Tiles + Glass Railing' },
      { name: 'Utility & Dry Balcony', dimFeet: "6' 0\" × 4' 0\"", dimMeters: '1.83m × 1.22m', flooring: 'Ceramic Anti-Skid with Washing Machine Point' }
    ]
  },
  '3.5bhk': {
    name: '3.5 BHK Elite Residence + Study',
    carpetArea: '1,380 Sq. Ft.',
    balconyArea: '185 Sq. Ft. (Double Balcony)',
    facing: 'North-East (Dual Aspect Hill Views)',
    ceilingHeight: '10 Feet 6 Inches Clear',
    rooms: [
      { name: 'Expansive Living & Dining Hall', dimFeet: "24' 0\" × 13' 6\"", dimMeters: '7.32m × 4.11m', flooring: 'Italian-Finish 800×1600mm Vitrified' },
      { name: 'Presidential Master Suite', dimFeet: "15' 6\" × 13' 0\"", dimMeters: '4.72m × 3.96m', flooring: 'Hardwood Texture Acoustic Flooring' },
      { name: 'Walk-In Dresser & Ensuite', dimFeet: "9' 6\" × 6' 0\"", dimMeters: '2.90m × 1.83m', flooring: 'Full-Height Designer Quartz Wall Cladding' },
      { name: 'Private Work-From-Home Study', dimFeet: "9' 0\" × 8' 6\"", dimMeters: '2.74m × 2.59m', flooring: 'Sound-Dampening High-Traffic Vitrified' },
      { name: 'Bedroom 2 (Junior Suite)', dimFeet: "13' 0\" × 11' 6\"", dimMeters: '3.96m × 3.51m', flooring: 'Vitrified High-Gloss Tile' },
      { name: 'Bedroom 3 (Senior Suite)', dimFeet: "12' 6\" × 11' 0\"", dimMeters: '3.81m × 3.35m', flooring: 'Vitrified High-Gloss Tile' },
      { name: 'Chef Kitchen & Breakfast Bar', dimFeet: "12' 0\" × 8' 6\"", dimMeters: '3.66m × 2.59m', flooring: 'Double Granite Counter with SS Sink' },
      { name: 'Double-Aspect Deck Balcony', dimFeet: "18' 0\" × 5' 6\"", dimMeters: '5.49m × 1.68m', flooring: 'Toughened Glass Railing & Wooden Tile' }
    ]
  },
  '4bhk': {
    name: '4 BHK Sky Duplex / Penthouse',
    carpetArea: '2,150 Sq. Ft.',
    balconyArea: '320 Sq. Ft. (Private Sky Terrace)',
    facing: '360° Panoramic NDA Hills & City Skyline',
    ceilingHeight: '11 Feet 0 Inches (Double Height in Foyer)',
    rooms: [
      { name: 'Grand Double-Height Great Room', dimFeet: "28' 0\" × 16' 0\"", dimMeters: '8.53m × 4.88m', flooring: 'Imported Marble Slab Flooring' },
      { name: 'Royal Master Penthouse Suite', dimFeet: "18' 0\" × 14' 6\"", dimMeters: '5.49m × 4.42m', flooring: 'Engineered Oak Wood Flooring' },
      { name: 'Spa Bathroom with Bathtub', dimFeet: "12' 0\" × 7' 6\"", dimMeters: '3.66m × 2.29m', flooring: 'Frameless Glass Partition & Grohe Thermostat' },
      { name: 'Bedroom 2 (VIP Suite)', dimFeet: "14' 6\" × 13' 0\"", dimMeters: '4.42m × 3.96m', flooring: 'Premium Vitrified Tile' },
      { name: 'Bedroom 3 (Guest Lounge)', dimFeet: "13' 6\" × 12' 0\"", dimMeters: '4.11m × 3.66m', flooring: 'Premium Vitrified Tile' },
      { name: 'Bedroom 4 / Home Theatre Room', dimFeet: "14' 0\" × 12' 0\"", dimMeters: '4.27m × 3.66m', flooring: 'Acoustic Wall Paneling Ready' },
      { name: 'Island Gourmet Kitchen', dimFeet: "14' 0\" × 9' 6\"", dimMeters: '4.27m × 2.90m', flooring: 'Quartz Counter with Chimney Conduit' },
      { name: 'Private Open-Air Sky Terrace', dimFeet: "24' 0\" × 8' 0\"", dimMeters: '7.32m × 2.44m', flooring: 'Weatherproof Composite Decking' }
    ]
  }
};

export default function ArchitecturalSpecs() {
  const [activeTab, setActiveTab] = useState<'3bhk' | '3.5bhk' | '4bhk'>('3bhk');
  const plan = unitSpecs[activeTab];

  return (
    <section id="architectural-specs" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <Maximize2 size={14} style={{ color: '#F59E0B' }} />
            Engineering & Spatial Precision
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Room-by-Room <span className="gradient-text-gold">Architectural Matrix</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Inspect the exact millimeter dimensions, clear ceiling clearances, and premium flooring specifications for each configuration.
          </p>
        </div>

        {/* Configuration Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: '3bhk', label: '3 BHK Grand (1,124 Sq.Ft.)' },
            { id: '3.5bhk', label: '3.5 BHK Elite + Study (1,380 Sq.Ft.)' },
            { id: '4bhk', label: '4 BHK Sky Duplex (2,150 Sq.Ft.)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-pill)',
                background: activeTab === tab.id ? 'var(--accent-gradient-gold)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#0F172A' : 'var(--text-white)',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? 'var(--shadow-gold)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Specifications Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card-bold"
            style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              paddingBottom: '2rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Carpet Area</span>
                <strong style={{ fontSize: '1.3rem', color: '#FCD34D' }}>{plan.carpetArea}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Balcony & Deck</span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--text-white)' }}>{plan.balconyArea}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Facing & Views</span>
                <strong style={{ fontSize: '0.95rem', color: '#34D399' }}>{plan.facing}</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-white-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Clear Ceiling Height</span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--text-white)' }}>{plan.ceilingHeight}</strong>
              </div>
            </div>

            {/* Room by Room Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Room Area</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Dimensions (Feet)</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Dimensions (Metric)</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Flooring & Finish</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.rooms.map((room, idx) => (
                    <tr key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-white)', fontSize: '0.9rem' }}>
                        {room.name}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#FCD34D', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                        {room.dimFeet}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-white-muted)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                        {room.dimMeters}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-white-subtle)', fontSize: '0.85rem' }}>
                        {room.flooring}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Blueprint PDF Action Bar */}
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-white-muted)', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} style={{ color: '#10B981' }} />
                <span>Sanctioned by PMC / PMRDA · MahaRERA: P52100054578</span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
                className="btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '0.88rem' }}
              >
                <Download size={16} /> Download Full CAD Blueprint (PDF)
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
