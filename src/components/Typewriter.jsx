import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';
// "Your source for  Pure, Natural Honey|"  typed letter by letter (static text when reduced-motion is on).
export default function Typewriter() {
  const { t } = useLang();
  const W = [t('Pure, Natural Honey', 'शुद्ध, प्राकृतिक शहद'), t('Raw Mustard Honey', 'कच्चा सरसों का शहद'), t('Babool (Juliflora) Honey', 'बबूल (जूलीफ्लोरा) शहद'), t('Pure Honey Bee Wax', 'शुद्ध मधुमक्खी का मोम')];
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches;
  useEffect(() => {
    if (still) return;
    const w = W[i % W.length], id = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1); else if (!del) setDel(true); else if (n > 0) setN(n - 1); else { setDel(false); setI(i + 1) }
    }, !del && n === w.length ? 1500 : del ? 35 : 80);
    return () => clearTimeout(id);
  }, [n, del, i, still, W.join('|')]);
  const w = W[i % W.length];
  return <h2 className="typer"><span>{t('Your source for', 'आपका भरोसेमंद स्रोत')}</span> <em aria-label={w}>{still ? W[0] : w.slice(0, n)}<i className="caret" /></em></h2>;
}
