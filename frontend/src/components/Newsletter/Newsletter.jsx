import { useState } from 'react';
import './Newsletter.css';

function validate(email, consent) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Please enter your email address.';
  if (!emailRe.test(email)) return 'Please enter a valid email address.';
  if (!consent) return 'Please agree to receive communications.';
  return null;
}

export default function Newsletter() {
  const [email, setEmail]       = useState('');
  const [consent, setConsent]   = useState(false);
  const [privacy, setPrivacy]   = useState(false);
  const [status, setStatus]     = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(email, consent);
    if (err) { setErrorMsg(err); return; }
    setErrorMsg('');
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
      setConsent(false);
      setPrivacy(false);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="newsletter section" aria-label="Stay updated">
      <div className="container">
        <div className="newsletter__card">
          <div className="newsletter__header">
            <p className="section-tag">Early access</p>
            <h2 className="section-title">Stay updated.</h2>
            <p className="section-subtitle">
              Sign up for the latest news on PHANTOM products and exclusive offers.
            </p>
          </div>

          {status === 'success' ? (
            <div className="newsletter__success" role="alert" aria-live="polite">
              <div className="newsletter__success-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="newsletter__success-title">You&apos;re on the list!</p>
              <p className="newsletter__success-sub">We&apos;ll reach out when PHANTOM launches.</p>
              <button
                className="btn btn--ghost newsletter__reset-btn"
                onClick={() => setStatus('idle')}
                id="newsletter-reset-btn"
              >
                Submit another email
              </button>
            </div>
          ) : (
            <form
              className="newsletter__form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Email signup form"
            >
              <div className="newsletter__input-row">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`newsletter__input ${errorMsg ? 'newsletter__input--error' : ''}`}
                  autoComplete="email"
                  aria-describedby={errorMsg ? 'newsletter-error' : undefined}
                  aria-invalid={!!errorMsg}
                  disabled={status === 'loading'}
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="btn btn--primary newsletter__submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="newsletter__spinner" aria-hidden="true" />
                  ) : (
                    'Join'
                  )}
                </button>
              </div>

              {errorMsg && (
                <p id="newsletter-error" className="newsletter__error" role="alert" aria-live="polite">
                  {errorMsg}
                </p>
              )}

              {status === 'error' && !errorMsg && (
                <p className="newsletter__error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="newsletter__checks">
                <label className="newsletter__check" htmlFor="newsletter-consent">
                  <input
                    id="newsletter-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === 'loading'}
                  />
                  <span>Receive to newsletters</span>
                </label>
                <label className="newsletter__check" htmlFor="newsletter-privacy">
                  <input
                    id="newsletter-privacy"
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                    disabled={status === 'loading'}
                  />
                  <span>Agree to our privacy policy</span>
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
