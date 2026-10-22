import { Phone } from 'lucide-react';
import Section from './Section';
import { useLang } from '../lib/i18n';
import { useSite, digits } from '../lib/cms';
import { openEnquiry } from './chatBus';
export default function Wholesale() {
  const { t } = useLang(), { contact } = useSite();
  return (
    <Section id="wholesale" tone="dark" eyebrow={t('Wholesale & bulk', 'थोक और बल्क')} title={t("Let's Grow Together.", 'आइए साथ बढ़ें।')}
      lead={t('Premium raw monofloral honey, hygienic packing and a long-term partnership. Pricing, minimum quantity and delivery time are confirmed by our team after your enquiry.', 'प्रीमियम कच्चा मोनोफ्लोरल शहद, स्वच्छ पैकिंग और लंबी साझेदारी। कीमत, न्यूनतम मात्रा और डिलीवरी समय आपकी पूछताछ के बाद हमारी टीम बताएगी।')}>
      <ul className="wl rv">{[['Raw monofloral honey', 'कच्चा मोनोफ्लोरल शहद'], ['Hygienic packing', 'स्वच्छ पैकिंग'], ['Lab report available', 'लैब रिपोर्ट उपलब्ध'], ['Direct talk with the team', 'टीम से सीधी बात']].map(x => <li key={x[0]}>{t(x[0], x[1])}</li>)}</ul>
      <div className="row rv"><button type="button" className="btn gold lg" onClick={() => openEnquiry('Wholesale / Distribution')}>{t('Send a wholesale enquiry', 'थोक पूछताछ भेजें')}</button><a className="btn ghost lg" href={'tel:+' + digits(contact.phone)}><Phone size={17} aria-hidden="true" className="ic-i" /> {contact.phone}</a></div>
    </Section>
  );
}
