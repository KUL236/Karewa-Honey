import { createContext, useContext, useEffect, useState } from 'react';
import AR from './ar';
const Ctx = createContext({ lang: 'en', setLang() {}, t: s => s, theme: 'light', toggleTheme() {} });
// en / hi / ar are written by hand. The others are translated by Google Translate (loaded only when chosen).
export const LANG_LIST = [['en', 'English'], ['hi', 'हिन्दी'], ['ar', 'العربية'], ['de', 'Deutsch'], ['fr', 'Français'], ['it', 'Italiano'], ['nl', 'Nederlands'], ['sv', 'Svenska'], ['no', 'Norsk'], ['da', 'Dansk'], ['is', 'Íslenska'], ['ja', '日本語'], ['ko', '한국어'], ['zh-CN', '中文']];
const NATIVE = ['en', 'hi', 'ar'], LANGS = LANG_LIST.map(x => x[0]);
export const isGT = l => !NATIVE.includes(l);
const read = (k, d) => { try { return localStorage.getItem(k) || d } catch { return d } };
const setCookie = v => { try { document.cookie = 'googtrans=' + v + ';path=/;max-age=31536000'; document.cookie = 'googtrans=' + v + ';path=/;domain=' + location.hostname + ';max-age=31536000' } catch {} };
const clearCookie = () => { try { const e = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT'; document.cookie = e; document.cookie = e + ';domain=' + location.hostname } catch {} };
function loadGT() {
  if (window.__gt || document.getElementById('gt-script')) return; window.__gt = 1;
  const box = document.createElement('div'); box.id = 'google_translate_element'; box.setAttribute('translate', 'no'); document.body.appendChild(box);
  window.__gtInit = () => { try { new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element') } catch {} };
  const s = document.createElement('script'); s.id = 'gt-script'; s.async = true; s.src = 'https://translate.google.com/translate_a/element.js?cb=__gtInit'; document.head.appendChild(s);
}
export function LangProvider({ children }) {
  const [lang, setLang0] = useState(() => { const l = read('kh_lang', 'en'); return LANGS.includes(l) ? l : 'en' });
  const [theme, setTheme] = useState(() => read('kh_theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  useEffect(() => { const d = document.documentElement; d.lang = isGT(lang) ? 'en' : lang; d.dir = lang === 'ar' ? 'rtl' : 'ltr'; try { localStorage.setItem('kh_lang', lang) } catch {}
    if (isGT(lang)) { setCookie('/en/' + lang); loadGT() } else clearCookie() }, [lang]);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('kh_theme', theme) } catch {} }, [theme]);
  // Switching to/from a Google-translated language reloads the page once, so the page is clean.
  const setLang = l => { if (!LANGS.includes(l) || l === lang) return; try { localStorage.setItem('kh_lang', l) } catch {}
    if (isGT(l)) setCookie('/en/' + l); else clearCookie();
    if (isGT(l) || isGT(lang)) { location.reload(); return } setLang0(l) };
  // t(english, hindi, arabic?)  Arabic comes from the 3rd argument or the dictionary in ar.js; other languages show English here and are translated by Google Translate.
  const t = (en, hi, ar) => (lang === 'hi' && hi ? hi : lang === 'ar' ? (ar || AR[en] || en) : en);
  return <Ctx.Provider value={{ lang, setLang, t, theme, toggleTheme: () => setTheme(x => (x === 'dark' ? 'light' : 'dark')) }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
export const nextLang = l => LANGS[(LANGS.indexOf(l) + 1) % LANGS.length];
export const LANG_LABEL = Object.fromEntries(LANG_LIST.map(x => [x[0], x[1]]));
