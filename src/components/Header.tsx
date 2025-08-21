import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Alternative logo import (uncomment if the public path doesn't work)
// import logoImage from '/logo.png';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent' 
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Keplix Logo"
              className="h-16 w-auto sm:h-20 md:h-28 transition-all duration-300 hover:scale-105"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                // Fallback to text logo if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
              onLoad={() => console.log('Logo loaded successfully')}
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white hidden">
              <span className="text-red-500">K</span>eplix
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors text-base lg:text-lg ${currentPage === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors text-base lg:text-lg ${currentPage === 'about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              About us
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`transition-colors text-base lg:text-lg ${currentPage === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors text-base lg:text-lg ${currentPage === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-6 sm:space-x-8">
            <button
              onClick={() => handleNavClick('beta')}
              className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              Join Beta
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 border-b border-gray-700 shadow-lg z-40 md:hidden">
            <nav className="flex flex-col py-4 px-6 space-y-3">
              <button
                onClick={() => { handleNavClick('home'); setIsMenuOpen(false); }}
                className={`w-full text-left transition-colors text-base font-medium ${currentPage === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Home
              </button>
              <button
                onClick={() => { handleNavClick('about'); setIsMenuOpen(false); }}
                className={`w-full text-left transition-colors text-base font-medium ${currentPage === 'about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                About us
              </button>
              <button
                onClick={() => { handleNavClick('blog'); setIsMenuOpen(false); }}
                className={`w-full text-left transition-colors text-base font-medium ${currentPage === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Blog
              </button>
              <button
                onClick={() => { handleNavClick('contact'); setIsMenuOpen(false); }}
                className={`w-full text-left transition-colors text-base font-medium ${currentPage === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Contact
              </button>
              <button
                onClick={() => { handleNavClick('beta'); setIsMenuOpen(false); }}
                className={`w-full text-left transition-colors text-base font-medium ${currentPage === 'beta' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Join Beta
              </button>
            </nav>
          </div>
        )}


      </div>
    </header>
  );
};

export default Header;