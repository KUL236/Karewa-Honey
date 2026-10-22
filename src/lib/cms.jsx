import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SITE, SHOP, CERTS, MEDIA } from '../config/site';
import { PRODUCTS } from '../data/products';
import { EXTRAS } from '../data/extras';
import { TIMELINE, FARMS, ROUTES_DEF, POSTS } from '../data/pages';

export const okUrl = u => typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/i.test(u);
export const okDoc = u => typeof u === 'string' && /^(https:\/\/|\/?assets\/)[^\s"'<>]+$/i.test(u);
export const digits = p => String(p || '').replace(/\D/g, '');
const Ctx = createContext(null);

async function loadRows() {
  const c = window.KAREWA_CMS;
  if (!c || !c.url || /YOUR_PROJECT/.test(c.url) || !c.key) return {};
  try {
    const r = await fetch(`${c.url.replace(/\/$/, '')}/rest/v1/site_content?select=key,value&key=in.(contact,shop,certs,products,hero,media,gallery,faq,offers,videos,extras,timeline,farms,routes,posts,langs)`, { headers: { apikey: c.key, Authorization: 'Bearer ' + c.key }, signal: AbortSignal.timeout(5000) });
    if (!r.ok) return {};
    return Object.fromEntries((await r.json()).map(x => [x.key, x.value]));
  } catch { return {} }
}
export function CmsProvider({ children }) {
  const [rows, setRows] = useState({});
  useEffect(() => { let on = true; loadRows().then(r => on && setRows(r)); return () => { on = false } }, []);
  const site = useMemo(() => {
    const contact = { ...SITE, ...Object.fromEntries(Object.entries(rows.contact || {}).filter(([, v]) => typeof v === 'string' && v.trim())) };
    let shop = Array.isArray(rows.shop) && rows.shop.length ? rows.shop.filter(x => x && x.t).map((x, i) => ({ ...(SHOP[i] || {}), ...x, img: x.img || (SHOP[i] || {}).img })) : SHOP;
    shop = shop.map(s => ({ ...s, u: okUrl(s.u) ? s.u : '', f: okUrl(s.f) ? s.f : '', z: okUrl(s.z) ? s.z : '', x: (Array.isArray(s.x) ? s.x : []).filter(e => e && e.n && okUrl(e.u)).map(e => ({ n: String(e.n), u: e.u })) }));
    let products = PRODUCTS.map(p => ({ ...p }));
    if (Array.isArray(rows.products)) {
      const merged = rows.products.filter(Boolean).map(s => { const b = PRODUCTS.find(p => p.id === s.id) || {}; return { ...b, ...s, img: s.iu || b.img || '/assets/img/jar.jpg', pk: Array.isArray(s.pk) && s.pk.length ? s.pk : b.pk || [] } });
      if (merged.length) products = merged.filter(p => !p.hidden && p.en);
    }
    const certs = CERTS.map(c => { const o = (window.KAREWA_CERTS || []).find(x => x && x.id === c.id) || {}; const s = (Array.isArray(rows.certs) ? rows.certs : []).find(x => x && x.id === c.id) || {}; return { ...c, ...o, ...s } });
    const hero = Array.isArray(rows.hero) && rows.hero.length ? rows.hero : null;
    const m = rows.media || {}, feedback = (Array.isArray(m.feedback) ? m.feedback : MEDIA.feedback).filter(x => x && okDoc(x.img)).map(x => ({ img: x.img, cap: Array.isArray(x.cap) ? x.cap : ['', ''] }));
    const media = { feedback, bgoff: !!m.bgoff, bgvideo: okUrl(m.bgvideo) ? m.bgvideo : '' };
    const L = k => Array.isArray(rows[k]) ? rows[k].filter(Boolean) : [];
    const gallery = L('gallery').filter(x => okDoc(x.img)).map(x => [x.img, (x.cap && x.cap[0]) || 'Karewa Honey', x.s === 'tall' || x.s === 'wide' ? x.s : '']);
    const faq = L('faq').filter(x => x.q && x.a && x.q[0] && x.a[0]).map(x => [x.q[0], x.q[1] || x.q[0], x.a[0], x.a[1] || x.a[0]]);
    const offers = L('offers').filter(x => x.en && String(x.en).trim()).map(x => ({ en: String(x.en), hi: x.hi || String(x.en) }));
    const videos = L('videos').filter(x => okDoc(x.src)).map(x => ({ src: x.src, cap: Array.isArray(x.cap) ? [x.cap[0] || '', x.cap[1] || x.cap[0] || ''] : ['', ''] }));
    const pr = (x, d) => Array.isArray(x) ? [x[0] || d || '', x[1] || x[0] || d || ''] : [d || '', d || ''];
    let extras = EXTRAS.map(e => ({ ...e, img: '' }));
    if (Array.isArray(rows.extras) && rows.extras.length) {
      const bySlug = Object.fromEntries(rows.extras.filter(x => x && x.slug).map(x => [x.slug, x]));
      extras = extras.map(e => { const o = bySlug[e.slug]; return o ? { ...e, en: o.en || e.en, hi: o.hi || o.en || e.hi, d: o.d && o.d[0] ? pr(o.d) : e.d, img: okDoc(o.img) ? o.img : '', hidden: !!o.hidden } : e })
        .concat(rows.extras.filter(x => x && x.custom && /^[a-z0-9-]{2,60}$/.test(x.slug || '') && x.en && !EXTRAS.some(e => e.slug === x.slug)).map(x => ({ slug: x.slug, icon: 'Package', en: x.en, hi: x.hi || x.en, d: pr(x.d), img: okDoc(x.img) ? x.img : '', hidden: !!x.hidden })));
      extras = extras.filter(e => !e.hidden);
    }
    const timeline = TIMELINE.concat(L('timeline').filter(x => x.t && x.t[0]).map(x => ({ y: pr(x.y), t: pr(x.t), d: pr(x.d) })));
    const farms = FARMS.concat(L('farms').filter(x => x.n && x.n[0]).map(x => ({ n: pr(x.n), d: pr(x.d), img: okDoc(x.img) ? x.img : '' })));
    const routes = ROUTES_DEF.concat(L('routes').filter(x => x.n && x.n[0]).map(x => ({ n: pr(x.n), d: pr(x.d), img: okDoc(x.img) ? x.img : '' })));
    const posts = L('posts').filter(x => x.t && x.t[0]).map(x => ({ t: pr(x.t), dt: String(x.dt || ''), d: pr(x.d), img: okDoc(x.img) ? x.img : '' })).concat(POSTS);
    const langs = Array.isArray(rows.langs) ? rows.langs.filter(c => typeof c === 'string') : null;
    return { contact, shop, products, certs, hero, media, gallery, faq, offers, videos, extras, timeline, farms, routes, posts, langs };
  }, [rows]);
  return <Ctx.Provider value={site}>{children}</Ctx.Provider>;
}
export const useSite = () => useContext(Ctx);
export const certOK = c => c.verified && c.name && (c.number || okDoc(c.doc));
export const MARKETS = [['u', 'amz', 'Amazon', 'Buy on Amazon', 'अमेज़न पर खरीदें'], ['f', 'fk', 'Flipkart', 'Buy on Flipkart', 'फ्लिपकार्ट पर खरीदें']];
export const firstUrl = (shop, k) => (shop.find(s => okUrl(s[k])) || {})[k] || '';
