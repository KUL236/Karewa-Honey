import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';
import RotatingText from './RotatingText';
import { useSite } from '../lib/cms';
export const heroHref = h => { h = String(h || '/'); if (h.startsWith('#/')) h = h.slice(1); return h[0] === '/' || /^https:\/\//i.test(h) ? h : '/' };
const D = 10500; // slide duration: 3 sentences x 3.5 s
export const SLIDES = [
  { i: 'h1', pos: '62% 50%', k: ['Premium Honey', 'प्रीमियम शहद'], h: ["Nature's Golden Treasure", 'प्रकृति का सुनहरा खज़ाना'], c: ['Explore our honey', 'हमारा शहद देखें'], href: '/honey',
    ds: [['Discover the golden sweetness of nature.', 'प्रकृति की सुनहरी मिठास को जानें।'], ['A little jar of goodness for your everyday moments.', 'आपके रोज़मर्रा के पलों के लिए अच्छाई का एक छोटा जार।'], ['Bring home the warmth of Karewa Honey.', 'कारेवा हनी की गर्मजोशी घर लाएँ।']], alt: ['Golden honey dripping from a wooden dipper', 'लकड़ी के डिपर से टपकता सुनहरा शहद'] },
  { i: 'h2', pos: '50% 35%', k: ['Bees & Flowers', 'मधुमक्खियाँ और फूल'], h: ['Every Drop Has a Story', 'हर बूँद की एक कहानी है'], c: ['Our story', 'हमारी कहानी'], href: '/about',
    ds: [['Inspired by the remarkable world of honeybees.', 'मधुमक्खियों की अनोखी दुनिया से प्रेरित।'], ['Explore the connection between bees, flowers, and honey.', 'मधुमक्खियों, फूलों और शहद के रिश्ते को जानें।'], ['Discover the beauty behind every drop.', 'हर बूँद के पीछे की खूबसूरती को जानें।']], alt: ['Honeybees on a beehive', 'छत्ते पर मधुमक्खियाँ'] },
  { i: 'h5', pos: '62% 50%', k: ['Bees & Pollen', 'मधुमक्खी और पराग'], h: ['Small Wings, Big Work', 'छोटे पंख, बड़ा काम'], c: ['Our story', 'हमारी कहानी'], href: '/about',
    ds: [['Every jar of honey begins with a bee on a flower.', 'शहद के हर जार की शुरुआत फूल पर बैठी एक मधुमक्खी से होती है।'], ['Visit after visit, a bee carries pollen from bloom to bloom.', 'बार-बार जाकर मधुमक्खी फूल से फूल तक पराग ले जाती है।'], ['We are grateful for the bees behind our honey.', 'हम अपने शहद के पीछे की मधुमक्खियों के आभारी हैं।']], alt: ['A honeybee with pollen on a purple flower', 'बैंगनी फूल पर पराग के साथ मधुमक्खी'] },
  { i: 'h6', pos: '62% 50%', k: ['Beekeeping', 'मधुमक्खी पालन'], h: ['Where Honey Begins', 'जहाँ से शहद शुरू होता है'], c: ['See how it is made', 'देखें कैसे बनता है'], href: '/about#process',
    ds: [['A beekeeper opens the hive and checks each frame with care.', 'मधुमक्खी पालक छत्ता खोलकर हर फ्रेम को ध्यान से देखता है।'], ['Thousands of bees, one patient keeper.', 'हज़ारों मधुमक्खियाँ, एक धैर्यवान पालक।'], ['Healthy hives are where good honey starts.', 'स्वस्थ छत्तों से ही अच्छे शहद की शुरुआत होती है।']], alt: ['A beekeeper in a white suit working a hive surrounded by bees', 'सफ़ेद सूट में मधुमक्खी पालक, चारों ओर मधुमक्खियाँ'] },
  { i: 'h3', pos: '50% 40%', k: ['Honey Harvesting', 'शहद की कटाई'], h: ['From Hive to Home', 'छत्ते से घर तक'], c: ['Discover our process', 'हमारी प्रक्रिया जानें'], href: '/about#process',
    ds: [['Discover the journey from the hive to your table.', 'छत्ते से आपकी थाली तक का सफ़र जानें।'], ['Explore the fascinating process of honey harvesting.', 'शहद की कटाई की दिलचस्प प्रक्रिया को जानें।'], ['Get to know the story behind our products.', 'हमारे उत्पादों के पीछे की कहानी जानें।']], alt: ['A beekeeper handling a honeycomb', 'मधुमक्खी पालक छत्ते के साथ'] },
  { i: 'h4', pos: '70% 60%', k: ['Our Jars', 'हमारे जार'], h: ['Discover Karewa Honey', 'कारेवा हनी को जानें'], c: ['Shop now', 'अभी खरीदें'], href: '/shop',
    ds: [['Find the honey variety that suits your preferences.', 'अपनी पसंद के अनुसार शहद की किस्म चुनें।'], ['Explore our honey and beeswax collection.', 'हमारे शहद और मोम के संग्रह को देखें।'], ['Discover products for your everyday needs.', 'अपनी रोज़ की ज़रूरतों के उत्पाद देखें।']], alt: ['A Karewa Honey jar', 'कारेवा हनी का जार'] }
];
export default function Hero() {
  const { t } = useLang(), { hero } = useSite(), slides = hero || SLIDES, n = slides.length, [cur0, setCur] = useState(0), [hold, setHold] = useState(false), tx = useRef(null), cur = cur0 % n;
  const next = useCallback(d => setCur(c => (c + d + n) % n), [n]);
  useEffect(() => { // one timer per slide; cleaned on change/unmount; pauses on hover/focus/hidden tab
    if (hold) return;
    const id = setTimeout(() => { if (!document.hidden) next(1); else setCur(c => c) }, D);
    return () => clearTimeout(id);
  }, [cur, hold, next]);
  return (
    <section id="top" className="hero" aria-roledescription="carousel" aria-label="Karewa Honey"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}
      onTouchStart={e => { tx.current = e.touches[0].clientX }} onTouchEnd={e => { if (tx.current == null) return; const d = e.changedTouches[0].clientX - tx.current; tx.current = null; if (Math.abs(d) > 50) next(d < 0 ? 1 : -1) }}>
      {slides.map((s, k) => (
        <article key={s.i || 'n' + k} className={'slide' + (k === cur ? ' on' : '')} aria-hidden={k !== cur} aria-roledescription="slide" aria-label={`${k + 1} / ${n}`}>
          <picture>
            {(s.im || (!s.iu && s.i)) && <source media="(max-width:700px)" srcSet={s.im || `/assets/hero/${s.i}m.webp`} />}
            <img src={s.iu || `/assets/hero/${s.i}.webp`} alt={t(s.alt[0], s.alt[1])} style={{ objectPosition: s.pos || '50% 50%' }} {...(k === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })} decoding="async" />
          </picture>
          <div className="shade" />
          <div className="hero-in">
            <span className="eyebrow light">{t(s.k[0], s.k[1])}</span>
            <h1 key={cur === k ? 'a' : 'b'}>{t(s.h[0], s.h[1]).split(' ').map((w, j) => <span key={j} className="w" style={{ '--j': j }}>{w}&nbsp;</span>)}</h1>
            {k === cur
              ? <RotatingText key={'r' + cur} items={s.ds.map(d => t(d[0], d[1]))} holdLast paused={hold} className="hero-desc" />
              : <div className="rotbox hero-desc"><span className="rl on">{t(s.ds[0][0], s.ds[0][1])}</span></div>}
            <a className="btn gold lg" href={heroHref(s.href)} tabIndex={k === cur ? 0 : -1}>{t(s.c[0], s.c[1])} <ArrowRight size={18} aria-hidden="true" className="ic-r" /></a>
          </div>
        </article>
      ))}
      <div className="hero-ctl">
        <div className="bars" role="tablist">{slides.map((s, k) => <button key={k} role="tab" aria-selected={k === cur} aria-label={`Slide ${k + 1}`} className={'bar' + (k === cur ? ' on' : '')} onClick={() => setCur(k)}><i style={k === cur ? { animationDuration: D + 'ms', animationPlayState: hold ? 'paused' : 'running' } : undefined} key={k === cur ? 'p' + cur : 'q'} /></button>)}</div>
        <div className="arrows"><button type="button" aria-label="Previous" onClick={() => next(-1)}>‹</button><button type="button" aria-label="Next" onClick={() => next(1)}>›</button></div>
      </div>
    </section>
  );
}
