import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Section from './Section';
import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
const G0 = [['/assets/img/jz.jpg', 'Karewa Honey jar on a stone', 'tall'], ['/assets/hero/h3.webp', 'Beekeeper with a honeycomb', 'wide'], ['/assets/img/s2.jpg', 'Honey dripping from a dipper', ''], ['/assets/img/s1.jpg', 'Bees on white flowers', ''], ['/assets/hero/h2.webp', 'Honeybees on the hive', 'wide'], ['/assets/img/mustard-jar.jpg', 'Karewa Honey label', 'tall'], ['/assets/img/s3.jpg', 'Karewa Honey jar', ''], ['/assets/img/beeswax.jpg', 'Karewa beeswax', 'tall'], ['/assets/img/karewa-mustard-front.jpg', 'Karewa Pure Mustard Honey jar', 'tall'], ['/assets/img/karewa-juliflora.jpg', 'Karewa Pure Juliflora Honey jar', 'tall'], ['/assets/img/karewa-pure-honey.jpg', 'Karewa Pure Honey jar', 'tall'], ['/assets/img/karewa-mustard-info.jpg', 'Born from mustard blossoms', ''], ['/assets/img/karewa-nutrition.jpg', 'Nutrition facts and storage on the jar', ''], ['/assets/img/karewa-label-back.jpg', 'Back label with manufacturer details', ''], ['/assets/img/beeswax-cubes.jpg', 'Beeswax cubes', ''], ['/assets/img/bee-frame.jpg', 'Bee frame with wax foundation', ''], ['/assets/img/bee-box.jpg', 'Bee box with frame', '']];
export default function Gallery() {
  const { t } = useLang(), { gallery } = useSite(), G = G0.concat(gallery || []), [i, setI] = useState(-1);
  useEffect(() => { if (i < 0) return; const k = e => { if (e.key === 'Escape') setI(-1); if (e.key === 'ArrowRight') setI(x => (x + 1) % G.length); if (e.key === 'ArrowLeft') setI(x => (x + G.length - 1) % G.length) }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [i]);
  return (
    <Section id="gallery" eyebrow={t('Gallery', 'गैलरी')} title={t('A look at the hive and the jar', 'छत्ते और जार की झलक')}>
      <div className="gal">{G.map((g, k) => <button key={g[0]} type="button" className={'gi rv ' + g[2]} onClick={() => setI(k)} aria-label={g[1]}><img src={g[0]} alt={g[1]} loading="lazy" /></button>)}</div>
      {i >= 0 && <div className="lb" role="dialog" aria-modal="true" aria-label={G[i][1]} onClick={() => setI(-1)}><button type="button" className="x" aria-label="Close"><X size={18} aria-hidden="true" /></button><img src={G[i][0]} alt={G[i][1]} /></div>}
    </Section>
  );
}
