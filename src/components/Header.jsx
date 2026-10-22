import { Sun, Moon, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLang, LANG_LIST } from '../lib/i18n';
import { usePath } from '../lib/router';
import { NAV } from '../config/nav';
import { useSite } from '../lib/cms';
import Announcement from './Announcement';
export default function Header() {
  const { t, lang, setLang, theme, toggleTheme } = useLang(), { langs } = useSite(), path = usePath(), [open, setOpen] = useState(false), [menu, setMenu] = useState(null), [lm, setLm] = useState(false), navRef = useRef(null), lref = useRef(null), [solid, setSolid] = useState(false);
  const list = LANG_LIST.filter(x => !langs || x[0] === 'en' || x[0] === lang || langs.includes(x[0]));
  useEffect(() => { const f = () => setSolid(scrollY > 20); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, []);
  useEffect(() => { setOpen(false); setMenu(null); setLm(false) }, [path]);
  useEffect(() => { const d = e => { if (navRef.current && !navRef.current.contains(e.target)) setMenu(null); if (lref.current && !lref.current.contains(e.target)) setLm(false) }; document.addEventListener('pointerdown', d); return () => document.removeEventListener('pointerdown', d) }, []);
  useEffect(() => { const k = e => e.key === 'Escape' && (setOpen(false), setMenu(null), setLm(false)); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, []);
  const hov = () => matchMedia('(hover:hover) and (min-width:961px)').matches;
  const cur = x => path === x[2] || (x[2] !== '/' && path.startsWith(x[2] + '/'));
  return (
    <div className="top">
      <Announcement />
      <header className={'hdr' + (solid ? ' solid' : '')}>
        <a className="logo" href="/" aria-label="Karewa Honey"><img src="/assets/img/logo.png" alt="Karewa Honey: The Taste of India" height="64" /></a>
        <nav ref={navRef} className={open ? 'open' : ''} aria-label={t('Main', 'मुख्य')}>
          {NAV.map((r, k) => r.sub
            ? <div key={k} className={'dd' + (menu === k ? ' on' : '')} onMouseEnter={() => hov() && setMenu(k)} onMouseLeave={() => hov() && setMenu(null)}>
                <button type="button" className="dd-b" aria-expanded={menu === k} aria-haspopup="true" aria-current={r.sub.some(cur) ? 'page' : undefined} onClick={() => setMenu(menu === k ? null : k)}>{t(r.label[0], r.label[1])}<svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                <div className={'dd-m' + (r.sub.length > 6 ? ' wide' : '')} role="menu">
                  {r.all && <a role="menuitem" className="dd-all" href={r.all[2]} onClick={() => setMenu(null)}>{t(r.all[0], r.all[1])}</a>}
                  {r.sub.map(x => <a role="menuitem" key={x[2]} href={x[2]} aria-current={path === x[2] ? 'page' : undefined} onClick={() => setMenu(null)}>{t(x[0], x[1])}</a>)}
                </div>
              </div>
            : <a key={k} href={r.path} aria-current={path === r.path ? 'page' : undefined}>{t(r.label[0], r.label[1])}</a>)}
        </nav>
        <div className="hdr-r">
          <div className="lang" ref={lref}>
            <button type="button" className="chip lg-b" aria-haspopup="listbox" aria-expanded={lm} aria-label={t('Language', 'भाषा')} onClick={() => setLm(!lm)}><Globe size={17} aria-hidden="true" /><span className="lg-c">{lang === 'zh-CN' ? 'ZH' : lang.toUpperCase()}</span></button>
            {lm && <ul className="lg-m" role="listbox" translate="no">{list.map(x => <li key={x[0]} role="option" aria-selected={x[0] === lang}><button type="button" className={x[0] === lang ? 'on' : ''} onClick={() => { setLm(false); setLang(x[0]) }}>{x[1]}</button></li>)}</ul>}
          </div>
          <button type="button" className="chip theme" onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? t('Light mode', 'लाइट मोड') : t('Dark mode', 'डार्क मोड')}>{theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button>
          <a className="btn gold sm fs-btn" href="/free-samples">{t('Free Samples', 'फ्री सैंपल')}</a>
          <button type="button" className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /><i /></button>
        </div>
      </header>
    </div>
  );
}
