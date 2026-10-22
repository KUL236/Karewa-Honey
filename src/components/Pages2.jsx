import { useRef, useState } from 'react';
import { Flower2, Layers, Droplet, Sparkles, Crown, Box, Grid3x3, LayoutGrid, Wrench, Cog, Package, Droplets, Phone, ArrowRight, MapPin, Route, CalendarDays } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useSite, digits } from '../lib/cms';
import { sendEnquiry } from '../lib/emailjs';
import { MYTHS, LEGAL } from '../data/pages';
import Section from './Section';
const IC = { Flower2, Layers, Droplet, Sparkles, Crown, Box, Grid3x3, LayoutGrid, Wrench, Cog, Package };
const Para = ({ x }) => { const { t } = useLang(); return <>{t(x[0], x[1])}</> };

/* ---------- list pages (default text + what the admin adds) ---------- */
export function TimelinePage() {
  const { t } = useLang(), { timeline } = useSite();
  return <Section id="timeline" eyebrow={t('Our timeline', 'हमारा सफ़र')} title={t('How Karewa Honey grew', 'कारेवा हनी का सफ़र')}>
    <ol className="tl">{timeline.map((x, k) => <li key={k} className="rv"><span className="tl-y">{t(x.y[0], x.y[1])}</span><div><h3>{t(x.t[0], x.t[1])}</h3><p>{t(x.d[0], x.d[1])}</p></div></li>)}</ol>
  </Section>;
}
const CardList = ({ id, eyebrow, title, lead, items, Icon }) => {
  const { t } = useLang();
  return <Section id={id} eyebrow={eyebrow} title={title} lead={lead}>
    <div className="pgrid">{items.map((x, k) => <article key={k} className="pc rv" style={{ '--d': (k % 6) * 60 + 'ms' }}>
      {x.img ? <img src={x.img} alt={t(x.n[0], x.n[1])} loading="lazy" /> : <b className="pc-i" aria-hidden="true"><Icon size={30} strokeWidth={1.7} /></b>}
      <h3>{t(x.n[0], x.n[1])}</h3><p>{t(x.d[0], x.d[1])}</p></article>)}</div>
  </Section>;
};
export function FarmsPage() { const { t } = useLang(), { farms } = useSite(); return <CardList id="farms" Icon={MapPin} items={farms} eyebrow={t('Our farms', 'हमारे फ़ार्म')} title={t('Where our honey comes from', 'हमारा शहद कहाँ से आता है')} lead={t('Exact apiary locations and visits are shared by our team on request.', 'मधुमक्खी फ़ार्म की सही जगह और विज़िट की जानकारी हमारी टीम माँगने पर देती है।')} /> }
export function RoutesPage() { const { t } = useLang(), { routes } = useSite(); return <CardList id="routes" Icon={Route} items={routes} eyebrow={t('Beekeeping migration routes', 'मधुमक्खी पालन के प्रवास मार्ग')} title={t('Following the flowers', 'फूलों के पीछे-पीछे')} lead={t('Honey bees need flowers. In migratory beekeeping, hives are moved to follow the flowering seasons of different crops and trees.', 'मधुमक्खियों को फूल चाहिए। प्रवासी मधुमक्खी पालन में अलग-अलग फसलों और पेड़ों के फूलों के मौसम के साथ पेटियाँ एक जगह से दूसरी जगह ले जाई जाती हैं।')} /> }
export function MythsPage() {
  const { t } = useLang();
  return <Section id="know" eyebrow={t('You must know', 'ज़रूर जानें')} title={t('Common myths about honey', 'शहद के बारे में आम भ्रम')}>
    <div className="faq-l">{MYTHS.map((m, k) => <details key={k} className="rv" open={k === 0}><summary>{t(m.q[0], m.q[1])}</summary><p>{t(m.a[0], m.a[1])}</p></details>)}</div>
  </Section>;
}
export function BlogPage() {
  const { t } = useLang(), { posts } = useSite();
  return <Section id="blog" eyebrow={t('Blog', 'ब्लॉग')} title={t('Notes from the hive', 'छत्ते से कुछ बातें')}>
    <div className="posts">{posts.map((p, k) => <article key={k} className="post rv">{p.img && <img src={p.img} alt="" loading="lazy" />}<div><h3>{t(p.t[0], p.t[1])}</h3>{p.dt && <span className="post-d"><CalendarDays size={14} aria-hidden="true" /> {p.dt}</span>}<p>{t(p.d[0], p.d[1])}</p></div></article>)}</div>
  </Section>;
}
export function LegalPage({ path }) {
  const { t } = useLang(), L = LEGAL[path];
  return L ? <Section id="legal" eyebrow={t('Karewa Honey', 'कारेवा हनी')} title={t(L.t[0], L.t[1])}><div className="legal">{L.p.map((x, k) => <p key={k}><Para x={x} /></p>)}</div></Section> : null;
}

