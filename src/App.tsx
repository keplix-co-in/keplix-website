import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Future from './components/Future';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Blog from './pages/Blog';
import Business from './pages/Business';
import ContactPage from './pages/ContactPage';
import Beta from './pages/Beta';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Process />
    <Future />
    <Contact />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-black">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/beta" element={<Beta />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;