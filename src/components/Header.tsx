import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="text-2xl font-bold text-white">
              <span className="text-red-500">K</span>eplix
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`transition-colors ${currentPage === 'about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              About us
            </button>
            <button 
              onClick={() => handleNavClick('blog')}
              className={`transition-colors ${currentPage === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('business')}
              className={`transition-colors ${currentPage === 'business' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              For Business
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`transition-colors ${currentPage === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('beta')}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
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
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 mt-4">
              <button 
                onClick={() => handleNavClick('home')}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className={`text-left transition-colors ${currentPage === 'about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                About us
              </button>
              <button 
                onClick={() => handleNavClick('blog')}
                className={`text-left transition-colors ${currentPage === 'blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavClick('business')}
                className={`text-left transition-colors ${currentPage === 'business' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                For Business
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`text-left transition-colors ${currentPage === 'contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Contact
              </button>
              <button 
                onClick={() => handleNavClick('beta')}
                className={`text-left transition-colors ${currentPage === 'beta' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
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