/* ---------- products ---------- */
export function ProductsHub() {
  const { t } = useLang(), { extras } = useSite();
  const all = [{ slug: 'natural-honey', en: 'Natural Honey', hi: 'प्राकृतिक शहद', img: '/assets/img/mustard.jpg', d: ['Raw mustard and babool honey in glass jars. Order on Amazon and Flipkart.', 'काँच के जार में कच्चा सरसों और बबूल का शहद। Amazon और Flipkart पर ऑर्डर करें।'] }].concat(extras);
  return <Section id="products" eyebrow={t('Products', 'उत्पाद')} title={t('From the hive to your door', 'छत्ते से आपके दरवाज़े तक')} lead={t('Natural honey for everyone, and bee products and beekeeping supplies on request.', 'सबके लिए प्राकृतिक शहद, और माँग पर मधुमक्खी उत्पाद व मधुमक्खी पालन सामग्री।')}>
    <div className="pgrid p3">{all.map((p, k) => { const I = IC[p.icon] || Droplets; return <a key={p.slug} href={'/products/' + p.slug} className="pc rv lnk" style={{ '--d': (k % 6) * 50 + 'ms' }}>
      {p.img ? <img src={p.img} alt="" loading="lazy" /> : <b className="pc-i" aria-hidden="true"><I size={30} strokeWidth={1.7} /></b>}
      <h3>{t(p.en, p.hi)}</h3><p>{t(p.d[0], p.d[1])}</p><span className="go">{t('View', 'देखें')} <ArrowRight size={15} aria-hidden="true" className="ic-r" /></span></a> })}</div>
  </Section>;
}
export function ProductPage({ slug }) {
  const { t } = useLang(), { extras, contact } = useSite(), p = extras.find(x => x.slug === slug);
  if (!p) return null; const I = IC[p.icon] || Package;
  return <Section id="product" eyebrow={t('Bee products', 'मधुमक्खी उत्पाद')} title={t(p.en, p.hi)}>
    <div className="pp">
      <div className="pp-i">{p.img ? <img src={p.img} alt={p.en} /> : <b aria-hidden="true"><I size={72} strokeWidth={1.4} /></b>}</div>
      <div><p className="lead">{t(p.d[0], p.d[1])}</p>
        <ul className="pp-l"><li>{t('Sold on request. No price is listed online.', 'माँग पर उपलब्ध। ऑनलाइन कीमत नहीं दी गई है।')}</li><li>{t('Send a quote request with the quantity you need.', 'ज़रूरी मात्रा के साथ कोटेशन अनुरोध भेजें।')}</li><li>{t('Our team replies with availability and a quote.', 'हमारी टीम उपलब्धता और कोटेशन के साथ जवाब देती है।')}</li></ul>
        <div className="row"><a className="btn gold lg" href={'/request-quote?p=' + p.slug}>{t('Request a quote', 'कोटेशन माँगें')}</a><a className="btn line lg" href={'/free-samples'}>{t('Free samples', 'फ्री सैंपल')}</a><a className="btn line lg" href={'tel:+' + digits(contact.phone)}><Phone size={17} aria-hidden="true" className="ic-i" />{contact.phone}</a></div>
      </div></div>
  </Section>;
}

