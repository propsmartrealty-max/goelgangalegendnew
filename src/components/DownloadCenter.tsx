import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, Sparkles, FolderDown } from 'lucide-react';

const documents = [
  {
    title: 'Official Project Monograph',
    desc: '30-Page High-Res comprehensive factsheet covering master layout, sports academies, specifications, and club amenities.',
    size: '12.4 MB PDF',
    docKey: 'brochure'
  },
  {
    title: '3 BHK Architectural CAD Blueprint',
    desc: 'Exact room-by-room millimeter dimensions, balcony clearances, electrical points, and furniture layout schematics.',
    size: '4.8 MB PDF',
    docKey: 'floorplan_3bhk'
  },
  {
    title: '3.5 BHK Elite Series Blueprint',
    desc: 'Dual-balcony master layout with dedicated private work-from-home study and expansive living hall dimensions.',
    size: '5.2 MB PDF',
    docKey: 'floorplan_3_5bhk'
  },
  {
    title: '30-Acre Master Layout Plan',
    desc: 'High-definition site schematic detailing the 12.5-acre sports arena, tower positions, and vehicular access gates.',
    size: '8.6 MB PDF',
    docKey: 'master_layout'
  },
  {
    title: 'MahaRERA Sanction Certificate',
    desc: 'Official government regulatory sanction, approved floor plans, and title clearance certificate (P52100054578).',
    size: '3.1 MB PDF',
    docKey: 'rera_certificate'
  },
  {
    title: 'Bavdhan ROI & Investment Report',
    desc: '10-Year historical appreciation trends, Chandni Chowk transit metrics, and corporate tenant rental yield analysis.',
    size: '6.5 MB PDF',
    docKey: 'brochure'
  }
];

export default function DownloadCenter() {
  return (
    <section id="download-center" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="badge-titanium" style={{ marginBottom: '1.25rem' }}>
            <FolderDown size={14} style={{ color: '#F59E0B' }} />
            Official Developer Vault
          </span>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            Document & Brochure <span className="gradient-text-gold">Download Center</span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '640px', margin: '1rem auto 0' }}>
            Access verified architectural blueprints, MahaRERA certificates, and official brochures streamed directly from Cloudflare R2 Edge Storage.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
          {documents.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card-bold"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-white-subtle)', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-pill)' }}>
                    {doc.size}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '0.6rem' }}>
                  {doc.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-white-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {doc.desc}
                </p>
              </div>

              <a
                href={`/api/r2-brochure?doc=${doc.docKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '0.75rem 1rem' }}
              >
                <Download size={15} /> Instant Edge Download (PDF)
              </a>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-white-muted)', fontSize: '0.85rem' }}>
          <ShieldCheck size={16} style={{ color: '#10B981' }} />
          <span>All documents verified and compliant under MahaRERA: P52100054578</span>
        </div>
      </div>
    </section>
  );
}
