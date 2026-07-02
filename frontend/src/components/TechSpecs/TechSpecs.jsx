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
            <img
              src="/product/silver/silver-side.webp"
              alt="PHANTOM side profile"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
            />
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
