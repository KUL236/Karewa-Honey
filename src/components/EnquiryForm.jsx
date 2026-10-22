import { useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';
import { useSite, digits } from '../lib/cms';
import { sendEnquiry } from '../lib/emailjs';
export const ENQ_TYPES = [['Product Enquiry', 'प्रोडक्ट पूछताछ'], ['Bulk Order', 'बल्क ऑर्डर'], ['Wholesale / Distribution', 'थोक / वितरण'], ['Retail Order', 'रिटेल ऑर्डर'], ['Other', 'अन्य']];
// Saves via the Netlify function. "Saved" is shown ONLY after the server confirms the row was stored.
export default function EnquiryForm({ initialMessage = '', initialType = '', source = 'website', compact = false, onSaved, onCancel }) {
  const { t } = useLang(), site = useSite(), [err, setErr] = useState(null), [state, setState] = useState('idle'), t0 = useRef(Date.now()), f = useRef(null);
  const [type, setType] = useState(initialType), [msg, setMsg] = useState(initialMessage);
  useEffect(() => { setMsg(initialMessage) }, [initialMessage]);
  useEffect(() => { setType(initialType) }, [initialType]);
  useEffect(() => { const h = e => { if (e.detail && e.detail.type) setType(e.detail.type) }; addEventListener('kh:enquiry', h); return () => removeEventListener('kh:enquiry', h) }, []);
  const call = <a href={'tel:+' + digits(site.contact.phone)}>{site.contact.phone}</a>;
  const submit = async e => {
    e.preventDefault(); const v = n => f.current.elements[n].value.trim(), m = /^(?:\+?91|0)?([6-9]\d{9})$/.exec(v('phone').replace(/[()\s.-]/g, ''));
    let bad = '';
    if (v('name').length < 2) bad = t('Please enter your full name.', 'कृपया अपना पूरा नाम लिखें।');
    else if (!m) bad = t('Enter a valid 10-digit Indian mobile number (starting with 6, 7, 8 or 9).', 'सही 10 अंकों का भारतीय मोबाइल नंबर लिखें (6, 7, 8 या 9 से शुरू)।');
    else if (v('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) bad = t('Enter a valid email or leave it empty.', 'सही ईमेल लिखें या खाली छोड़ दें।');
    else if (!type) bad = t('Please choose an enquiry type.', 'कृपया पूछताछ का प्रकार चुनें।');
    else if (v('message').length < 5) bad = t('Please write your question (at least 5 characters).', 'कृपया अपना सवाल लिखें (कम से कम 5 अक्षर)।');
    if (bad) { setErr({ m: bad }); return }
    setErr(null); setState('sending');
    const res = await sendEnquiry({ name: v('name'), phone: m[1], email: v('email'), type, message: v('message'), source });
    const ok = res.ok, code = res.code || '';
    if (ok) { setState('done'); onSaved && onSaved(); return }
    setState('idle');
    setErr({ call: true, m: { rate_limited: t('Too many enquiries from this number or device. Please try again later.', 'इस नंबर या डिवाइस से बहुत ज़्यादा पूछताछ हो चुकी है। कृपया बाद में कोशिश करें।'), not_configured: t('The enquiry service is not connected yet, so your enquiry was NOT sent.', 'पूछताछ सेवा अभी चालू नहीं है, इसलिए आपकी पूछताछ नहीं भेजी गई।'), validation: t('Please check your details and try again.', 'कृपया अपनी जानकारी जाँचकर फिर कोशिश करें।') }[code] || t('Could not send your enquiry right now. It was NOT sent. Please try again.', 'अभी आपकी पूछताछ नहीं भेजी जा सकी। कृपया फिर कोशिश करें।') });
  };
  if (state === 'done') return <p className="ok" role="status">{t('Thank you. Your enquiry has been sent. The Karewa Honey team will follow up with you.', 'धन्यवाद। आपकी पूछताछ भेज दी गई है। कारेवा हनी टीम आपसे संपर्क करेगी।')}</p>;
  return (
    <form ref={f} className={'eqf' + (compact ? ' compact' : '')} onSubmit={submit} noValidate aria-label={t('Enquiry form', 'पूछताछ फ़ॉर्म')}>
      <label>{t('Full Name', 'पूरा नाम')} *<input name="name" autoComplete="name" maxLength="80" required /></label>
      <label>{t('Mobile Number', 'मोबाइल नंबर')} *<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength="16" placeholder="98XXXXXXXX" required /></label>
      <label>{t('Email Address (optional)', 'ईमेल (वैकल्पिक)')}<input name="email" type="email" autoComplete="email" maxLength="120" /></label>
      <label>{t('Enquiry Type', 'पूछताछ का प्रकार')} *<select name="type" value={type} onChange={e => setType(e.target.value)} required><option value="">{t('Select…', 'चुनें…')}</option>{ENQ_TYPES.map(x => <option key={x[0]} value={x[0]}>{t(x[0], x[1])}</option>)}</select></label>
      <label>{t('Message / Question', 'संदेश / सवाल')} *<textarea name="message" rows={compact ? 3 : 4} maxLength="1000" value={msg} onChange={e => setMsg(e.target.value)} required /></label>
      <input className="hpot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      {err && <p className="err" role="alert">{err.m}{err.call && <> {t('You can also call ', 'आप कॉल भी कर सकते हैं: ')}{call}</>}</p>}
      <div className="eact"><button type="submit" className="btn gold" disabled={state === 'sending'}>{state === 'sending' ? t('Sending…', 'भेजा जा रहा है…') : t('Submit', 'भेजें')}</button>{onCancel && <button type="button" className="btn line" onClick={onCancel}>{t('Cancel', 'रद्द करें')}</button>}</div>
    </form>
  );
}
