// Customer feedback: send (hidden until approved in admin) and read the approved ones. Uses the same Supabase project as the admin panel.
const cfg = () => { const c = window.KAREWA_CMS; return c && c.url && c.key && !/YOUR_PROJECT/.test(c.url) ? { url: c.url.replace(/\/$/, ''), key: c.key } : null };
export async function loadFeedback(limit = 30) {
  const c = cfg(); if (!c) return [];
  try {
    const r = await fetch(`${c.url}/rest/v1/feedback?select=name,city,rating,message,created_at&approved=eq.true&order=created_at.desc&limit=${limit}`, { headers: { apikey: c.key, Authorization: 'Bearer ' + c.key } });
    return r.ok ? await r.json() : [];
  } catch { return [] }
}
export async function sendFeedback({ name, city, rating, message }) {
  const c = cfg(); if (!c) return { ok: false, code: 'not_configured' };
  try {
    const r = await fetch(`${c.url}/rest/v1/feedback`, { method: 'POST', headers: { apikey: c.key, Authorization: 'Bearer ' + c.key, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ name, city: city || null, rating, message }) });
    return r.ok ? { ok: true } : { ok: false, code: 'rejected' };
  } catch { return { ok: false, code: 'network' } }
}
