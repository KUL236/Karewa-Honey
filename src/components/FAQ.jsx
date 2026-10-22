import Section from './Section';
import { useLang } from '../lib/i18n';
import { useSite, digits } from '../lib/cms';
import FlowerBee from './FlowerBee';
export default function FAQ() {
  const { t } = useLang(), { contact, faq } = useSite();
  const Q0 = [['How do I order?', 'ऑर्डर कैसे करूँ?', 'Use the marketplace buttons in the Shop section. Price, pack size and delivery are shown on the listing. No payment is taken on this site. For bulk orders send a wholesale enquiry.', 'शॉप सेक्शन के मार्केटप्लेस बटन इस्तेमाल करें। कीमत, पैक और डिलीवरी लिस्टिंग पर दिखती है। इस साइट पर पेमेंट नहीं लिया जाता। बल्क के लिए थोक पूछताछ भेजें।'],
    ['Why has my honey crystallised?', 'मेरा शहद जम क्यों गया?', 'Crystallisation is natural, especially in mustard honey, and does not mean it has spoiled. To soften it, place the closed jar in warm (not boiling) water.', 'जमना प्राकृतिक है, खासकर सरसों के शहद में, और इसका मतलब खराब होना नहीं है। नरम करने के लिए बंद जार को गुनगुने (उबलते नहीं) पानी में रखें।'],
    ['How should I store honey?', 'शहद कैसे स्टोर करें?', 'In a tightly closed jar at room temperature, away from direct sunlight and heat. Use a clean, dry spoon.', 'कसकर बंद जार में कमरे के तापमान पर, सीधी धूप और गर्मी से दूर। साफ़, सूखे चम्मच का इस्तेमाल करें।'],
    ['Is the honey certified organic?', 'क्या शहद सर्टिफाइड ऑर्गेनिक है?', 'We do not call any honey certified organic without documents. A lab report on one sample is in the Quality section.', 'दस्तावेज़ों के बिना हम किसी शहद को सर्टिफाइड ऑर्गेनिक नहीं कहते। एक सैंपल की लैब रिपोर्ट गुणवत्ता सेक्शन में है।'],
    ['Can honey treat a disease?', 'क्या शहद से बीमारी ठीक होती है?', 'We make no medical claims. Honey does not replace prescribed treatment; please ask a doctor.', 'हम कोई चिकित्सा दावा नहीं करते। शहद डॉक्टर के इलाज की जगह नहीं लेता; कृपया डॉक्टर से पूछें।'],
    ['Which honey varieties do you sell?', 'आप कौन-कौन सा शहद बेचते हैं?', 'Raw mustard honey and babool (juliflora) honey, plus pure honey bee wax. See the Our Honey page for packs and details.', 'कच्चा सरसों का शहद, बबूल (जूलीफ्लोरा) शहद और शुद्ध मधुमक्खी का मोम। पैक और जानकारी के लिए हमारा शहद पेज देखें।'],
    ['Do you supply in bulk or wholesale?', 'क्या आप बल्क या थोक में सप्लाई करते हैं?', 'Yes. Send a wholesale enquiry. Price, minimum quantity and delivery time are confirmed by our team after your enquiry.', 'हाँ। थोक पूछताछ भेजें। कीमत, न्यूनतम मात्रा और डिलीवरी समय हमारी टीम आपकी पूछताछ के बाद बताती है।'],
    ['Is the lab report for every batch?', 'क्या लैब रिपोर्ट हर बैच की है?', 'No. The report on our Quality page is for one honey sample only. Ask us if you need details about a particular pack.', 'नहीं। हमारे गुणवत्ता पेज की रिपोर्ट सिर्फ़ एक शहद सैंपल की है। किसी खास पैक की जानकारी चाहिए तो हमसे पूछें।'],
    ['Why is my honey thick, thin or a different colour?', 'मेरा शहद गाढ़ा, पतला या अलग रंग का क्यों है?', 'Colour and thickness depend on the flower and the season, so every variety looks and tastes a little different. That is normal for natural honey.', 'रंग और गाढ़ापन फूल और मौसम पर निर्भर करते हैं, इसलिए हर किस्म थोड़ी अलग दिखती और चखती है। प्राकृतिक शहद में यह सामान्य है।'],
    ['Where are you based and who is the founder?', 'आप कहाँ हैं और संस्थापक कौन हैं?', 'Karewa Honey is run by Narendra Enterprises in Kota, Rajasthan. The founder is Laturlal Meena.', 'कारेवा हनी, कोटा (राजस्थान) की नरेंद्र एंटरप्राइजेज़ द्वारा चलाया जाता है। संस्थापक लटूर लाल मीणा हैं।'],
    ['How do I reach you?', 'आपसे कैसे संपर्क करूँ?', 'Call us, email Karewabee@gmail.com, or use the enquiry form on the Contact page.', 'हमें कॉल करें, Karewabee@gmail.com पर ईमेल करें, या संपर्क पेज का पूछताछ फ़ॉर्म भरें।']
  ];
  const Q = Q0.concat(faq || []);
  return (
    <Section id="faq" eyebrow={t('FAQ', 'अक्सर पूछे सवाल')} title={t('Good to know', 'जानने लायक बातें')}>
      <div className="faqw"><div className="faq rv">{Q.map(q => <details key={q[0]}><summary>{t(q[0], q[1])}</summary><p>{t(q[2], q[3])}</p></details>)}</div><FlowerBee /></div>
      <p className="note rv">{t('Something else? Ask the chat assistant or call ', 'कुछ और पूछना है? चैट असिस्टेंट से पूछें या कॉल करें ')}<a href={'tel:+' + digits(contact.phone)}>{contact.phone}</a></p>
    </Section>
  );
}
