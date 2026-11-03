import Section from './Section';
import RotatingText from './RotatingText';
import { useLang } from '../lib/i18n';
const QI = { harvest: <path d="M12 21c0-6 0-9 6-14-6 0-9 3-9 8M12 21c0-4-1-7-6-10 0 5 2 8 6 10z" />, store: <path d="M5 8h14l-1 12H6zM8 8V5h8v3" />, filter: <path d="M4 5h16l-6 8v6l-4-2v-4z" />, verify: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4" /> };
export default function About() {
  const { t } = useLang();
  const RS = [['Carefully sourced honey, inspired by nature.', 'प्रकृति से प्रेरित, ध्यान से चुना हुआ शहद।'], ['Responsible handling at every stage.', 'हर चरण में ज़िम्मेदारी से संभाल।'], ['Quality and transparency in every product.', 'हर उत्पाद में गुणवत्ता और पारदर्शिता।'], ['Bringing the goodness of honey closer to you.', 'शहद की अच्छाई को आपके और करीब लाते हुए।']];
  const Q = [['harvest', 'Responsible Harvesting', 'ज़िम्मेदार कटाई', 'Honey depends on healthy bee colonies and flowering plants. Responsible harvesting means taking honey with care and respect for the bees and the environment, and handling it gently from the start. This is the principle we aim to follow.', 'शहद स्वस्थ मधुमक्खी कॉलोनियों और फूलों वाले पौधों पर निर्भर है। ज़िम्मेदार कटाई का मतलब है मधुमक्खियों और पर्यावरण का सम्मान करते हुए सावधानी से शहद लेना। हम इसी सिद्धांत पर चलने का लक्ष्य रखते हैं।'],
    ['store', 'Proper Storage', 'सही भंडारण', 'Honey keeps best in a clean, dry, tightly closed container at room temperature, away from direct sunlight and heat. Sealed jars and clean, dry spoons help protect its natural quality.', 'शहद को साफ़, सूखे, कसकर बंद डिब्बे में कमरे के तापमान पर, धूप और गर्मी से दूर रखना सबसे अच्छा है। बंद जार और साफ़, सूखे चम्मच इसकी गुणवत्ता बचाते हैं।'],
    ['filter', 'Filtration and Processing', 'छनाई और प्रोसेसिंग', 'Honey is commonly strained or filtered to remove visible particles such as wax or debris, and heavy heating can change its natural character. The exact filtration and processing for each variety is described on its product page or confirmed by the Karewa Honey team. We make no claims beyond that.', 'शहद को आमतौर पर छानकर मोम या कचरे जैसे कण हटाए जाते हैं, और ज़्यादा गर्म करने से उसका प्राकृतिक स्वभाव बदल सकता है। हर किस्म की सही प्रक्रिया उसके प्रोडक्ट पेज पर है या टीम बताती है। इसके आगे हम कोई दावा नहीं करते।'],
    ['verify', 'Quality Verification', 'गुणवत्ता सत्यापन', 'Food products need to meet applicable food safety requirements, and quality is best shown through documented checks. A nutritional report on one sample is published below, and registrations appear on this site only when supporting documents are verified. We do not claim laboratory testing or certification beyond these documents.', 'खाद्य उत्पादों को लागू खाद्य सुरक्षा नियमों का पालन करना होता है, और गुणवत्ता दस्तावेज़ी जाँच से दिखती है। एक सैंपल की पोषण रिपोर्ट नीचे है, और पंजीकरण तभी दिखते हैं जब दस्तावेज़ सत्यापित हों। इनसे आगे हम किसी लैब टेस्ट या प्रमाणन का दावा नहीं करते।']];
  return (
    <section id="about" className="sec honeycomb">
      <div className="wrap">
        <div className="story">
          <div className="rv"><span className="eyebrow">{t('About Karewa Honey', 'कारेवा हनी के बारे में')}</span><h2>{t("Nature's Goodness, Our Commitment", 'प्रकृति की अच्छाई, हमारी प्रतिबद्धता')}</h2>
            <p>{t('Karewa Honey is committed to bringing honey and bee-related products closer to customers while focusing on quality, responsible sourcing, and customer satisfaction.', 'कारेवा हनी गुणवत्ता, ज़िम्मेदार सोर्सिंग और ग्राहक संतुष्टि पर ध्यान देते हुए शहद और मधुमक्खी से जुड़े उत्पाद ग्राहकों के और करीब लाने के लिए प्रतिबद्ध है।')}</p>
            <p>{t('We aim to build a trusted connection between beekeepers, suppliers, and consumers by making quality honey and beeswax products accessible for everyday needs.', 'हम मधुमक्खी पालकों, सप्लायर्स और उपभोक्ताओं के बीच भरोसेमंद रिश्ता बनाना चाहते हैं, ताकि रोज़ की ज़रूरतों के लिए अच्छा शहद और मोम के उत्पाद आसानी से मिलें।')}</p></div>
          <figure className="rv"><picture><source media="(max-width:700px)" srcSet="/assets/hero/h3m.webp" /><img src="/assets/hero/h3.webp" alt={t('A beekeeper handling a honeycomb', 'मधुमक्खी पालक छत्ते के साथ')} loading="lazy" width="1600" height="900" /></picture></figure>
        </div>
        <div className="vision rv">
          <figure><picture><source media="(max-width:700px)" srcSet="/assets/hero/h2m.webp" /><img src="/assets/hero/h2.webp" alt={t('Honeybees on a beehive', 'छत्ते पर मधुमक्खियाँ')} loading="lazy" width="1600" height="900" /></picture></figure>
          <div className="vision-t"><span className="eyebrow light">{t('Our Vision', 'हमारा विज़न')}</span><h2>{t("Bringing Nature's Golden Goodness to Every Home", 'प्रकृति की सुनहरी अच्छाई हर घर तक')}</h2>
            <p>{t('Our vision is to build a trusted name in honey and bee-related products through quality, transparency, responsible sourcing, and customer satisfaction.', 'हमारा विज़न गुणवत्ता, पारदर्शिता, ज़िम्मेदार सोर्सिंग और ग्राहक संतुष्टि के ज़रिए शहद और मधुमक्खी उत्पादों में एक भरोसेमंद नाम बनाना है।')}</p>
            <RotatingText items={RS.map(d => t(d[0], d[1]))} className="about-rot" /></div>
        </div>
        <h2 className="qa-h rv">{t('Quality Assurance', 'गुणवत्ता आश्वासन')}</h2>
        <div className="qag">{Q.map((q, k) => <article key={q[0]} className="qc rv" style={{ '--d': k * 80 + 'ms' }}><div className="qi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{QI[q[0]]}</svg></div><h3>{t(q[1], q[2])}</h3><p>{t(q[3], q[4])}</p></article>)}</div>
      </div>
    </section>
  );
}
