import { Phone, Mail, MapPin, Receipt } from 'lucide-react';
import Section from './Section';
import EnquiryForm from './EnquiryForm';
import { useLang } from '../lib/i18n';
import { useSite, digits, okUrl } from '../lib/cms';
export default function Contact() {
  const { t } = useLang(), { contact: c } = useSite();
  const soc = [['Instagram', c.instagram], ['YouTube', c.youtube], ['Facebook', c.facebook]].filter(x => okUrl(x[1]));
  return (
    <Section id="contact" tone="cream" eyebrow={t('Contact', 'संपर्क')} title={t('Talk to Karewa Honey', 'कारेवा हनी से बात करें')} lead={t('Questions about our honey, an order or wholesale? Call us, ask the chat assistant, or send an enquiry and our team will get back to you.', 'शहद, ऑर्डर या थोक के बारे में सवाल है? कॉल करें, चैट असिस्टेंट से पूछें या पूछताछ भेजें, हमारी टीम आपसे संपर्क करेगी।')}>
      <div className="ct">
        <div className="cards rv">
          <a className="cd" href={'tel:+' + digits(c.phone)}><b><Phone size={22} aria-hidden="true" /></b><span>{t('Call', 'कॉल')}</span><strong>{c.phone}</strong></a>
          <a className="cd" href={'mailto:' + c.email}><b><Mail size={22} aria-hidden="true" /></b><span>Email</span><strong>{c.email}</strong></a>
          <div className="cd"><b><MapPin size={22} aria-hidden="true" /></b><span>{t('Address', 'पता')}</span><strong>{c.business}, {c.address}</strong></div>
          {c.gstin && <div className="cd"><b><Receipt size={22} aria-hidden="true" /></b><span>GSTIN</span><strong>{c.gstin}</strong></div>}
          {soc.length > 0 && <div className="soc">{soc.map(s => <a key={s[0]} href={s[1]} target="_blank" rel="noopener noreferrer">{s[0]}</a>)}</div>}
        </div>
        <div className="formbox rv"><h3>{t('Send an enquiry', 'पूछताछ भेजें')}</h3><EnquiryForm /></div>
      </div>
    </Section>
  );
}
