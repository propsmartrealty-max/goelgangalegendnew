import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Vikram Mehta',
    role: 'Tech Lead, Hinjewadi',
    text: 'Moving to Legend County was the best decision for my family. My kids are now part of the football academy, and the 3-minute commute to Chandni Chowk saves me an hour every day.',
    rating: 5
  },
  {
    name: 'Anjali Sharma',
    role: 'Fitness Enthusiast',
    text: 'The Tagda Raho center is incredible. Having professional-grade functional training equipment within the township is something I haven\'t seen anywhere else in Pune.',
    rating: 5
  },
  {
    name: 'Rahul Deshpande',
    role: 'Investment Consultant',
    text: 'Bavdhan is a goldmine for appreciation. With the sports-first theme, Legend County stands out from the generic projects in the area. High rental yield potential.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-light" style={{ padding: '8rem 0', background: 'var(--bg-cream-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label" style={{ color: 'var(--accent-dark)' }}>Voices of the County</span>
          <h2 className="heading-display heading-md" style={{ color: 'var(--text-dark)' }}>Resident <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Stories</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#fff',
                padding: '3rem 2.5rem',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative'
              }}
            >
              <Quote 
                size={40} 
                style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'rgba(201,150,59,0.1)' }} 
              />
              
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-dark-muted)', marginBottom: '2rem', fontStyle: 'italic' }}>
                "{review.text}"
              </p>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{review.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-dark)', fontWeight: 600 }}>{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
