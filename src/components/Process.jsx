import Section from './Section';
import { useLang } from '../lib/i18n';
import { Bee } from './Bees';
export default function Process() {
  const { t } = useLang();
  const S = [['s1', 'The flowers', 'फूल', 'Bees gather nectar from flowering plants such as mustard and babool.', 'मधुमक्खियाँ सरसों और बबूल जैसे फूलों से रस इकट्ठा करती हैं।'], ['s2', 'The harvest', 'कटाई', 'Honey is collected with traditional, ethical methods.', 'शहद पारंपरिक और नैतिक तरीकों से निकाला जाता है।'], ['s3', 'The final jar', 'अंतिम जार', 'Packed hygienically and sent to you.', 'स्वच्छ पैकिंग के बाद आप तक भेजा जाता है।']];
  return (
    <Section id="process" tone="cream" eyebrow={t('Our process', 'हमारी प्रक्रिया')} title={t('From Nature to Jar', 'प्रकृति से जार तक')}>
      <div className="steps psteps"><span className="pbee pb1"><Bee size={38} /></span><span className="pbee pb2"><Bee size={30} /></span>{S.map((x, k) => <figure key={x[0]} className="step rv" style={{ '--d': k * 90 + 'ms' }}><img src={`/assets/img/${x[0]}.jpg`} alt={x[1]} loading="lazy" /><figcaption><b>0{k + 1}</b><h3>{t(x[1], x[2])}</h3><p>{t(x[3], x[4])}</p></figcaption></figure>)}</div>
      <p className="note rv">{t('Claims as stated by the business. See the lab report in the Quality section.', 'व्यवसाय द्वारा बताए गए दावे। लैब रिपोर्ट गुणवत्ता सेक्शन में देखें।')}</p>
    </Section>
  );
}
