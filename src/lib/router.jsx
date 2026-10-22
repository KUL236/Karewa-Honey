import { createContext, useContext, useEffect, useState } from 'react';
// Tiny History-API router: every page has its own URL (/honey, /about ...). Internal links work without a page reload.
const Ctx = createContext('/');
export const norm = p => { p = (p || '/').split('?')[0].split('#')[0]; return p.length > 1 ? p.replace(/\/+$/, '') : '/' };
export const go = to => { const [p, h] = to.split('#'); if (norm(p) !== norm(location.pathname)) history.pushState({}, '', p || '/'); window.dispatchEvent(new Event('kh:nav')); setTimeout(() => { const el = h && document.getElementById(h); el ? el.scrollIntoView({ behavior: 'smooth' }) : scrollTo(0, 0) }, 30) };
export function Router({ children }) {
  const [path, setPath] = useState(() => norm(location.pathname));
  useEffect(() => {
    const sync = () => setPath(norm(location.pathname));
    const click = e => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const h = a.getAttribute('href');
      if (!h || !h.startsWith('/') || h.startsWith('//') || /^\/(assets|admin\.html)/.test(h)) return;
      e.preventDefault(); go(h);
    };
    addEventListener('popstate', sync); addEventListener('kh:nav', sync); document.addEventListener('click', click);
    return () => { removeEventListener('popstate', sync); removeEventListener('kh:nav', sync); document.removeEventListener('click', click) };
  }, []);
  return <Ctx.Provider value={path}>{children}</Ctx.Provider>;
}
export const usePath = () => useContext(Ctx);
