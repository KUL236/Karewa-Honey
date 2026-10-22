// Single place that sends every enquiry. Returns { ok:true } only when EmailJS confirms the mail was accepted.
import { EMAILJS } from '../config/emailjs';
export const sourceFor = (type, source) => (source === 'chatbot' ? 'chatbot' : /bulk|wholesale/i.test(type) ? 'wholesale' : 'website');
export async function sendEnquiry({ name, phone, email, type, message, source, phoneFull }) {
  const src = sourceFor(type, source), tpl = EMAILJS.templates[src] || EMAILJS.templates.fallback;
  if (!EMAILJS.serviceId || !EMAILJS.publicKey || !tpl) return { ok: false, code: 'not_configured' };
  try {
    const c = new AbortController(), tm = setTimeout(() => c.abort(), 20000);
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: c.signal,
      body: JSON.stringify({ service_id: EMAILJS.serviceId, template_id: tpl, user_id: EMAILJS.publicKey, template_params: {
        to_email: EMAILJS.toEmail, from_name: name, phone: phoneFull || '+91 ' + phone, reply_to: email || EMAILJS.toEmail, email: email || '(not given)',
        enquiry_type: type, message, source: src, page: location.pathname, sent_at: new Date().toLocaleString('en-IN') } })
    });
    clearTimeout(tm);
    return r.ok ? { ok: true } : { ok: false, code: r.status === 429 ? 'rate_limited' : 'http' + r.status };
  } catch { return { ok: false, code: 'net' } }
}
