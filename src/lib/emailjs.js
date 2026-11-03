// Single place that sends every enquiry. Returns { ok:true } only when EmailJS confirms the mail was accepted.
import { EMAILJS } from '../config/emailjs';
export const sourceFor = (type, source) => (source === 'chatbot' ? 'chatbot' : /bulk|wholesale/i.test(type) ? 'wholesale' : 'website');
const TYPES = ['Product Enquiry', 'Bulk Order', 'Wholesale / Distribution', 'Retail Order', 'Other', 'Free Sample Request', 'Quote Request', 'Suggestion'];
// A copy of every enquiry is also saved in the database (shows in admin -> Enquiries). Best effort: the email is still the main delivery.
async function saveCopy({ name, phone, email, type, message, source, phoneFull }) {
  const c = window.KAREWA_CMS; if (!c || !c.url || !c.key || /YOUR_PROJECT/.test(c.url)) return false;
  try {
    const r = await fetch(c.url.replace(/\/$/, '') + '/rest/v1/rpc/submit_enquiry', { method: 'POST', headers: { apikey: c.key, Authorization: 'Bearer ' + c.key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_name: String(name).slice(0, 80), p_phone: String(phoneFull || '+91 ' + phone).slice(0, 30), p_email: email || null, p_type: TYPES.includes(type) ? type : 'Other', p_message: String(message).slice(0, 1800), p_source: source === 'chatbot' ? 'chatbot' : 'website' }) });
    return r.ok;
  } catch { return false }
}
export async function sendEnquiry(d) {
  const [mail, saved] = await Promise.all([sendMail(d), saveCopy(d)]);
  return mail.ok || saved ? { ok: true } : mail;
}
async function sendMail({ name, phone, email, type, message, source, phoneFull }) {
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
