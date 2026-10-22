import { useEffect, useRef } from 'react';
// Silent looping film behind a section. Plays only while on screen; with "reduce motion" it stays on the still frame.
export default function BgVideo({ src, poster }) {
  const v = useRef(null);
  useEffect(() => {
    const el = v.current; if (!el || matchMedia('(prefers-reduced-motion:reduce)').matches || !('IntersectionObserver' in window)) return;
    const o = new IntersectionObserver(e => { e[0].isIntersecting ? el.play().catch(() => {}) : el.pause() }, { threshold: .1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div className="bgv" aria-hidden="true"><video ref={v} muted loop playsInline preload="metadata" poster={poster} tabIndex={-1}><source src={src} type="video/mp4" /></video></div>;
}
