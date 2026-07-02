import './Footer.css';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Specifications', href: '#specs' },
    { label: 'Colors', href: '#colors' },
    { label: 'Compare', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Warranty', href: '#' },
    { label: 'Returns', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="divider" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo" onClick={(e) => scrollTo(e, '#hero')}>
            PHANTOM
          </a>
          <p className="footer__tagline">Beyond Smart.</p>
          <p className="footer__copy">
            © {year} Phantom Mobile. Designed for Precision.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <nav key={group} className="footer__nav" aria-label={`${group} links`}>
            <p className="footer__nav-title">{group}</p>
            <ul>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer__nav-link"
                    onClick={(e) => scrollTo(e, href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__bottom-copy">
            © {year} Phantom Mobile. Designed for Precision.
          </span>
          <div className="footer__bottom-actions">
            <a href="#" className="footer__bottom-link">Privacy</a>
            <a href="#" className="footer__bottom-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
