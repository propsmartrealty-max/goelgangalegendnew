import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse,
  Wind,
  Droplets,
  Sun,
  Trees,
  ShieldCheck,
  Volume2,
  Zap,
  Activity,
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  Smile
} from 'lucide-react';

const longevityStats = [
  { value: '90%', label: 'Of life is spent indoors' },
  { value: '2-5x', label: 'Higher indoor air pollution without filtration' },
  { value: '70%', label: 'Of chronic health conditions are environmental' },
  { value: '15+ Yrs', label: 'Healthspan gained through Longevian design' }
];

const sevenPillars = [
  {
    icon: <Wind size={22} />,
    title: 'Air Architecture',
    subtitle: 'PM2.5 Filtration & DGU Shielding',
    desc: 'High-grade DGU acoustic windows and active continuous air filtration drastically reduce PM2.5 exposure, boosting deep sleep, mental clarity, and cellular oxygenation.'
  },
  {
    icon: <Droplets size={22} />,
    title: 'Water Architecture',
    subtitle: 'Copper Pathways & WQI Monitoring',
    desc: 'Stainless steel central storage tanks, antimicrobial copper piping pathways, and real-time Water Quality Index (WQI) monitoring deliver structured, pure, and alkaline hydration.'
  },
  {
    icon: <Sun size={22} />,
    title: 'Light Architecture',
    subtitle: 'Circadian Daylight Synchronization',
    desc: 'Precision daylight engineering and biological circadian light paths harmonize melatonin rhythms, optimizing deep REM recovery, hormonal balance, and mood stability.'
  },
  {
    icon: <Trees size={22} />,
    title: 'Nature Architecture',
    subtitle: 'Biophilic Moss Walls & Micro-Farms',
    desc: 'Living plant systems, indoor vertical herb gardens, and biophilic architectural integration reduce cortisol levels while stimulating immune system resilience.'
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Material Architecture',
    subtitle: 'Zero-VOC Breathable Surfaces',
    desc: 'Non-toxic low-VOC organic coatings, natural stone flooring, and toxin-free mineral mortars create an ultra-clean respiratory habitat free of off-gassing.'
  },
  {
    icon: <Volume2 size={22} />,
    title: 'Sound Architecture',
    subtitle: 'Acoustic Decibel Isolation & Water Flow',
    desc: 'Calibrated acoustic dampers, ambient water soundscapes, and multi-layer noise insulation insulate against urban stress, enabling profound neurological restoration.'
  },
  {
    icon: <Zap size={22} />,
    title: 'Energy Architecture',
    subtitle: 'Natural Grounding & Bio-Earthing',
    desc: 'Dedicated copper earthing pathways and biological grounding plates neutralize static electromagnetic fields, restoring natural cellular voltage and calm.'
  }
];

const outdoorAmenities = [
  'Community Dining Terrace & Slow-Cooking Zone',
  'Open-Air Sunrise Yoga & Meditation Deck',
  'Zen Garden Walkway & Water Sound Therapy Zone',
  'Reflexology Pebble Path (Barefoot-Friendly)',
  'Tai Chi & Qigong Mind-Body Garden',
  'Stargazing Deck & Sunset Silence Lounge',
  'Controlled Ceremonial Fire Bowl Circle',
  'Stretch & Mobility Functional Fitness Lawn'
];

const indoorAmenities = [
  'Longevity Spa (Ayurvedic & Modern Thermal Therapy)',
  'Ice Bath & Cold Plunge Cryo-Zone',
  'Infrared Sauna & Herbal Steam Infusion Room',
  'Breathwork Studio (Pranayama & Wim Hof Protocol)',
  'Sound Healing Chamber (Tibetan Bowls & Acoustic Waves)',
  'Kids Creative Playroom (Art, Clay, Storytelling)',
  'Conscious Co-Working Pods & Podcast Studio',
  'Life-Purpose & Nutrition Demonstration Kitchen'
];

