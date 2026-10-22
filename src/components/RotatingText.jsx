import { useEffect, useRef, useState } from 'react';
// One sentence at a time in a fixed-height box. Old fades up, new rises from below (600 ms). Timer is cleaned up on unmount.
export default function RotatingText({ items, ms = 3500, paused = false, holdLast = false, className = '' }) {
  const [i, setI] = useState(0), [prev, setPrev] = useState(-1), pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    if (items.length < 2 || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    let tm, tm2, dead = false, cur = 0;
    const tick = () => {
      if (dead) return;
      const last = cur === items.length - 1;
      const skip = document.hidden || (holdLast && last && !pausedRef.current) || (!holdLast && pausedRef.current);
      if (!skip) { const n = (cur + 1) % items.length; setPrev(cur); setI(n); cur = n; clearTimeout(tm2); tm2 = setTimeout(() => !dead && setPrev(-1), 700) }
      tm = setTimeout(tick, ms);
    };
    tm = setTimeout(tick, ms);
    return () => { dead = true; clearTimeout(tm); clearTimeout(tm2) };
  }, [items.length, ms, holdLast]);
  return (
    <div className={'rotbox ' + className}>
      {items.map((x, k) => <span key={k} className={'rl' + (k === i ? ' on' : '') + (k === prev ? ' out' : '')} aria-hidden={k !== i}>{x}</span>)}
    </div>
  );
}
