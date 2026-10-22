import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
export default function Founder() {
  const { t } = useLang(), { contact: c } = useSite(), name = c.founder || 'Laturlal Meena';
  return (
    <section className="sec founder" id="founder"><div className="wrap fd rv">
      <img src="/assets/img/founder.jpg" alt={name + ', ' + t('Founder, Karewa Honey', 'संस्थापक, कारेवा हनी')} loading="lazy" width="354" height="436" />
      <div><span className="eyebrow light">{t('A message from our founder', 'हमारे संस्थापक का संदेश')}</span>
        <p className="quote">“{t('Dear customers, your trust is our biggest strength. At Karewa Honey we are committed to delivering pure, natural honey to your family.', 'प्रिय ग्राहकों, आपका भरोसा ही हमारी सबसे बड़ी ताकत है। कारेवा हनी में हम आपके परिवार तक शुद्ध, प्राकृतिक शहद पहुँचाने के लिए प्रतिबद्ध हैं।')}”</p>
        <p>{t('Thank you for choosing Karewa Honey. Stay healthy, stay natural.', 'कारेवा हनी चुनने के लिए धन्यवाद। स्वस्थ रहें, प्राकृतिक रहें।')}</p>
        <p className="sig"><b>{t(name, 'लटूर लाल मीणा')}</b><span>{t('Founder, Karewa Honey', 'संस्थापक, कारेवा हनी')}</span></p></div>
    </div></section>
  );
}
