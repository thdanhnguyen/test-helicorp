import { useEffect } from 'react';

export function useScrollParallax(ref, { speed = 0.25 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed]);
}