export default function LivingBlueprintLongevity() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeTab, setActiveTab] = useState<'outdoor' | 'indoor'>('outdoor');

  return (
    <section id="longevity-district" className="section-dark" style={{ padding: 'var(--section-pad) 0', background: '#06080D', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambience */}
      <div style={{ position: 'absolute', top: '10%', right: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34D399', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            <HeartPulse size={15} />
            India's First Longevity District
          </div>
          <h2 className="heading-display heading-lg" style={{ color: 'var(--text-white)' }}>
            The Living Blueprint™ <br />
            <span style={{ background: 'linear-gradient(135deg, #34D399 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Long Life By Design.
            </span>
          </h2>
          <p className="body-lg" style={{ color: 'var(--text-white-muted)', maxWidth: '720px', margin: '1rem auto 0' }}>
            At Ganga Legend County Bavdhan, wellness is not an afterthought—it is a scientific architecture. Where environment, biophilic science, and daily habit coaching unite to add years to your life and life to your years.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {longevityStats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-bold"
              style={{ padding: '2rem 1.5rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, color: '#34D399', fontFamily: 'var(--font-display)', marginBottom: '0.4rem' }}>
                {st.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-white-muted)', fontWeight: 500 }}>
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Layers Overview */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F59E0B' }}>
              The Ecosystem Architecture
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.4rem' }}>
              Three Layers. One Continuous System.
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}>
            <div className="glass-card-bold" style={{ padding: '2.25rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', marginBottom: '1.25rem' }}>
                <Compass size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                1. Longevian Architecture
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>
                Seven scientific pillars—air, water, light, nature, materials, sound, and energy—integrated into the physical fabric of every apartment and corridor.
              </p>
            </div>

            <div className="glass-card-bold" style={{ padding: '2.25rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', marginBottom: '1.25rem' }}>
                <Activity size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                2. Longevian Coaching
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>
                The TLB Bio-Tracking Ring and certified longevity wellness coaches translate your daily biometric data into sustainable, micro-lifestyle habits.
              </p>
            </div>

            <div className="glass-card-bold" style={{ padding: '2.25rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', marginBottom: '1.25rem' }}>
                <Sparkles size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                3. Longevian Ecosystem
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-white-muted)', lineHeight: 1.6 }}>
                100+ curated annual health experiences across a 30-acre township, anchored by the 12.5-acre Olympic sports stadia and wellness clubhouses.
              </p>
            </div>
          </div>
        </div>

        {/* Seven Scientific Pillars Interactive Showcase */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#34D399' }}>
              Scientific Rigor
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.4rem' }}>
              The Seven Pillars of Longevian Architecture
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1rem' }}>
            {sevenPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onClick={() => setActivePillar(idx)}
                className="glass-card-bold"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  border: activePillar === idx ? '1px solid #34D399' : '1px solid rgba(255,255,255,0.06)',
                  background: activePillar === idx ? 'rgba(52, 211, 153, 0.08)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activePillar === idx ? '#34D399' : '#F59E0B' }}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>{pillar.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>{pillar.subtitle}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-white-muted)', lineHeight: 1.55 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leisure By Design - Indoor / Outdoor Tabs */}
        <div className="glass-card-bold" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F59E0B' }}>
                Intentional Indulgence
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.3rem' }}>
                For Longevians, Leisure Is By Design.
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem', borderRadius: '9999px' }}>
              <button
                onClick={() => setActiveTab('outdoor')}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeTab === 'outdoor' ? '#34D399' : 'transparent',
                  color: activeTab === 'outdoor' ? '#06080D' : '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Outdoor Longevity ({outdoorAmenities.length})
              </button>
              <button
                onClick={() => setActiveTab('indoor')}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: activeTab === 'indoor' ? '#34D399' : 'transparent',
                  color: activeTab === 'indoor' ? '#06080D' : '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Indoor Recovery Spa ({indoorAmenities.length})
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
            {(activeTab === 'outdoor' ? outdoorAmenities : indoorAmenities).map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.9rem 1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px'
                }}
              >
                <CheckCircle2 size={18} style={{ color: '#34D399', flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', color: '#F1F5F9', fontWeight: 500 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                Experience The Living Blueprint™ In Person
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-white-muted)' }}>
                3 & 4 BHK Longevity Residences starting from ₹1.55 Cr (All Incl.)*
              </div>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openEnquiryModal'))}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)', color: '#06080D', fontWeight: 800, padding: '0.85rem 1.75rem' }}
            >
              Book Longevity Experience Tour <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
