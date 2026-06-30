import { useState, useEffect } from 'react';
import Navbar     from './components/Navbar/Navbar';
import Hero       from './components/Hero/Hero';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Features   from './components/FeaturesComponent/Features';
import TechSpecs  from './components/TechSpecs';
import Newsletter from './components/Newsletter';
import Footer     from './components/Footer/Footer';
import './index.css';

export default function App() {
  /* Theme state — persisted in localStorage */
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('phantom-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('phantom-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <ColorPicker />
        <Features />
        <TechSpecs />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
