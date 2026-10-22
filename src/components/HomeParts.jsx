import { Droplets, ShoppingCart, Flower2, ShieldCheck, User, Camera, Play, Package, Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';
import Typewriter from './Typewriter';
import { BeeJar } from './Extras';
export function Intro() {
  const { t } = useLang();
  return (
    <section className="sec intro"><div className="wrap introg">
      <div className="rv"><Typewriter />
        <p className="lead">{t('Raw mustard and babool honey and pure beeswax from Kota, Rajasthan, packed in glass jars and sold openly, with our lab report on display.', 'कोटा, राजस्थान से कच्चा सरसों और बबूल का शहद और शुद्ध मोम, काँच के जार में पैक, और हमारी लैब रिपोर्ट सबके सामने।')}</p>
        <div className="row"><a className="btn gold lg" href="/shop">{t('Buy honey', 'शहद खरीदें')}</a><a className="btn line lg" href="/wholesale">{t('Bulk & wholesale', 'बल्क और थोक')}</a></div></div>
      <BeeJar />
    </div></section>
  );
}
const T = [
  ['/honey', Droplets, 'Our Honey', 'हमारा शहद', 'Mustard, babool and more, each variety by name.', 'सरसों, बबूल और बहुत कुछ, हर किस्म अपने नाम से।'],
  ['/shop', ShoppingCart, 'Shop', 'खरीदें', 'Buy online and spin the jar to read the label.', 'ऑनलाइन खरीदें और जार घुमाकर लेबल पढ़ें।'],
  ['/about', Flower2, 'About', 'हमारे बारे में', 'From flowers to the jar, our process.', 'फूलों से जार तक, हमारी प्रक्रिया।'],
  ['/quality', ShieldCheck, 'Quality', 'गुणवत्ता', 'How do we assure quality?', 'हम गुणवत्ता कैसे सुनिश्चित करते हैं?'],
  ['/founder', User, 'Founder', 'संस्थापक', 'Meet Laturlal Meena, our mission and vision.', 'लटूर लाल मीणा से मिलें, हमारा मिशन और विज़न।'],
  ['/gallery', Camera, 'Gallery', 'गैलरी', 'The hive, the comb and the jar.', 'छत्ता, शहद और जार।'],
  ['/videos', Play, 'Videos', 'वीडियो', 'How our honey is made.', 'हमारा शहद कैसे बनता है।'],
  ['/wholesale', Package, 'Wholesale', 'थोक', 'Bulk raw honey for partners.', 'साझेदारों के लिए बल्क कच्चा शहद।'],
  ['/contact', Phone, 'Contact', 'संपर्क', 'Call, email or send an enquiry.', 'कॉल करें, ईमेल करें या पूछताछ भेजें।']
];
export function HomeLinks() {
  const { t } = useLang();
  return (
    <section className="sec cream"><div className="wrap"><div className="tiles">{T.map((x, k) => { const Ic = x[1]; return <a key={x[0]} href={x[0]} className="tile rv" style={{ '--d': k * 50 + 'ms' }}><b aria-hidden="true"><Ic size={28} strokeWidth={1.8} /></b><h3>{t(x[2], x[3])}</h3><p>{t(x[4], x[5])}</p><span className="go">{t('Open', 'खोलें', 'افتح')}</span></a> })}</div></div></section>
  );
}
export function PageHead({ route }) {
  const { t } = useLang();
  return <div className="phead"><div className="wrap"><nav aria-label="Breadcrumb"><a href="/">{t('Home', 'होम')}</a> / <span>{t(route.label[0], route.label[1])}</span></nav><h1>{t(route.label[0], route.label[1])}</h1></div></div>;
}
