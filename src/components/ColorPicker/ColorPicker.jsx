import { useState } from 'react';
import './ColorPicker.css';

const VARIANTS = [
  {
    id: 'phantom-black',
    label: 'Phantom Black',
    swatch: '#1a1a1a',
    bgGradient: 'linear-gradient(135deg, #2a2a2e 0%, #1a1a1f 100%)',
    image: '/product/black/black-combo.png',
  },
  {
    id: 'arctic-silver',
    label: 'Arctic Silver',
    swatch: '#c0c0c8',
    bgGradient: 'linear-gradient(135deg, #d8d8e0 0%, #b8b8c4 100%)',
    image: '/product/silver/silver-combo.png',
  },
  {
    id: 'navy',
    label: 'Navy',
    swatch: '#2d4a7a',
    bgGradient: 'linear-gradient(135deg, #3a5a8a 0%, #1e3358 100%)',
    image: '/product/navy/navy-combo.png',
  },
  {
    id: 'rose-gold',
    label: 'Rose Gold',
    swatch: '#8b2635',
    bgGradient: 'linear-gradient(135deg, #a83040 0%, #6e1e2a 100%)',
    image: '/product/rose-gold/rose-gold-combo.png',
  },
];

export default function ColorPicker() {
  const [active, setActive] = useState(VARIANTS[0].id);
  const activeVariant = VARIANTS.find((v) => v.id === active);

  return (
    <section id="colors" className="color-picker section" aria-label="Choose your color">
      <div className="container">
        <div className="color-picker__header">
          <h2 className="section-title">Choose your finish.</h2>
          <p className="section-subtitle">
            Four exclusive colorways, each crafted with a precision sandblasted
            matte glass back.
          </p>
        </div>

        <div
          className="color-picker__stage"
          style={{ '--bg-gradient': activeVariant.bgGradient }}
        >
          <div className="color-picker__glow" style={{ background: activeVariant.swatch }} />
          <div className="color-picker__phone">
            <img
              src={activeVariant.image}
              alt={`PHANTOM in ${activeVariant.label}`}
            />
          </div>
        </div>

        <div className="color-picker__swatches" role="group" aria-label="Color options">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              id={`color-swatch-${v.id}`}
              className={`color-picker__swatch ${active === v.id ? 'color-picker__swatch--active' : ''}`}
              style={{ '--swatch': v.swatch }}
              onClick={() => setActive(v.id)}
              aria-label={v.label}
              aria-pressed={active === v.id}
            />
          ))}
        </div>

        <p className="color-picker__label" aria-live="polite">
          {activeVariant.label}
        </p>
      </div>
    </section>
  );
}