/* ---------- forms: free samples, request a quote, suggestion ---------- */
// field: [name, en, hi, kind, required, half, options]
function BizForm({ fields, type, doneEn, doneHi, pre = {}, btn }) {
  const { t } = useLang(), { contact } = useSite(), f = useRef(null), t0 = useRef(Date.now()), [st, setSt] = useState('idle'), [err, setErr] = useState('');
  const submit = async e => {
    e.preventDefault(); const el = f.current.elements, v = n => (el[n] && el[n].value || '').trim();
    if (el.website.value || Date.now() - t0.current < 2500) return;
    for (const x of fields) if (x[4] && !v(x[0])) return setErr(t('Please fill: ', 'कृपया भरें: ') + t(x[1], x[2]));
    const em = v('email'), ph = v('phone');
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) return setErr(t('Enter a valid email.', 'सही ईमेल लिखें।'));
    if (ph && !/^\+?[0-9][0-9\s().-]{6,17}$/.test(ph)) return setErr(t('Enter a valid phone number.', 'सही फ़ोन नंबर लिखें।'));
    setErr(''); setSt('sending');
    const name = (v('first') ? v('first') + ' ' + v('last') : v('name')).trim() || 'Website visitor';
    const msg = fields.filter(x => !['first', 'last', 'name', 'email', 'phone'].includes(x[0]) && v(x[0])).map(x => x[1].replace(/\s*\*$/, '') + ': ' + v(x[0])).join('\n').slice(0, 1800);
    const r = await sendEnquiry({ name, phone: digits(ph).slice(-10), phoneFull: ph || '(not given)', email: em, type, message: msg || '(no message)', source: 'website' });
    if (r.ok) setSt('done'); else { setSt('idle'); setErr(r.code === 'not_configured' ? t('The enquiry service is not connected yet, so your form was NOT sent. Please call us.', 'पूछताछ सेवा अभी जुड़ी नहीं है, इसलिए आपका फ़ॉर्म नहीं भेजा गया। कृपया कॉल करें।') : t('Could not send. Please try again or call us on ', 'भेजा नहीं जा सका। कृपया फिर कोशिश करें या कॉल करें: ') + contact.phone) }
  };
  if (st === 'done') return <p className="ok" role="status">{t(doneEn, doneHi)}</p>;
  return <form ref={f} className="biz" onSubmit={submit} noValidate>
    {fields.map(x => { const [n, en, hi, kind, req, half, opts] = x, lab = t(en, hi) + (req ? ' *' : ''); return <label key={n} className={'bf' + (half ? ' half' : '')}>{kind === 'radio' ? <><span>{lab}</span><span className="rads">{opts.map(o => <span key={o[0]}><input type="radio" name={n} value={o[0]} /> {t(o[0], o[1])}</span>)}</span></>
      : kind === 'select' ? <><span>{lab}</span><select name={n} defaultValue={pre[n] || ''}><option value="">{t('Select…', 'चुनें…')}</option>{opts.map(o => <option key={o[0]} value={o[0]}>{t(o[0], o[1])}</option>)}</select></>
      : kind === 'textarea' ? <><span>{lab}</span><textarea name={n} rows="5" maxLength="900" /></> : <><span>{lab}</span><input name={n} type={kind} maxLength="120" defaultValue={pre[n] || ''} autoComplete={n === 'email' ? 'email' : n === 'phone' ? 'tel' : 'off'} /></>}</label> })}
    <input className="hpot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
    {err && <p className="err" role="alert">{err}</p>}
    <div className="eact"><button className="btn gold" type="submit" disabled={st === 'sending'}>{st === 'sending' ? t('Sending…', 'भेजा जा रहा है…') : btn || t('Submit', 'भेजें')}</button></div>
  </form>;
}
export function FreeSamplesPage() {
  const { t } = useLang();
  const F = [['first', 'First name', 'पहला नाम', 'text', 1, 1], ['last', 'Last name', 'अंतिम नाम', 'text', 1, 1], ['email', 'Company email', 'कंपनी ईमेल', 'email', 1, 1], ['phone', 'Phone', 'फ़ोन', 'tel', 1, 1], ['company', 'Company name', 'कंपनी का नाम', 'text', 1, 1], ['qty', 'Estimated monthly order quantity (kg)', 'अनुमानित मासिक ऑर्डर मात्रा (किलो)', 'text', 1, 1], ['city', 'City', 'शहर', 'text', 1, 1], ['postal', 'Postal code', 'पिन कोड', 'text', 1, 1], ['address', 'Address', 'पता', 'text', 1, 0], ['ctype', 'Company type', 'कंपनी का प्रकार', 'radio', 1, 1, [['Brand', 'ब्रांड'], ['Wholesaler or Trader', 'थोक व्यापारी या ट्रेडर']]], ['use', 'Expected end use', 'अपेक्षित उपयोग', 'text', 1, 1], ['message', 'Message with sample details', 'सैंपल की जानकारी के साथ संदेश', 'textarea', 1, 0]];
  return <Section id="samples" eyebrow={t('Free samples', 'फ्री सैंपल')} title={t('Free sample form', 'फ्री सैंपल फ़ॉर्म')} lead={t('We supply to businesses, so please use a business email. Tell us the product, quantity and specification you need and our team will reply.', 'हम व्यवसायों को सप्लाई करते हैं, इसलिए कृपया बिज़नेस ईमेल दें। ज़रूरी उत्पाद, मात्रा और विनिर्देश बताएँ, हमारी टीम जवाब देगी।')}>
    <div className="formcard"><BizForm fields={F} type="Free Sample Request" doneEn="Thank you. Your sample request has been sent. The Karewa Honey team will reply soon." doneHi="धन्यवाद। आपका सैंपल अनुरोध भेज दिया गया है। कारेवा हनी टीम जल्द जवाब देगी।" /></div>
  </Section>;
}
export function QuotePage() {
  const { t } = useLang(), { extras } = useSite(), q = new URLSearchParams(typeof location !== 'undefined' ? location.search : '').get('p') || '';
  const opts = [['Natural Honey', 'प्राकृतिक शहद']].concat(extras.map(e => [e.en, e.hi]), [['Other', 'अन्य']]);
  const pre = { product: (extras.find(e => e.slug === q) || {}).en || '' };
  const F = [['name', 'Full name', 'पूरा नाम', 'text', 1, 1], ['company', 'Company name', 'कंपनी का नाम', 'text', 0, 1], ['email', 'Email', 'ईमेल', 'email', 1, 1], ['phone', 'Phone', 'फ़ोन', 'tel', 1, 1], ['product', 'Product', 'उत्पाद', 'select', 1, 1, opts], ['qty', 'Quantity needed', 'ज़रूरी मात्रा', 'text', 1, 1], ['city', 'City', 'शहर', 'text', 0, 1], ['message', 'Details (size, packing, delivery place)', 'विवरण (साइज़, पैकिंग, डिलीवरी की जगह)', 'textarea', 0, 0]];
  return <Section id="quote" eyebrow={t('For clients', 'ग्राहकों के लिए')} title={t('Request a quote', 'कोटेशन माँगें')} lead={t('Tell us what you need and our team will send a quote.', 'आपको क्या चाहिए बताएँ, हमारी टीम कोटेशन भेजेगी।')}>
    <div className="formcard"><BizForm key={q} fields={F} pre={pre} type="Quote Request" doneEn="Thank you. Your quote request has been sent. Our team will reply with a quote." doneHi="धन्यवाद। आपका कोटेशन अनुरोध भेज दिया गया है। हमारी टीम कोटेशन के साथ जवाब देगी।" /></div>
  </Section>;
}
export function SuggestionPage() {
  const { t } = useLang();
  const F = [['name', 'Your name', 'आपका नाम', 'text', 1, 1], ['email', 'Email (optional)', 'ईमेल (वैकल्पिक)', 'email', 0, 1], ['phone', 'Phone (optional)', 'फ़ोन (वैकल्पिक)', 'tel', 0, 1], ['message', 'Your suggestion', 'आपका सुझाव', 'textarea', 1, 0]];
  return <Section id="suggestion" eyebrow={t('For clients', 'ग्राहकों के लिए')} title={t('Suggestion', 'सुझाव')} lead={t('Help us do better. Tell us what we should improve or add.', 'हमें बेहतर बनने में मदद करें। बताएँ क्या सुधारें या जोड़ें।')}>
    <div className="formcard"><BizForm fields={F} type="Suggestion" doneEn="Thank you for your suggestion. We have received it." doneHi="आपके सुझाव के लिए धन्यवाद। हमें यह मिल गया है।" /></div>
  </Section>;
}
