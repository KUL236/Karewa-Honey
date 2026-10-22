import Section from './Section';
import { useLang } from '../lib/i18n';
import { useSite, certOK, okDoc } from '../lib/cms';
import { CertGrid } from './Extras';
// Certificates page. Cards appear here as soon as you add a verified certificate in the admin panel (or src/config/site.js).
export default function Certificates() {
  const { t } = useLang(), { certs } = useSite(), live = certs.filter(certOK);
  return (
    <Section id="certs" eyebrow={t('Verified documents', 'सत्यापित दस्तावेज़')} title={t('Certifications & Registrations', 'प्रमाणपत्र और पंजीकरण')} >
      {live.length > 0 && <div className="cg">{live.map((c, k) => <article key={c.id} className="cc rv" style={{ '--d': k * 80 + 'ms' }}><span className="eyebrow">{c.t}</span><h3>{c.name}</h3><dl>{c.number && <><dt>{t('Number', 'संख्या')}</dt><dd>{c.number}</dd></>}{c.authority && <><dt>{t('Issued by', 'जारीकर्ता')}</dt><dd>{c.authority}</dd></>}{c.validity && <><dt>{t('Validity', 'वैधता')}</dt><dd>{c.validity}</dd></>}</dl>{okDoc(c.doc) && <a className="btn line" href={c.doc} target="_blank" rel="noopener noreferrer">{t('View document', 'दस्तावेज़ देखें')}</a>}</article>)}</div>}
      <CertGrid />
      <p className="note rv" style={{ textAlign: 'center', marginTop: 24 }}>{t('Need a copy of a document? Call us or send an enquiry and our team will share it.', 'किसी दस्तावेज़ की प्रति चाहिए? कॉल करें या पूछताछ भेजें, हमारी टीम साझा करेगी।')} <a href="/contact">{t('Contact us', 'संपर्क करें')}</a></p>
    </Section>
  );
}
