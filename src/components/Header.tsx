import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent' 
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Keplix Logo"
              className="h-16 w-auto sm:h-20 md:h-28 transition-all duration-300 hover:scale-105"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
              onLoad={() => console.log('Logo loaded successfully')}
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white hidden">
              <span className="text-red-500">K</span>eplix
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => handleNavClick('/')}
              className={`transition-colors text-base lg:text-lg ${currentPath === '/' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`transition-colors text-base lg:text-lg ${currentPath === '/about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              About us
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`transition-colors text-base lg:text-lg ${currentPath === '/blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`transition-colors text-base lg:text-lg ${currentPath === '/contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-6 sm:space-x-8">
            <button
              onClick={() => handleNavClick('/beta')}
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
                onClick={() => handleNavClick('/')}
                className={`w-full text-left transition-colors text-base font-medium ${currentPath === '/' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className={`w-full text-left transition-colors text-base font-medium ${currentPath === '/about' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                About us
              </button>
              <button
                onClick={() => handleNavClick('/blog')}
                className={`w-full text-left transition-colors text-base font-medium ${currentPath === '/blog' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Blog
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className={`w-full text-left transition-colors text-base font-medium ${currentPath === '/contact' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Contact
              </button>
              <button
                onClick={() => handleNavClick('/beta')}
                className={`w-full text-left transition-colors text-base font-medium ${currentPath === '/beta' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
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