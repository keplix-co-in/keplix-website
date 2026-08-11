import React, { useEffect, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isBusiness = currentPath === '/business';
  const activeColor = isBusiness ? 'text-partner' : 'text-brand-accent';

  // The header is transparent in the Figma design so the page background,
  // its decorative circle and the Workshops gradient run unbroken beneath it.
  // A tinted, blurred background only fades in once content scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? `${isBusiness ? 'bg-[#f2f3f8]/90' : 'bg-blush-50/90'} shadow-sm backdrop-blur-md`
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-24 max-w-page items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src="/keplix-logo.png"
            alt="Keplix"
            className="h-14 w-[62px] object-contain sm:h-20 sm:w-[88px]"
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`pl-10 font-nav text-base leading-6 transition-colors first:pl-0 hover:text-brand-accent ${
                currentPath === link.path
                  ? `font-bold ${activeColor}`
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
            className={`h-[53px] w-[141px] rounded-btn text-base font-bold leading-7 text-white shadow-btn transition-colors max-sm:h-11 max-sm:w-auto max-sm:px-5 max-sm:text-sm ${
              isBusiness
                ? 'bg-partner hover:opacity-90'
                : 'bg-brand-red hover:bg-brand-redHover'
            }`}
          >
            Join Beta
          </button>
          {/* The primary mobile nav control was a bare 24px icon — well under
              the ~44px minimum touch target. -mr-2 keeps the icon visually
              where it was while the padding grows the hit area. */}
          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
                    ? `font-bold ${activeColor}`
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
