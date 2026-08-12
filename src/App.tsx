import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
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
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import Terms from './pages/Terms';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';

// Pages are imported eagerly on purpose. React.lazy was tried here and had to
// be backed out: renderToString cannot suspend, so every split route
// prerendered as the Suspense fallback — the build still reported success
// while the HTML shipped with no content at all. Splitting these routes needs
// renderToPipeableStream (or a preload pass) first; until then, correct HTML
// beats a smaller bundle.

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
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        {/* Without this, every mistyped or stale URL returned HTTP 200 with an
            empty shell — a soft-404 farm that search engines index and that
            wastes crawl budget. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
