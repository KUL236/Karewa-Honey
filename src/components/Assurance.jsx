import Section from './Section';
import { useLang } from '../lib/i18n';
// "How do we assure quality?"  Text only, no photos. Every point comes from facts already published on this site.
export default function Assurance() {
  const { t } = useLang();
  const P = [
    ['Harvest level', 'कटाई स्तर', 'Quality starts at the bee farm. We choose our nectar fields with care, such as mustard and babool, harvest ripened honey hygienically and keep the harvest area and containers clean.', 'गुणवत्ता मधुमक्खी फार्म से शुरू होती है। हम सरसों और बबूल जैसे नेक्टर वाले खेत ध्यान से चुनते हैं, पका हुआ शहद स्वच्छ तरीके से निकालते हैं और जगह व बर्तन साफ़ रखते हैं।'],
    ['Storage level', 'भंडारण स्तर', 'Honey is kept sealed at room temperature in a dry place. Extra moisture can spoil honey, so we keep our containers closed, just as bees seal the comb with a wax cap.', 'शहद को सील बंद, कमरे के तापमान पर सूखी जगह रखा जाता है। ज़्यादा नमी शहद खराब कर सकती है, इसलिए हम बर्तन बंद रखते हैं, जैसे मधुमक्खियाँ छत्ते को मोम की परत से बंद करती हैं।'],
    ['Filtration level', 'फ़िल्टरेशन स्तर', 'Filtering is the one step natural honey needs before packing. We filter in three stages: screening at the bee farm during harvest, fine filtering when honey goes into storage tanks, and a final filter when jars are filled.', 'पैकिंग से पहले प्राकृतिक शहद को सिर्फ़ छानने की ज़रूरत होती है। हम तीन चरणों में छानते हैं: कटाई के समय फार्म पर, टैंक में रखते समय बारीक फ़िल्टर से, और जार भरते समय अंतिम फ़िल्टर।'],
    ['Quality check level', 'गुणवत्ता जाँच स्तर', 'We get our honey tested in a laboratory before supplying it. Our published lab report belongs to one sample and we say so plainly.', 'हम शहद की प्रयोगशाला जाँच कराते हैं, उसके बाद ही सप्लाई करते हैं। हमारी प्रकाशित रिपोर्ट एक सैंपल की है और हम यह साफ़ बताते हैं।'],
    ['Registrations and documents', 'पंजीकरण और दस्तावेज़', 'Our registration documents are available as copies on request, so you can check them yourself.', 'हमारे पंजीकरण दस्तावेज़ों की प्रतियाँ माँगने पर उपलब्ध हैं, ताकि आप खुद जाँच सकें।'],
    ['Ask us anything', 'हमसे कुछ भी पूछें', 'Questions about a pack or a batch? Call us or send an enquiry and the Karewa Honey team will answer.', 'किसी पैक या बैच के बारे में सवाल है? कॉल करें या पूछताछ भेजें, कारेवा हनी टीम जवाब देगी।']
  ];
  return (
    <Section id="assure" eyebrow={t('Quality', 'गुणवत्ता')} title={t('How do we assure quality?', 'हम गुणवत्ता कैसे सुनिश्चित करते हैं?')} lead={t('Honey is a food, so its quality has to be protected at every step. This is what we do, stage by stage.', 'शहद एक भोजन है, इसलिए हर चरण में उसकी गुणवत्ता की रक्षा ज़रूरी है। हम यह चरण-दर-चरण करते हैं।')}>
      <ol className="assure">{P.map((p, k) => <li key={k} className="rv" style={{ '--d': k * 60 + 'ms' }}><h3>{t(p[0], p[1])}</h3><p>{t(p[2], p[3])}</p></li>)}</ol>
    </Section>
  );
}
