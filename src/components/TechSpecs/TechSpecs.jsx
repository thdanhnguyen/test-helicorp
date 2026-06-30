import './TechSpecs.css';

const SPECS = [
  { label: 'Display', value: '6.7" OLED ProMotion 120Hz, 2800 × 1260' },
  { label: 'Chip',    value: 'Phantom Blade AI' },
  { label: 'Camera',  value: '200MP Main · 50MP Ultrawide · 32MP Periscope Telephoto' },
  { label: 'Battery', value: '6000 mAh · 120W SuperCharge · 50W Wireless' },
  { label: 'Storage', value: '256GB / 512GB / 1TB' },
  { label: 'RAM',     value: '12GB / 16GB LPDDR5X' },
  { label: 'OS',      value: 'PhantomOS 3 (Android 15)' },
  { label: 'Build',   value: 'Titanium frame · Gorilla Glass Victus 3 · IP68' },
];

export default function TechSpecs() {
  return (
    <section id="specs" className="specs section section--muted" aria-label="Technical specifications">
      <div className="container">
        <div className="specs__header">
          <p className="section-tag">Under the hood</p>
          <h2 className="section-title">Technical Specifications</h2>
        </div>

        <div className="specs__layout">
          <div className="specs__phone" aria-hidden="true">
            <svg viewBox="0 0 180 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="spec-phone-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3a3a3e"/>
                  <stop offset="100%" stopColor="#1a1a1f"/>
                </linearGradient>
                <linearGradient id="spec-screen-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e2a3e"/>
                  <stop offset="100%" stopColor="#0a1020"/>
                </linearGradient>
              </defs>
              <rect x="6" y="6" width="168" height="348" rx="28" fill="url(#spec-phone-grad)"/>
              <rect x="14" y="26" width="152" height="280" rx="6" fill="url(#spec-screen-grad)"/>
              <line x1="14" y1="80" x2="166" y2="80" stroke="white" strokeWidth=".3" opacity=".05"/>
              <line x1="14" y1="140" x2="166" y2="140" stroke="white" strokeWidth=".3" opacity=".05"/>
              <line x1="14" y1="200" x2="166" y2="200" stroke="white" strokeWidth=".3" opacity=".05"/>
              <line x1="90" y1="26" x2="90" y2="306" stroke="white" strokeWidth=".3" opacity=".05"/>
              <rect x="64" y="14" width="52" height="9" rx="4.5" fill="black" opacity=".5"/>
              <rect x="66" y="334" width="48" height="4" rx="2" fill="white" opacity=".25"/>
              <rect x="108" y="36" width="54" height="68" rx="12" fill="black" opacity=".4"/>
              <circle cx="122" cy="52" r="9" fill="#0a1020" stroke="#404050" strokeWidth="1"/>
              <circle cx="122" cy="52" r="5" fill="#1a2a4a"/>
              <circle cx="122" cy="52" r="2" fill="#7090c0" opacity=".6"/>
              <circle cx="148" cy="52" r="9" fill="#0a1020" stroke="#404050" strokeWidth="1"/>
              <circle cx="148" cy="52" r="5" fill="#1a2a4a"/>
              <circle cx="148" cy="52" r="2" fill="#7090c0" opacity=".6"/>
              <circle cx="122" cy="78" r="9" fill="#0a1020" stroke="#404050" strokeWidth="1"/>
              <circle cx="122" cy="78" r="5" fill="#1a2a4a"/>
              <circle cx="122" cy="78" r="2" fill="#7090c0" opacity=".6"/>
              <circle cx="148" cy="78" r="6" fill="#0a1020" stroke="#404050" strokeWidth="1"/>
              <circle cx="148" cy="78" r="3" fill="#c0a020" opacity=".5"/>
              <rect x="3" y="90" width="3" height="36" rx="1.5" fill="#505058"/>
              <rect x="3" y="138" width="3" height="52" rx="1.5" fill="#505058"/>
              <rect x="174" y="108" width="3" height="44" rx="1.5" fill="#505058"/>
            </svg>
          </div>

          <div className="specs__table">
            {SPECS.map(({ label, value }, i) => (
              <div key={label} className="specs__row" style={{ animationDelay: `${i * 0.05}s` }}>
                <dt className="specs__label">{label}</dt>
                <dd className="specs__value">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
