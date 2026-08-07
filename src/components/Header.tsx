import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How it Works', path: '/' },
  { label: 'Workshops', path: '/business' },
  { label: 'Blogs', path: '/blog' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-blush-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-4 py-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/keplix-logo.png"
            alt="Keplix"
            className="h-[58px] w-[64px] object-contain sm:h-[79px] sm:w-[87px]"
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`pl-10 font-nav text-base leading-6 transition-colors first:pl-0 hover:text-brand-accent ${
                currentPath === link.path
                  ? 'font-bold text-brand-accent'
                  : 'font-medium text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('/beta')}
            className="h-[53px] w-[141px] rounded-btn bg-brand-red text-base font-bold leading-7 text-white shadow-btn transition-colors hover:bg-brand-redHover max-sm:h-11 max-sm:w-auto max-sm:px-5 max-sm:text-sm"
          >
            Join Beta
          </button>
          <button
            className="text-ink lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-line bg-white shadow-card lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`py-3 text-left font-nav text-base transition-colors ${
                  currentPath === link.path
                    ? 'font-bold text-brand-accent'
                    : 'font-medium text-ink hover:text-brand-accent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
