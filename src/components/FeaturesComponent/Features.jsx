import { useEffect, useRef } from 'react';
import './Features.css';

const FEATURES = [
  {
    id: 'camera',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: 'Pro Camera System',
    description: 'Capture professional-grade photos and advanced computational photography from every angle.',
    stat: '200MP',
    statLabel: 'Main sensor',
  },
  {
    id: 'battery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2"/>
        <path d="M22 11v2"/>
        <path d="M6 11h4v2H6z" fill="currentColor" strokeWidth="0"/>
      </svg>
    ),
    title: 'All-Day Battery',
    description: 'A high-density battery engineered to keep you charged all day, supported by ultra-fast charging.',
    stat: '6000',
    statLabel: 'mAh capacity',
  },
  {
    id: 'ai',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" strokeWidth="0"/>
      </svg>
    ),
    title: 'Neural AI Core',
    description: 'Unmatched computational performance and efficiency powered by our new advanced, custom-designed chip.',
    stat: '50B',
    statLabel: 'Operations/sec',
  },
];

export default function Features() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('features__card--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features section" aria-label="Key features">
      <div className="container">
        <div className="features__header">
          <p className="section-tag">Why PHANTOM</p>
          <h2 className="section-title">Built different.</h2>
          <p className="section-subtitle">
            Every component is designed from the ground up to push the
            boundaries of what a smartphone can do.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feat, i) => (
            <article
              key={feat.id}
              id={`feature-card-${feat.id}`}
              ref={(el) => (cardRefs.current[i] = el)}
              className="features__card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="features__card-icon" aria-hidden="true">
                {feat.icon}
              </div>

              <div className="features__card-stat" aria-label={`${feat.stat} ${feat.statLabel}`}>
                <span className="features__stat-num">{feat.stat}</span>
                <span className="features__stat-label">{feat.statLabel}</span>
              </div>

              <h3 className="features__card-title">{feat.title}</h3>
              <p className="features__card-desc">{feat.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
