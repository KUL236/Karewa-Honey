import { MoveHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';
const N = 35, src = i => `/assets/360/f${String(i).padStart(2, '0')}.webp`;
// Drag, swipe, arrow keys or slider to turn the jar. Frames load only when the viewer scrolls into view.
export default function Jar360({ alt }) {
  const { t } = useLang(), [f, setF] = useState(0), [on, setOn] = useState(false), box = useRef(null), drag = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(e => { if (e[0].isIntersecting) { setOn(true); o.disconnect() } }, { rootMargin: '200px' }); o.observe(box.current); return () => o.disconnect() }, []);
  useEffect(() => { if (on) for (let i = 0; i < N; i++) { const im = new Image(); im.src = src(i) } }, [on]);
  const step = d => setF(x => (x + d + N) % N);
  return (
    <div className="jar" ref={box}>
      <div className="jar-v" tabIndex={0} role="img" aria-label={alt + '. ' + t('Drag or use arrow keys to rotate.', 'घुमाने के लिए ड्रैग करें या तीर कुंजियाँ दबाएँ।')}
        onPointerDown={e => { drag.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) }}
        onPointerMove={e => { if (drag.current == null) return; const d = e.clientX - drag.current; if (Math.abs(d) > 14) { step(d > 0 ? -1 : 1); drag.current = e.clientX } }}
        onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}
        onKeyDown={e => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1) }}>
        <img src={src(f)} alt="" draggable="false" width="800" height="800" />
        <span className="jar-h"><MoveHorizontal size={13} aria-hidden="true" className="ic-i" /> {t('Drag to rotate', 'घुमाने के लिए ड्रैग करें')}</span>
      </div>
      <input type="range" min="0" max={N - 1} value={f} onChange={e => setF(+e.target.value)} aria-label={t('Rotate jar', 'जार घुमाएँ')} />
    </div>
  );
}
