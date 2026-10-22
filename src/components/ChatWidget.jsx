import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../lib/i18n';
import { useSite } from '../lib/cms';
import localReply from '../lib/localReply';
import EnquiryForm from './EnquiryForm';

export default function ChatWidget() {
  const { t, lang } = useLang(), site = useSite();
  const [open, setOpen] = useState(false), [msgs, setMsgs] = useState([]), [busy, setBusy] = useState(false), [val, setVal] = useState(''), [form, setForm] = useState(null);
  const hist = useRef([]), box = useRef(null), inp = useRef(null), fab = useRef(null), welcomed = useRef(false), busyRef = useRef(false);
  const push = m => setMsgs(x => [...x, { id: Math.random(), ...m }]);
  useEffect(() => { box.current && (box.current.scrollTop = box.current.scrollHeight) }, [msgs, form, busy]);
  const welcome = useCallback(() => push({ r: 'b', text: t("Welcome to Karewa Honey!\nI'm the Karewa Honey Assistant. Ask me about our honey, bee wax, pack sizes, prices, ordering and storage.\nI answer only from Karewa Honey's own information. If I don't know, you can send an enquiry to the team.", 'कारेवा हनी में आपका स्वागत है!\nमैं कारेवा हनी असिस्टेंट हूँ। शहद, बी वैक्स, पैक साइज़, कीमत, ऑर्डर और स्टोरेज के बारे में पूछिए।\nमैं सिर्फ़ कारेवा हनी की अपनी जानकारी से जवाब देता हूँ। जवाब न मिले तो आप टीम को पूछताछ भेज सकते हैं।') }), [t]);
  const openChat = useCallback(() => { setOpen(true); if (!welcomed.current) { welcomed.current = true; welcome() } setTimeout(() => inp.current && inp.current.focus(), 60) }, [welcome]);
  const ask = useCallback(async q => {
    q = String(q).trim().slice(0, 500); if (!q || busyRef.current) return;
    busyRef.current = true; setBusy(true); push({ r: 'u', text: q }); hist.current.push({ role: 'user', content: q });
    const ans = localReply(q, { t, ...site });
    if (ans) { push({ r: 'b', ...ans }); hist.current.push({ role: 'assistant', content: ans.text.slice(0, 500) }) }
    else push({ r: 'b', fallback: q, text: t("I couldn't find a reliable answer to your question. Please submit an enquiry and the Karewa Honey team can follow up with you.", 'मुझे आपके सवाल का भरोसेमंद जवाब नहीं मिला। कृपया पूछताछ भेजें, कारेवा हनी टीम आपसे संपर्क करेगी।') });
    busyRef.current = false; setBusy(false); setTimeout(() => inp.current && inp.current.focus(), 30);
  }, [t, site]);
  useEffect(() => { const h = e => { openChat(); setTimeout(() => ask(e.detail), 80) }; addEventListener('kh:ask', h); return () => removeEventListener('kh:ask', h) }, [openChat, ask]);
  const clear = () => { setMsgs([]); setForm(null); hist.current = []; welcomed.current = true; welcome() };
  const sugg = lang === 'ar' ? ['ما أنواع العسل لديكم؟', 'ما الأحجام والأسعار؟', 'كيف أطلب؟', 'طلب بكميات كبيرة / جملة'] : lang === 'hi' ? ['आपके पास कौन-कौन से शहद हैं?', 'पैक साइज़ और कीमत क्या है?', 'ऑर्डर कैसे करूँ?', 'बल्क / थोक ऑर्डर', 'शहद कैसे स्टोर करें?', 'मेरा शहद जम क्यों गया?'] : ['Which honey varieties do you have?', 'What are the pack sizes and prices?', 'How do I order?', 'Bulk or wholesale order', 'How should I store honey?', 'Why has my honey crystallised?'];
  return (<>
    <button ref={fab} type="button" className="chatfab" aria-label="Karewa Honey Assistant" aria-expanded={open} aria-controls="chatwin" onClick={() => open ? setOpen(false) : openChat()}><img src="/assets/img/logo.jpg" alt="" /></button>
    {open && <section id="chatwin" className="chat" aria-label="Karewa Honey Assistant" onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); fab.current && fab.current.focus() } }}>
      <div className="ch"><img src="/assets/img/logo.jpg" alt="" /><div><b>Karewa Honey Assistant</b><small>{t('Automatic assistant, not a person. Answers from Karewa Honey info.', 'ऑटोमैटिक असिस्टेंट, इंसान नहीं। कारेवा हनी की जानकारी से जवाब।')}</small></div><button type="button" className="clr" onClick={clear} aria-label={t('Clear chat', 'चैट साफ़ करें')}>{t('Clear', 'साफ़ करें')}</button><button type="button" aria-label={t('Close chat', 'चैट बंद करें')} onClick={() => { setOpen(false); fab.current && fab.current.focus() }}><X size={16} aria-hidden="true" /></button></div>
      <div className="msgs" ref={box} role="log" aria-live="polite" aria-relevant="additions">
        {msgs.map(m => <div key={m.id} className={'m ' + m.r}>
          {m.text}
          {m.links && <span className="ml">{m.links.map((l, i) => <a key={i} href={l.href} {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: () => setOpen(false) })}>{l.label}</a>)}</span>}
          {(m.fallback || m.enquiry) && !form && <button type="button" className="btn gold sm" onClick={() => setForm({ q: m.fallback || '' })}>{t('Submit an Enquiry', 'पूछताछ भेजें')}</button>}
        </div>)}
        {busy && <div className="m b" role="status" aria-label={t('Typing', 'जवाब लिखा जा रहा है')}><span className="dots"><i /><i /><i /></span></div>}
        {form && <div className="m b efm"><EnquiryForm compact source="chatbot" initialMessage={form.q} onCancel={() => setForm(null)} onSaved={() => setTimeout(() => setForm(null), 4000)} /></div>}
      </div>
      <div className="qa">{sugg.map(x => <button key={x} type="button" onClick={() => ask(x)} disabled={busy}>{x}</button>)}</div>
      <form className="cf" onSubmit={e => { e.preventDefault(); const v = val; setVal(''); ask(v) }}><input ref={inp} value={val} onChange={e => setVal(e.target.value)} disabled={busy} maxLength="500" aria-label={t('Your question', 'आपका सवाल')} placeholder={t('Ask about honey…', 'शहद के बारे में पूछें…')} autoComplete="off" /><button type="submit" className="btn gold sm" disabled={busy || !val.trim()}>{t('Send', 'भेजें')}</button></form>
    </section>}
  </>);
}
