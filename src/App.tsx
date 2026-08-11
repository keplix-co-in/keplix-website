import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Future from './components/Future';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import PageBlob from './components/PageBlob';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Business from './pages/Business';
import ContactPage from './pages/ContactPage';
import Beta from './pages/Beta';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/FAQ';

const HomePage = () => (
  <div className="relative overflow-hidden">
    <PageBlob />
    <Hero />
    <Services />
    <Process />
    <Future />
    <Contact />
  </div>
);

function App() {
  // The page background lives here, not on the individual page roots, so it
  // runs unbroken behind the transparent header. Page roots sit *below* the
  // header in flow, so a background on them can never show through it.
  const isBusiness = useLocation().pathname === '/business';

  return (
    <div className={`min-h-screen ${isBusiness ? 'business-wash' : 'page-wash'}`}>
      <ScrollToTop />
      <CookieConsent />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/beta" element={<Beta />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
