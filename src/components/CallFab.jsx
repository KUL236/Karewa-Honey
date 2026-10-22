import { useLang } from '../lib/i18n';
import { useSite, digits } from '../lib/cms';
export default function CallFab() {
  const { t } = useLang(), { contact } = useSite();
  const wa = 'https://wa.me/' + digits(contact.phone) + '?text=' + encodeURIComponent(t('Hello Karewa Honey, I would like to know more about your honey.', 'नमस्ते कारेवा हनी, मुझे आपके शहद के बारे में जानकारी चाहिए।'));
  return <><a className="wafab" href={wa} target="_blank" rel="noopener noreferrer" aria-label={t('Chat on WhatsApp', 'व्हाट्सऐप पर चैट करें')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><g transform="translate(7.1 7.1) scale(.55)"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.250.2 2.450.6 3.600a1 1 0 0 1-.25 1z" /></g></svg></a><a className="callfab" href={'tel:+' + digits(contact.phone)} aria-label={t('Call Now', 'अभी कॉल करें') + ' ' + contact.phone}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.250.2 2.450.6 3.600a1 1 0 0 1-.25 1z" /></svg></a></>;
}
