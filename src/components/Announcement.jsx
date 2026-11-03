import { useMemo } from 'react';
import { useLang } from '../lib/i18n';
import { useSite, firstUrl, okUrl } from '../lib/cms';
import { OFFERS } from '../config/site';

const Icon = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="ai-ic">{{
  drop: <path fill="currentColor" d="M12 2C9 7 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-4-8-7-13z" />,
  cart: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 10.2h10L19.5 7H6.2" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></g>,
  bag: <path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  star: <path fill="currentColor" d="M12 2l2.6 6.4L21 9l-5 4.5 1.5 7.5-5.5-3.5L6.5 21 8 13.5 3 9l6.4-.6z" />,
  tag: <path d="M3 12V4h8l10 10-8 8zM7.5 8.5h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
}[n]}</svg>;

export default function Announcement() {
  const { t } = useLang(), { shop, offers } = useSite();
  const items = useMemo(() => {
    const a = [{ ic: 'drop', en: 'PURE HONEY, GOLDEN GOODNESS', hi: 'शुद्ध शहद, सुनहरी मिठास' }];
    OFFERS.concat(offers || []).filter(o => o && o.en).forEach(o => a.push({ ic: 'tag', en: o.en, hi: o.hi, href: '/shop' }));
    const am = firstUrl(shop, 'u'), fk = firstUrl(shop, 'f');
    if (am) a.push({ ic: 'cart', en: 'ORDER KAREWA HONEY ON AMAZON', hi: 'कारेवा हनी अमेज़न पर ऑर्डर करें', href: am, ext: 1 });
    if (fk) a.push({ ic: 'bag', en: 'SHOP ON FLIPKART', hi: 'फ्लिपकार्ट पर खरीदें', href: fk, ext: 1 });
    a.push({ ic: 'star', en: 'DISCOVER THE KAREWA HONEY COLLECTION', hi: 'कारेवा हनी संग्रह देखें', href: '/honey' });
    return a;
  }, [shop, offers]);
  const group = hidden => items.concat(items).map((x, k) => {
    const body = <><Icon n={x.ic} />{t(x.en, x.hi)}</>;
    const props = { className: 'ai', key: k };
    return (x.href && (x.href[0] === '#' || okUrl(x.href))
      ? <a {...props} href={x.href} tabIndex={hidden ? -1 : undefined} {...(x.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
      : <span {...props}>{body}</span>);
  });
  // two identical halves -> translateX(-50%) loops with no gap
  return (
    <div className="ann" role="region" aria-label={t('Announcements', 'घोषणाएँ')}>
      <div className="ann-track" style={{ '--n': items.length }}>
        <div className="ann-half">{group(false)}</div>
        <div className="ann-half" aria-hidden="true">{group(true)}</div>
      </div>
    </div>
  );
}
