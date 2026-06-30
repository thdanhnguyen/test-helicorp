import { useState } from 'react';
import './ColorPicker.css';

const VARIANTS = [
  {
    id: 'phantom-black',
    label: 'Phantom Black',
    swatch: '#1a1a1a',
    bgGradient: 'linear-gradient(135deg, #2a2a2e 0%, #1a1a1f 100%)',
  },
  {
    id: 'arctic-silver',
    label: 'Arctic Silver',
    swatch: '#c0c0c8',
    bgGradient: 'linear-gradient(135deg, #d8d8e0 0%, #b8b8c4 100%)',
  },
  {
    id: 'void-blue',
    label: 'Void Blue',
    swatch: '#2d4a7a',
    bgGradient: 'linear-gradient(135deg, #3a5a8a 0%, #1e3358 100%)',
  },
  {
    id: 'dusk-red',
    label: 'Dusk Red',
    swatch: '#8b2635',
    bgGradient: 'linear-gradient(135deg, #a83040 0%, #6e1e2a 100%)',
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
            <svg
              viewBox="0 0 240 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={`PHANTOM in ${activeVariant.label}`}
            >
              <defs>
                <linearGradient id={`grad-${active}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={activeVariant.swatch} stopOpacity="1"/>
                  <stop offset="100%" stopColor={activeVariant.swatch} stopOpacity="0.7"/>
                </linearGradient>
                <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a2a3e"/>
                  <stop offset="100%" stopColor="#1a1a2e"/>
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="224" height="444" rx="36" fill={`url(#grad-${active})`}/>
              <rect x="8" y="8" width="224" height="444" rx="36" fill="url(#screen-grad)" opacity=".08"/>
              <rect x="20" y="34" width="200" height="360" rx="8" fill="url(#screen-grad)"/>
              <rect x="20" y="34" width="200" height="30" rx="0" fill="white" opacity=".04"/>
              <rect x="88" y="18" width="64" height="12" rx="6" fill="black" opacity=".6"/>
              <rect x="5" y="110" width="3" height="40" rx="2" fill={activeVariant.swatch} opacity=".8"/>
              <rect x="5" y="162" width="3" height="60" rx="2" fill={activeVariant.swatch} opacity=".8"/>
              <rect x="232" y="130" width="3" height="50" rx="2" fill={activeVariant.swatch} opacity=".8"/>
              <rect x="88" y="432" width="64" height="4" rx="2" fill="white" opacity=".3"/>
              <rect x="148" y="46" width="60" height="76" rx="14" fill="black" opacity=".35"/>
              <circle cx="163" cy="64" r="11" fill="black" opacity=".6"/>
              <circle cx="163" cy="64" r="6" fill="#1a2a4a" opacity=".8"/>
              <circle cx="163" cy="64" r="2.5" fill="#7090c0" opacity=".6"/>
              <circle cx="193" cy="64" r="11" fill="black" opacity=".6"/>
              <circle cx="193" cy="64" r="6" fill="#1a2a4a" opacity=".8"/>
              <circle cx="193" cy="64" r="2.5" fill="#7090c0" opacity=".6"/>
              <circle cx="163" cy="95" r="11" fill="black" opacity=".6"/>
              <circle cx="163" cy="95" r="6" fill="#1a2a4a" opacity=".8"/>
              <circle cx="163" cy="95" r="2.5" fill="#7090c0" opacity=".6"/>
              <circle cx="193" cy="95" r="7" fill="black" opacity=".5"/>
              <circle cx="193" cy="95" r="3" fill="#c0a020" opacity=".6"/>
            </svg>
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
