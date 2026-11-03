import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { loadFeedback, sendFeedback } from '../lib/feedback';
import Section from './Section';
const Stars = ({ n }) => <span className="stars" role="img" aria-label={n + ' / 5'}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} aria-hidden="true" fill={i <= n ? 'currentColor' : 'none'} />)}</span>;
export default function Feedback({ all }) {
  const { t } = useLang(), [list, setList] = useState(null), [rate, setRate] = useState(0), [st, setSt] = useState('idle'), [err, setErr] = useState(''), f = useRef(null), t0 = useRef(Date.now());
  useEffect(() => { let on = true; loadFeedback(all ? 60 : 6).then(r => on && setList(r)); return () => { on = false } }, [all]);
  const submit = async e => {
    e.preventDefault(); const el = f.current.elements; if (el.website.value || Date.now() - t0.current < 2500) return;
    const name = el.name.value.trim(), city = el.city.value.trim(), message = el.message.value.trim();
    if (name.length < 2) return setErr(t('Please enter your name.', 'कृपया अपना नाम लिखें।'));
    if (!rate) return setErr(t('Please choose a star rating.', 'कृपया स्टार रेटिंग चुनें।'));
    if (message.length < 5) return setErr(t('Please write a few words about your experience.', 'कृपया अपने अनुभव के बारे में कुछ शब्द लिखें।'));
    try { const last = +localStorage.getItem('kh_fb') || 0; if (Date.now() - last < 60000) return setErr(t('Please wait a minute before sending another.', 'कृपया दूसरा भेजने से पहले एक मिनट रुकें।')) } catch {}
    setErr(''); setSt('sending');
    const r = await sendFeedback({ name, city, rating: rate, message });
    if (r.ok) { try { localStorage.setItem('kh_fb', String(Date.now())) } catch {} setSt('done') } else { setSt('idle'); setErr(r.code === 'not_configured' ? t('Feedback is not connected yet. Please try later.', 'फ़ीडबैक सेवा अभी जुड़ी नहीं है। कृपया बाद में कोशिश करें।') : t('Could not send. Please try again.', 'भेजा नहीं जा सका। कृपया फिर कोशिश करें।')) }
  };
  return <Section id="feedback" eyebrow={t('Feedback', 'फ़ीडबैक')} title={t('What our customers say', 'हमारे ग्राहक क्या कहते हैं')} lead={t('Tried Karewa Honey? Tell us how it was. Your feedback is shown after our team checks it.', 'कारेवा हनी आज़माया? हमें बताएँ कैसा लगा। आपका फ़ीडबैक हमारी टीम की जाँच के बाद दिखाया जाता है।')}>
    <div className="fb-wrap">
      <div className="fb-list">
        {list === null ? <p className="mut">{t('Loading…', 'लोड हो रहा है…')}</p> : list.length === 0 ? <p className="mut">{t('No feedback is shown yet. Be the first to share yours.', 'अभी कोई फ़ीडबैक नहीं है। अपना अनुभव सबसे पहले साझा करें।')}</p>
          : list.map((x, k) => <figure key={k} className="fb-c rv"><Quote size={22} aria-hidden="true" className="fb-q" /><Stars n={x.rating} /><blockquote>{x.message}</blockquote><figcaption><b>{x.name}</b>{x.city ? ', ' + x.city : ''}</figcaption></figure>)}
        {!all && list && list.length > 0 && <a className="btn line" href="/feedback">{t('Read all feedback', 'सारे फ़ीडबैक पढ़ें')}</a>}
      </div>
      <div className="formcard fb-form">
        <h3>{t('Share your feedback', 'अपना फ़ीडबैक दें')}</h3>
        {st === 'done' ? <p className="ok" role="status">{t('Thank you! Your feedback was sent. It will appear after our team approves it.', 'धन्यवाद! आपका फ़ीडबैक भेज दिया गया है। हमारी टीम की मंज़ूरी के बाद यह दिखेगा।')}</p>
          : <form ref={f} className="biz" onSubmit={submit} noValidate>
            <label className="bf half"><span>{t('Your name', 'आपका नाम')} *</span><input name="name" type="text" maxLength="60" autoComplete="name" /></label>
            <label className="bf half"><span>{t('City (optional)', 'शहर (वैकल्पिक)')}</span><input name="city" type="text" maxLength="60" autoComplete="address-level2" /></label>
            <div className="bf"><span>{t('Your rating', 'आपकी रेटिंग')} *</span><div className="rate" role="radiogroup" aria-label={t('Rating', 'रेटिंग')}>{[1, 2, 3, 4, 5].map(i => <button key={i} type="button" role="radio" aria-checked={rate === i} aria-label={i + ' / 5'} className={i <= rate ? 'on' : ''} onClick={() => setRate(i)}><Star size={28} aria-hidden="true" fill={i <= rate ? 'currentColor' : 'none'} /></button>)}</div></div>
            <label className="bf"><span>{t('Your feedback', 'आपका फ़ीडबैक')} *</span><textarea name="message" rows="4" maxLength="600" /></label>
            <input className="hpot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            {err && <p className="err" role="alert">{err}</p>}
            <div className="eact"><button className="btn gold" type="submit" disabled={st === 'sending'}>{st === 'sending' ? t('Sending…', 'भेजा जा रहा है…') : t('Send feedback', 'फ़ीडबैक भेजें')}</button></div>
          </form>}
      </div>
    </div>
  </Section>;
}
