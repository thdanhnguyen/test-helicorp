import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const phoneRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!phoneRef.current) return;
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 12;
      const y = (e.clientY / h - 0.5) * 8;
      phoneRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
    };
    const handleLeave = () => {
      if (!phoneRef.current) return;
      phoneRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section id="hero" className="hero section" aria-label="Hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="section-tag hero__tag animate-fade-up">New — 2025</p>

          <h1 className="hero__headline animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Beyond<br />Smart.
          </h1>

          <p className="hero__desc animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Experience the next generation of mobile technology.
            The{' '}
            <strong>PHANTOM</strong> — powered by AI,
            designed for perfection.
          </p>

          <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <a href="#specs" className="btn btn--primary" id="hero-order-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#specs')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Order Now
            </a>
            <a href="#features" className="btn btn--ghost" id="hero-learn-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Learn More
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__phone-wrap" ref={phoneRef}>
            <div className="hero__phone-badge">PHANTOM Edition</div>
            <img
              src="/phone-hero.png"
              alt="PHANTOM smartphone front view"
              className="hero__phone-img"
              width="420"
              height="520"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="hero__phone-placeholder" aria-hidden="true">
              <svg viewBox="0 0 200 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="180" height="360" rx="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5"/>
                <rect x="22" y="34" width="156" height="288" rx="6" fill="var(--color-bg-muted)"/>
                <circle cx="100" cy="344" r="12" fill="var(--color-border)"/>
                <rect x="72" y="14" width="56" height="10" rx="5" fill="var(--color-border)"/>
                <rect x="120" y="44" width="46" height="60" rx="10" fill="var(--color-border)" opacity=".5"/>
                <circle cx="133" cy="57" r="9" fill="var(--color-bg)" stroke="var(--color-text-sub)" strokeWidth="1"/>
                <circle cx="133" cy="57" r="5" fill="var(--color-text-muted)" opacity=".3"/>
                <circle cx="152" cy="57" r="9" fill="var(--color-bg)" stroke="var(--color-text-sub)" strokeWidth="1"/>
                <circle cx="152" cy="57" r="5" fill="var(--color-text-muted)" opacity=".3"/>
                <circle cx="133" cy="79" r="9" fill="var(--color-bg)" stroke="var(--color-text-sub)" strokeWidth="1"/>
                <circle cx="133" cy="79" r="5" fill="var(--color-text-muted)" opacity=".3"/>
                <circle cx="152" cy="79" r="6" fill="var(--color-border)"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
