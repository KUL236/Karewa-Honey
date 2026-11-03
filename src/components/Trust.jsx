import { Flower2, Package, FileText, ShoppingCart } from 'lucide-react';
import { useLang } from '../lib/i18n';
export default function Trust() {
  const { t } = useLang();
  const L = [[Flower2, 'Single-flower honey', 'Mustard and Babool varieties', 'एक फूल का शहद', 'सरसों और बबूल की किस्में'], [Package, 'Glass jar packs', '500 g and 1 kg sizes', 'काँच के जार', '500 ग्राम और 1 किलो'], [FileText, 'Lab report published', 'One sample, shown openly', 'लैब रिपोर्ट उपलब्ध', 'एक सैंपल, खुले में'], [ShoppingCart, 'Order online', 'On marketplace listings', 'ऑनलाइन ऑर्डर', 'मार्केटप्लेस लिस्टिंग पर']];
  return <div className="trust"><div className="wrap trust-g">{L.map((x, k) => { const Ic = x[0]; return <div key={k} className="tr"><b aria-hidden="true"><Ic size={26} strokeWidth={1.8} /></b><div><strong>{t(x[1], x[3])}</strong><span>{t(x[2], x[4])}</span></div></div> })}</div></div>;
}
