import { useEffect, useRef } from 'react';
import Section from './Section';
import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
// Brand film plays by itself (muted, looping) while it is on screen and pauses when scrolled away. Tap the sound button or controls to hear it.
function AutoVideo({ name }) {
  const v = useRef(null);
  useEffect(() => {
    const el = v.current; if (!el || !('IntersectionObserver' in window)) return;
    const o = new IntersectionObserver(e => { e[0].isIntersecting ? el.play().catch(() => {}) : el.pause() }, { threshold: .35 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <video ref={v} controls muted loop autoPlay playsInline preload="metadata" poster={`/assets/video/${name}.jpg`}><source src={`/assets/video/${name}.mp4`} type="video/mp4" /></video>;
}
export default function Videos() {
  const { t } = useLang(), { media, videos } = useSite();
  const V = [['making', 'How our honey is made', 'हमारा शहद कैसे बनता है'], ['feedback', 'Customer feedback', 'ग्राहकों की राय']];
  return (
    <Section id="videos" tone="dark" eyebrow={t('Watch', 'देखें')} title={t('See it for yourself', 'खुद देखिए')}>
      <div className="vids">
        <figure className="vid vid-story rv"><AutoVideo name="story" /><figcaption>{t('The Karewa Honey story', 'कारेवा हनी की कहानी')}</figcaption></figure>
        {V.map(v => <figure key={v[0]} className={'vid rv' + (v[0] === 'feedback' ? ' vid-p' : '')}><video controls preload="none" playsInline poster={`/assets/video/${v[0]}.jpg`}><source src={`/assets/video/${v[0]}.mp4`} type="video/mp4" /></video><figcaption>{t(v[1], v[2])}</figcaption></figure>)}
      {(videos || []).map(v => <figure key={v.src} className="vid rv"><video controls preload="none" playsInline><source src={v.src} type="video/mp4" /></video>{(v.cap[0] || v.cap[1]) && <figcaption>{t(v.cap[0], v.cap[1] || v.cap[0])}</figcaption>}</figure>)}
      {media.feedback.map(f => <figure key={f.img} className="vid vid-photo rv"><img src={f.img} alt={t(f.cap[0], f.cap[1] || f.cap[0])} loading="lazy" /><figcaption>{t(f.cap[0], f.cap[1] || f.cap[0])}</figcaption></figure>)}
      </div>
    </Section>
  );
}
