import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Linkedin, Send } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useSite, okUrl, digits, firstUrl } from '../lib/cms';
export default function Footer() {
  const { t } = useLang(), { contact: c, shop } = useSite();
  const social = [['facebook', Facebook, 'Facebook'], ['instagram', Instagram, 'Instagram'], ['youtube', Youtube, 'YouTube'], ['x', Twitter, 'X'], ['linkedin', Linkedin, 'LinkedIn'], ['telegram', Send, 'Telegram']].filter(s => okUrl(c[s[0]]));
  const am = firstUrl(shop, 'u'), fk = firstUrl(shop, 'f');
  const col = (h, hh, L) => <div><h4>{t(h, hh)}</h4>{L.map(x => <a key={x[2]} href={x[2]} {...(x[3] ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{t(x[0], x[1])}</a>)}</div>;
  return (
    <footer className="ftr ft2"><div className="wrap fg2">
      <div className="f-brand">
        <a className="logo f" href="/" aria-label="Karewa Honey"><img src="/assets/img/logo.png" alt="Karewa Honey: The Taste of India" height="120" /></a>
        <p className="f-line"><MapPin size={17} aria-hidden="true" /><span>{c.address}</span></p>
        <a className="f-line" href={'tel:+' + digits(c.phone)}><Phone size={17} aria-hidden="true" /><span>{c.phone}</span></a>
        <a className="f-line" href={'mailto:' + c.email}><Mail size={17} aria-hidden="true" /><span>{c.email}</span></a>
        {social.length > 0 && <div className="f-soc">{social.map(s => { const I = s[1]; return <a key={s[0]} href={c[s[0]]} target="_blank" rel="noopener noreferrer" aria-label={s[2]}><I size={20} aria-hidden="true" /></a> })}</div>}
      </div>
      {col('Quick Links', 'त्वरित लिंक', [['About Us', 'हमारे बारे में', '/about'], ['Our Farms', 'हमारे फ़ार्म', '/farms'], ['Products', 'उत्पाद', '/products'], ['Free Samples', 'फ्री सैंपल', '/free-samples'], ['Contact', 'संपर्क', '/contact']])}
      {col('Other Pages', 'अन्य पेज', [['Privacy & Policy', 'गोपनीयता नीति', '/privacy-policy'], ['Terms of Use', 'उपयोग की शर्तें', '/terms-of-use'], ['Disclaimer', 'अस्वीकरण', '/disclaimer'], ['FAQ', 'सवाल-जवाब', '/faq']])}
      {col('Useful links', 'उपयोगी लिंक', [['Our beekeeping migratory routes', 'हमारे मधुमक्खी पालन प्रवास मार्ग', '/migration-routes'], ['Quality assurance', 'गुणवत्ता आश्वासन', '/quality'], ['How do we process', 'हम कैसे प्रोसेस करते हैं', '/about#process'], ['Honey testing parameters', 'शहद की जाँच के मानक', '/quality#quality'], ['Common myths about honey', 'शहद के बारे में आम भ्रम', '/bee-pedia/you-must-know']].concat(am ? [['Buy on Amazon', 'अमेज़न पर खरीदें', am, 1]] : [], fk ? [['Buy on Flipkart', 'फ्लिपकार्ट पर खरीदें', fk, 1]] : []))}
    </div><div className="wrap copy">{t('Copyright', 'कॉपीराइट')} © {new Date().getFullYear()} {c.brand || 'Karewa Honey'} ({c.business}). {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}</div></footer>
  );
}
