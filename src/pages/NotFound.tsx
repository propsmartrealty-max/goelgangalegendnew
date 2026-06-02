import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-primary)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <SEO 
        title="404 - Page Not Found | Goel Ganga Legend County"
        description="The page you are looking for does not exist. Return to Goel Ganga Legend County home page."
        canonical="/404"
        robots="noindex, nofollow"
      />
      <div className="orb orb-gold" style={{ width: 400, height: 400, top: '20%', left: '30%', position: 'absolute' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h1 className="heading-display heading-xl" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>404</h1>
        <h2 className="heading-display heading-sm" style={{ marginBottom: '1.5rem' }}>Lost in the County?</h2>
        <p className="body-md" style={{ color: 'var(--text-white-muted)', marginBottom: '2.5rem', maxWidth: 400, margin: '0 auto' }}>
          The page you're searching for has been relocated or doesn't exist. Let's get you back to the stadium.
        </p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </motion.div>
    </div>
  );
}
