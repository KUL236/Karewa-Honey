import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import MarketButtons from './MarketButtons';
import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
import { askChat } from './chatBus';
import { MORE_VARIETIES } from '../data/products';
import BgVideo from './BgVideo';

function Modal({ p, onClose }) {
  const { t } = useLang(), { shop } = useSite(), ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement; ref.current?.focus(); document.body.style.overflow = 'hidden';
    const k = e => { if (e.key === 'Escape') onClose(); if (e.key === 'Tab') { const f = ref.current.querySelectorAll('a,button,[tabindex="0"]'); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() } } };
    addEventListener('keydown', k);
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; prev && prev.focus && prev.focus() };
  }, [onClose]);
  const s0 = shop[0] || {};
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={p.en} onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-c" ref={ref} tabIndex={-1}>
        <button type="button" className="x" aria-label={t('Close', 'बंद करें')} onClick={onClose}><X size={18} aria-hidden="true" /></button>
        <img src={p.img} alt={t(p.en, p.hi)} />
        <div className="modal-t">
          <span className="eyebrow">{t(p.at[0], p.at[1])}</span>
          <h3>{t(p.en, p.hi || p.en)}</h3>
          <p className="muted">{t(p.tl[0], p.tl[1])}</p>
          <p>{t(p.d[0], p.d[1])}</p>
          <dl className="facts">{(p.f || []).map((r, i) => <div key={i}><dt>{t(r[0], r[1])}</dt><dd>{t(r[2], r[3])}</dd></div>)}</dl>
          {p.u && p.u.length > 0 && <><h4>{t('Ways to enjoy', 'कैसे इस्तेमाल करें')}</h4><ul className="ticks">{p.u.map((u, i) => <li key={i}>{t(u[0], u[1])}</li>)}</ul></>}
          {p.av
            ? <button type="button" className="btn gold" onClick={() => { onClose(); askChat('Is ' + p.en + ' available?') }}>{t('Ask about availability', 'उपलब्धता के बारे में पूछें')}</button>
            : <><p className="note">{t('Marketplace price for the ' + s0.sz + ' jar: ' + (s0.pr || ''), 'मार्केटप्लेस कीमत (' + (s0.szh || s0.sz) + ' जार): ' + (s0.pr || ''))}. {t('Prices can change; check the listing.', 'कीमत बदल सकती है; लिस्टिंग देखें।')}</p><MarketButtons item={s0} ask={'How can I order ' + p.en + '?'} /></>}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { t } = useLang(), { products, media } = useSite(), [sel, setSel] = useState(null);
  return (
    <Section id="honey" bg={!media.bgoff && <BgVideo src={media.bgvideo || '/assets/video/honey-pour.mp4'} poster={media.bgvideo ? undefined : '/assets/video/honey-pour.jpg'} />} eyebrow={t('Our Honey', 'हमारा शहद')} title={t('Pure. Natural. Premium.', 'शुद्ध। प्राकृतिक। प्रीमियम।')} lead={t('Choose a variety to see its story, pack sizes and how to order.', 'किस्म चुनें और उसकी कहानी, पैक साइज़ और ऑर्डर का तरीका देखें।')}>
      <div className="pgrid">
        {products.map((p, k) => (
          <article key={p.id} id={p.id} className="pcard rv" style={{ '--d': k * 70 + 'ms' }}>
            <button type="button" className="pimg" onClick={() => setSel(p)} aria-label={t('View ' + p.en, p.hi + ' देखें')}><img src={p.img} alt="" loading="lazy" /></button>
            <div className="pbody">
              <span className="eyebrow">{t(p.at[0], p.at[1])}</span>
              <h3>{t(p.en, p.hi)}</h3>
              <p>{t(p.tl[0], p.tl[1])}</p>
              <div className="packs"><small>{t('Pack sizes', 'पैक साइज़')}</small>{(p.pk || []).map(x => <span key={x}>{x}</span>)}</div>
              <button type="button" className="btn line" onClick={() => setSel(p)}>{t('View details', 'विवरण देखें')}</button>
            </div>
          </article>
        ))}
      </div>
      <div className="more rv"><h3>{t('More varieties', 'और किस्में')}</h3><p className="muted">{t('Tap a name to ask the assistant about availability.', 'उपलब्धता पूछने के लिए नाम पर टैप करें।')}</p><div className="pills">{MORE_VARIETIES.map(n => <button key={n} type="button" onClick={() => askChat('Is ' + n + ' honey available?')}>{n}</button>)}</div></div>
      {sel && <Modal p={sel} onClose={() => setSel(null)} />}
    </Section>
  );
}
