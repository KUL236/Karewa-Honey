import Section from './Section';
import { YellowFlower } from './FlowerBee';
import { useLang } from '../lib/i18n';
export default function Quality() {
  const { t } = useLang();
  return (<>
    <Section id="quality" tone="cream" eyebrow={t('Lab report', 'लैब रिपोर्ट')} title={t('Open about what we can show', 'जो दिखा सकते हैं, खुलकर दिखाते हैं')}>
      <div className="qrep">
        <a className="rep-img rv" href="/assets/img/report.jpg" target="_blank" rel="noopener noreferrer"><img src="/assets/img/report.jpg" alt={t('Lab test report for Karewa Honey', 'कारेवा हनी की लैब टेस्ट रिपोर्ट')} loading="lazy" /></a>
        <div className="rv"><h3>{t('Lab test report', 'लैब टेस्ट रिपोर्ट')}</h3><p>{t('This is a nutritional test report for one honey sample. It shows that sample only. It is not a certification and does not describe every batch.', 'यह एक शहद सैंपल की पोषण जाँच रिपोर्ट है। यह सिर्फ़ उसी सैंपल को दिखाती है। यह प्रमाणन नहीं है और हर बैच का विवरण नहीं देती।')}</p><a className="btn line" href="/assets/img/report.jpg" target="_blank" rel="noopener noreferrer">{t('Open full report', 'पूरी रिपोर्ट खोलें')}</a></div>
      </div>
      <YellowFlower />
    </Section>
  </>);
}
