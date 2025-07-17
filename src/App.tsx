import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Future from './components/Future';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import Business from './pages/Business';
import ContactPage from './pages/ContactPage';
import Beta from './pages/Beta';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'business':
        return <Business />;
      case 'contact':
        return <ContactPage />;
      case 'beta':
        return <Beta />;
      default:
        return (
          <>
            <Hero />
            <Services />
            <Process />
            <Future />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;