import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Experience', href: '#hero' },
  { label: 'Specifications', href: '#specs' },
  { label: 'Support', href: '#newsletter' },
];

export default function Navbar({ theme, onThemeToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* Detect scroll to apply frosted glass backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo"
          aria-label="PHANTOM — home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        >
          PHANTOM
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="navbar__link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="navbar__actions">
          {/* Dark Mode Toggle */}
          <button
            className="navbar__theme-btn"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <a
            href="#newsletter"
            className="btn btn--primary navbar__cta"
            onClick={(e) => { e.preventDefault(); handleNavClick('#newsletter'); }}
            id="navbar-buy-now-btn"
          >
            Buy Now
          </a>

          {/* Hamburger (mobile) */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            id="mobile-menu-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#newsletter"
              className="btn btn--primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#newsletter'); }}
            >
              Buy Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
