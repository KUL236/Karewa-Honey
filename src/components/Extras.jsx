import { useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';
import { useSite, okUrl, okDoc } from '../lib/cms';
import { Bee } from './Bees';
const FRONT = '/assets/360/f00.webp', BACK = '/assets/360/f17.webp';
// A bee hovering behind the Karewa jar. The jar floats gently and shows front, then back label (cross-fade, never squashed).
export function BeeJar() {
  const [back, setBack] = useState(false), [on, setOn] = useState(false), box = useRef(null);
  const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches;
  useEffect(() => { const o = new IntersectionObserver(e => setOn(e[0].isIntersecting), { rootMargin: '100px' }); o.observe(box.current); return () => o.disconnect() }, []);
  useEffect(() => { if (!on || still) return; const id = setInterval(() => setBack(x => !x), 3600); return () => clearInterval(id) }, [on, still]);
  return (
    <div className="beejar" ref={box} aria-hidden="true">
      <Bee size={120} className="bj-bee2" />
      <div className="bj-jar">
        <img className={back ? '' : 'on'} src={FRONT} alt="" width="540" height="720" />
        <img className={back ? 'on' : ''} src={BACK} alt="" width="540" height="720" loading="lazy" />
      </div>
    </div>
  );
}
const ICONS = {
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5 3z',
  facebook: 'M14 8V6.5c0-.7.3-1 1-1h2V2h-3a4 4 0 0 0-4 4v2H7v3.5h3V22h4v-10.5h3L17.5 8z',
  x: 'M3 3h4.5l4.3 5.8L17 3h3l-6.6 7.7L21 21h-4.5l-4.6-6.2L6.5 21h-3l7.1-8.2z',
  linkedin: 'M4 9h4v12H4zM6 3a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 6 3zm5 6h3.8v1.7c.6-1 1.9-2 3.9-2 4 0 4.3 2.600 4.3 6V21h-4v-5.600c0-1.400 0-3-1.900-3s-2.100 1.400-2.100 2.900V21h-4z',
  telegram: 'M21.5 3.5 2.800 10.700c-.9.400-.9 1.100-.2 1.300l4.700 1.500 1.800 5.600c.2.600.4.800.9.800.4 0 .6-.2.900-.5l2.300-2.200 4.700 3.500c.9.500 1.500.2 1.700-.8l3.100-14.700c.3-1.200-.5-1.800-1.400-1.400z'
};
export const socialList = c => [['instagram', 'Instagram'], ['youtube', 'YouTube'], ['facebook', 'Facebook'], ['x', 'X'], ['linkedin', 'LinkedIn'], ['telegram', 'Telegram']].filter(s => okUrl(c[s[0]]));
export function SocialIcons({ c }) {
  return <div className="socs">{socialList(c).map(s => <a key={s[0]} href={c[s[0]]} target="_blank" rel="noopener noreferrer" aria-label={s[1]}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={ICONS[s[0]]} fillRule="evenodd" /></svg><span>{s[1]}</span></a>)}</div>;
}
export function SocialBand() {
  const { t } = useLang(), { contact: c } = useSite();
  return <section className="sec socband"><div className="wrap rv"><h2>{t('Follow Karewa Honey', 'कारेवा हनी से जुड़ें')}</h2><p className="lead">{t('See the hive, the harvest and new jars on our social pages.', 'हमारे सोशल पेज पर छत्ता, कटाई और नए जार देखें।')}</p><SocialIcons c={c} /></div></section>;
}
const ABBR = { fssai: 'FSSAI', msme: 'MSME', iso: 'ISO', hbb: 'NBB' };
// Certificate logo strip. Emblems are plain name badges; put the real logo file path in `logo` (site.js or admin) to show it instead.
export function CertGrid() {
  const { t } = useLang(), { certs } = useSite();
  return (
    <div className="clogos">{certs.map((c, k) => (
      <a key={c.id} href="/certificates" className="clogo rv" style={{ '--d': k * 70 + 'ms' }}>
        {okDoc(c.logo) ? <img src={c.logo} alt="" loading="lazy" /> : <span className="emb" aria-hidden="true">{ABBR[c.id] || c.t.slice(0, 4)}</span>}
        <b>{c.t}</b>
      </a>))}</div>
  );
}
export function CertStrip() {
  const { t } = useLang();
  return (
    <section className="sec certstrip"><div className="wrap">
      <h2 className="rv">{t('Certificates & registrations', 'प्रमाणपत्र और पंजीकरण')}</h2>
      <p className="lead rv">{t('Copies of our registration documents are available on request.', 'हमारे पंजीकरण दस्तावेज़ों की प्रतियाँ माँगने पर उपलब्ध हैं।')}</p>
      <CertGrid />
    </div></section>
  );
}
