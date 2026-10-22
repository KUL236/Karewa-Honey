import Section from './Section';
import MarketButtons from './MarketButtons';
import Jar360 from './Jar360';
import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
export default function Shop() {
  const { t } = useLang(), { shop } = useSite();
  return (
    <Section id="shop" tone="cream" eyebrow={t('Shop', 'खरीदें')} title={t('Order Karewa Honey online', 'कारेवा हनी ऑनलाइन ऑर्डर करें')}
      lead={t('Choose a marketplace to order. A button appears only where the product has a listing link. Prefer to talk first? Call us or ask the assistant.', 'ऑर्डर के लिए मार्केटप्लेस चुनें। बटन तभी दिखता है जब लिस्टिंग लिंक हो। पहले बात करनी है? कॉल करें या असिस्टेंट से पूछें।')}>
      <div className="shop-g">
        {shop.map((p, k) => (
          <article key={p.t + k} className="scard rv" style={{ '--d': k * 90 + 'ms' }}>
            <div className="s-img">{p.spin ? <Jar360 alt={p.t} /> : <img src={p.img} alt={p.t} loading="lazy" />}</div>
            <div className="s-body">
              <h3>{t(p.t, p.th)}</h3>
              <p className="muted">{t(p.d, p.dh)}</p>
              <div className="price"><b>{p.pr}</b><span>{t(p.sz, p.szh)}</span></div>
              <MarketButtons item={p} ask={'How can I order ' + p.t + '?'} />
            </div>
          </article>
        ))}
      </div>
      <p className="note rv">{t('Prices are as listed on the marketplace when this page was made and can change. Check the listing for the current price, availability and delivery.', 'कीमतें पेज बनाते समय मार्केटप्लेस पर दी गई थीं और बदल सकती हैं। ताज़ा कीमत, उपलब्धता और डिलीवरी लिस्टिंग पर देखें।')}</p>
    </Section>
  );
}
