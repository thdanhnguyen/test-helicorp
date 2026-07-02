import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const HERO_IMAGES = [
  '/product/navy/navy-angle.png',
  '/product/black/black-angle.png',
  '/product/silver/silver-angle.png',
  '/product/rose-gold/rose-gold-angle.png'
];

export default function Hero() {
  const phoneRef = useRef(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [fade, setFade] = useState(false);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="hero section" aria-label="Hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="section-tag hero__tag animate-fade-up">New — 2026</p>

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
          <div 
            className="hero__phone-wrap" 
            ref={phoneRef}
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '420px', 
              aspectRatio: '420/520',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div 
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                transform: `translateX(-${imgIdx * 100}%)`,
                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {HERO_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`PHANTOM smartphone color ${i}`}
                  className="hero__phone-img"
                  width="420"
                  height="520"
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    minWidth: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    boxShadow: 'none',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ))}
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
