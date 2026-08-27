import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SmoothScroll from './components/SmoothScroll';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Overview from './components/Overview';
import About from './components/About';
import Amenities from './components/Amenities';
import SportsAcademies from './components/SportsAcademies';
import Gallery from './components/Gallery';
import MasterLayout from './components/MasterLayout';
import FloorPlans from './components/FloorPlans';
import ROIHub from './components/ROIHub';
import Location from './components/Location';
import InfrastructureTracker from './components/InfrastructureTracker';
import Testimonials from './components/Testimonials';
import Developer from './components/Developer';
import ProjectMonograph from './components/ProjectMonograph';
import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import EnquiryModal from './components/EnquiryModal';
import ConstructionTracker from './components/ConstructionTracker';
import Specifications from './components/Specifications';
import ProjectCinema from './components/ProjectCinema';
import ComparisonMatrix from './components/ComparisonMatrix';
import EMICalculator from './components/EMICalculator';
import { SocialProofToast, ExitIntent, TimedCTA } from './components/ConversionEngine';
import SiloPage from './pages/SiloPage';
import ArticlePage from './pages/ArticlePage';
import NotFound from './pages/NotFound';
import AIChatConcierge from './components/AIChatConcierge';
import SEO from './components/SEO';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const timer = setTimeout(() => {
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(el, { offset: -80, immediate: false });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);
  return null;
}

const homepageFAQs = [
  {
    question: "What is the concept of Goel Ganga Legend County Bavdhan?",
    answer: "Goel Ganga Legend County Bavdhan is a premium 30-acre integrated sports township in Bavdhan, Pune, featuring 12.5 acres of dedicated sports infrastructure and 9+ professional sports academies."
  },
  {
    question: "What apartment configurations are available at Goel Ganga Legend County Bavdhan?",
    answer: "We offer luxury 2 BHK, 3 BHK, and spacious 3.5 BHK configurations starting from ₹1.77 Cr*."
  },
  {
    question: "Which sports academies are active in Goel Ganga Legend County Bavdhan?",
    answer: "Active academies include the Michael Phelps Swimming Academy, South United Football Academy, and MS Dhoni's Tagda Raho functional fitness center."
  },
  {
    question: "Is Goel Ganga Legend County Bavdhan RERA compliant?",
    answer: "Yes, the project is fully RERA registered and compliant. The MahaRERA registration number is P52100054578."
  },
  {
    question: "What is the commute time from Goel Ganga Legend County Bavdhan to Hinjewadi IT Park?",
    answer: "Located just 3 minutes from Chandni Chowk, Goel Ganga Legend County Bavdhan offers quick 15-20 minute connectivity to Hinjewadi IT Park, Kothrud, and Baner."
  }
];

const Home = () => (
  <>
    <SEO 
      title="Goel Ganga Legend County Bavdhan | Luxury 3 & 3.5 BHK Flats in Bavdhan & West Pune"
      description="Discover Pune's premier 30-acre sports-first township. Luxury 3 & 3.5 BHK residences starting ₹1.77 Cr* in Bavdhan and West Pune with 9+ international sports academies."
      keywords="Goel Ganga Legend County Bavdhan, Goel Ganga Legend County, Luxury Flats Bavdhan, 3 BHK Pune, Sports Township Pune, Stadium Life Bavdhan"
      faq={homepageFAQs}
    />
    <Hero />
    <Trust />
    <Overview />
    <About />
    <Amenities />
    <SportsAcademies />
    <Gallery />
    <ProjectCinema />
    <MasterLayout />
    <FloorPlans />
    <Specifications />
    <ComparisonMatrix />
    <ROIHub />
    <EMICalculator />
    <Location />
    <InfrastructureTracker />
    <ConstructionTracker />
    <Testimonials />
    <ProjectMonograph />
    <BlogSection />
    <Developer />
    <Contact />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll>
          <PageLoader />
          <ScrollProgress />
          <div className="grain" />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
              <Route path="/:slug" element={<SiloPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />

          {/* Conversion Layer */}
          <StickyCTA />
          <EnquiryModal />
          <SocialProofToast />
          <ExitIntent />
          <TimedCTA />
          <AIChatConcierge />
        </SmoothScroll>
      </Router>
    </HelmetProvider>
  );
}

export default App;
