import { useEffect } from 'react';
export default function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv:not(.in)')];
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target) } }), { threshold: .12, rootMargin: '0px 0px -40px' });
    els.forEach(e => o.observe(e));
    return () => o.disconnect();
  });
}
