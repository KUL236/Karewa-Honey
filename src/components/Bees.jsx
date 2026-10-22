import { useEffect, useRef } from 'react';
// Illustrated honey bee (own artwork). Wings flap via CSS; respects reduced-motion.
export const Bee = ({ size = 46, className = '' }) => (
  <svg className={'bee ' + className} width={size} height={size * .75} viewBox="0 0 64 48" aria-hidden="true" focusable="false">
    <ellipse className="wing w1" cx="24" cy="12" rx="11" ry="7" fill="#dff3ff" stroke="#8fb9d4" strokeWidth="1" opacity=".9" />
    <ellipse className="wing w2" cx="38" cy="11" rx="11" ry="7" fill="#dff3ff" stroke="#8fb9d4" strokeWidth="1" opacity=".9" />
    <path d="M8 30l-6 2 6 2" fill="#2a1608" />
    <ellipse cx="30" cy="29" rx="19" ry="13" fill="#F4B63B" stroke="#2a1608" strokeWidth="2" />
    <path d="M24 17c-3 8-3 16 0 24M33 16c-3 8-3 18 0 25" stroke="#2a1608" strokeWidth="5" fill="none" strokeLinecap="round" />
    <circle cx="51" cy="27" r="9" fill="#2a1608" /><circle cx="54" cy="25" r="2.2" fill="#fff" /><circle cx="54.6" cy="25" r="1" fill="#2a1608" />
    <path d="M52 19c2-5 5-7 8-7M49 19c0-5 1-8 4-10" stroke="#2a1608" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);
// Bees wander across the whole page, between all sections (fixed layer, never blocks clicks).
export function BeeLayer() {
  return <div className="beelayer" aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i} className={'fly f' + i}><Bee size={i === 1 ? 34 : 42} /></span>)}</div>;
}
// A bee that flies along a dotted trail between two sections, then settles on the hexagon.
export function BeeDivider() {
  const r = useRef(null);
  useEffect(() => { const el = r.current; if (!el || !('IntersectionObserver' in window)) return el && el.classList.add('go'); const o = new IntersectionObserver(e => e[0].isIntersecting && (el.classList.add('go'), o.disconnect()), { threshold: .4 }); o.observe(el); return () => o.disconnect() }, []);
  return <div className="beediv" ref={r} aria-hidden="true"><span className="trail" /><span className="trailbee"><Bee size={40} /></span><span className="hexa" /></div>;
}
