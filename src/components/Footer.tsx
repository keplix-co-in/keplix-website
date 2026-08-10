import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import ThreadsIcon from './ThreadsIcon';
import { APP_LINKS, SOCIALS } from '../constants/links';
import { submitForm } from '../lib/submitForm';

const columns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Car Service', path: '/' },
      { label: 'Maintenance', path: '/' },
      { label: 'Repairs', path: '/' },
      { label: 'Accessories', path: '/' },
      { label: 'Fleet Solutions', path: '/business' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', path: '/contact' },
      { label: 'FAQ', path: '/contact' },
      { label: 'Terms of Service', path: '/privacy-policy' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Refund Policy', path: '/privacy-policy' },
    ],
  },
  {
    heading: 'For Businesses',
    links: [
      { label: 'Workshop Partner', path: '/business' },
      { label: 'Become a Partner', path: '/business' },
      { label: 'Corporate Solutions', path: '/business' },
    ],
  },
];

const socials = [
  { Icon: Linkedin, label: 'LinkedIn', href: SOCIALS.linkedin },
  { Icon: Instagram, label: 'Instagram', href: SOCIALS.instagram },
  { Icon: ThreadsIcon, label: 'Threads', href: SOCIALS.threads },
  { Icon: Twitter, label: 'X', href: SOCIALS.twitter },
  { Icon: Facebook, label: 'Facebook', href: SOCIALS.facebook },
  { Icon: Youtube, label: 'YouTube', href: SOCIALS.youtube },
];

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isPartner = pathname === '/business';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    const result = await submitForm('newsletter', { email });
    if (result.ok) {
      setStatus('done');
      setEmail('');
    } else {
      setStatus('error');
      setError(result.error);
    }
  };

  return (
    <footer
      className={`w-full px-4 pb-8 pt-12 sm:px-8 ${
        isPartner ? 'bg-partner-band' : ''
      }`}
    >
      <div className="mx-auto max-w-page">
        {/* Brand + navigation columns */}
        <div
          className={`flex flex-col gap-12 border-b pb-12 lg:flex-row ${
            isPartner ? 'border-partner/20' : 'border-line-soft'
          }`}
        >
          <div className="w-full lg:w-[271px] lg:shrink-0">
            <img
              src="/keplix-logo.png"
              alt="Keplix"
              className="h-[63px] w-[69px] object-contain"
            />
            <p className="mt-6 max-w-xs text-base leading-[22.75px] text-ink-muted">
              India&apos;s most trusted platform for car services. Compare, book
              and track with confidence.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-line-soft text-ink-muted transition-colors hover:bg-brand-red hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {columns.map((column) => (
              <div key={column.heading}>
                <h4 className="text-base font-semibold leading-6 text-ink-heading">
                  {column.heading}
                </h4>
                <ul className="mt-6 flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm leading-5 text-ink-muted transition-colors hover:text-brand-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* App download + newsletter */}
        <div className="flex flex-col gap-12 border-b border-line-soft py-12 lg:flex-row">
          <div className="flex-1">
            <h4 className="text-base font-bold leading-6 text-ink-heading">
              Download the App
            </h4>
            <div className="mt-4 flex gap-4">
              <a
                href={APP_LINKS.vendorAndroid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[53px] items-center justify-center rounded-btn bg-brand-blue px-9 text-base font-bold leading-7 text-white shadow-btn transition-opacity hover:opacity-90"
              >
                Vendors
              </a>
              <a
                href={APP_LINKS.customerAndroid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[53px] items-center justify-center rounded-btn bg-brand-red px-9 text-base font-bold leading-7 text-white shadow-btn transition-colors hover:bg-brand-redHover"
              >
                Users
              </a>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold leading-6 text-ink-heading">
              Newsletter
            </h4>
            <p className="mt-4 text-sm leading-5 text-ink-muted">
              Subscribe for updates and offers.
            </p>
            <form className="mt-4 flex gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-btn border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand-red focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="shrink-0 rounded-btn bg-brand-subscribe px-8 py-3 text-sm font-semibold leading-5 text-white transition-colors hover:bg-brand-redHover disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
            {status === 'done' && (
              <p className="mt-3 text-sm text-emerald-600">
                Thanks — you&apos;re on the list.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-sm text-brand-red">{error}</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm leading-5 text-ink-faint">
            © 2026 Keplix. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm leading-5 text-ink-faint">
            <Link to="/privacy-policy" className="hover:text-brand-red">
              Privacy Policy
            </Link>
            <span className="text-line">|</span>
            <Link to="/privacy-policy" className="hover:text-brand-red">
              Terms of Service
            </Link>
            <span className="text-line">|</span>
            <Link to="/cookie-policy" className="hover:text-brand-red">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
