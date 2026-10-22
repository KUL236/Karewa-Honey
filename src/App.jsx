import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Products from './components/Products';
import Shop from './components/Shop';
import About from './components/About';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Quality from './components/Quality';
import Assurance from './components/Assurance';
import Certificates from './components/Certificates';
import Founder from './components/Founder';
import MissionVision from './components/MissionVision';
import Wholesale from './components/Wholesale';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CallFab from './components/CallFab';
import ChatWidget from './components/ChatWidget';
import { SocialBand, CertStrip } from './components/Extras';
import { Intro, HomeLinks, PageHead } from './components/HomeParts';
import useReveal from './hooks/useReveal';
import { TimelinePage, FarmsPage, RoutesPage, MythsPage, BlogPage, LegalPage, ProductsHub, ProductPage, FreeSamplesPage, QuotePage, SuggestionPage } from './components/Pages2';
import { useSite } from './lib/cms';
import { EXTRAS } from './data/extras';
import { usePath } from './lib/router';
import { useLang } from './lib/i18n';
import { ROUTES, SITE_URL } from './config/routes';
const PAGES = {
  '/': () => <><Hero /><Intro /><Trust /><About /><Products /><Shop /><Process /><Assurance /><Quality /><CertStrip /><Founder /><MissionVision /><Gallery /><Videos /><Wholesale /><FAQ /><SocialBand /><Contact /></>,
  '/honey': () => <Products />,
  '/shop': () => <Shop />,
  '/about': () => <><About /><Process /></>,
  '/quality': () => <><Assurance /><Quality /></>,
  '/certificates': () => <Certificates />,
  '/founder': () => <><Founder /><MissionVision /></>,
  '/gallery': () => <Gallery />,
  '/videos': () => <Videos />,
  '/wholesale': () => <Wholesale />,
  '/faq': () => <FAQ />,
  '/contact': () => <Contact />,
  '/timeline': () => <TimelinePage />,
  '/mission': () => <MissionVision />,
  '/farms': () => <FarmsPage />,
  '/migration-routes': () => <RoutesPage />,
  '/products': () => <ProductsHub />,
  '/products/natural-honey': () => <><Products /><Shop /></>,
  '/request-quote': () => <QuotePage />,
  '/suggestion': () => <SuggestionPage />,
  '/bee-pedia/you-must-know': () => <MythsPage />,
  '/bee-pedia/blog': () => <BlogPage />,
  '/free-samples': () => <FreeSamplesPage />,
  '/privacy-policy': () => <LegalPage path="/privacy-policy" />,
  '/terms-of-use': () => <LegalPage path="/terms-of-use" />,
  '/disclaimer': () => <LegalPage path="/disclaimer" />
};
EXTRAS.forEach(p => { PAGES['/products/' + p.slug] = () => <ProductPage slug={p.slug} /> });
const setMeta = (sel, make, val) => { let e = document.head.querySelector(sel); if (!e) { e = make(); document.head.appendChild(e) } e.setAttribute(e.tagName === 'LINK' ? 'href' : 'content', val) };
export default function App() {
  const path = usePath(), { lang } = useLang(), { extras } = useSite();
  let route = ROUTES.find(r => r.path === path), Page = route && PAGES[path];
  const sl = /^\/products\/([a-z0-9-]+)$/.exec(path), ex = sl && extras.find(e => e.slug === sl[1]);
  if (!Page && ex) { route = { path, label: [ex.en, ex.hi], title: ex.en + ' | Karewa Honey', desc: ex.d[0] }; Page = () => <ProductPage slug={ex.slug} /> }
  useReveal(path);
  useEffect(() => {
    const title = route ? route.title : 'Page not found | Karewa Honey', desc = route ? route.desc : 'This page does not exist.';
    document.title = title;
    setMeta('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), desc);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), SITE_URL + (path === '/' ? '/' : path));
    setMeta('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }), route ? 'index,follow' : 'noindex');
  }, [path, route, lang]);
  return (<>
    <div className="bgfx" aria-hidden="true"><i /><i /><i /><svg width="100%" height="100%"><defs><pattern id="hx" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.6)"><path d="M28 2l26 15v30L28 62 2 47V17zM28 62v33M2 47L-24 62M54 47l26 15" fill="none" stroke="currentColor" strokeWidth="2" /></pattern></defs><rect width="100%" height="100%" fill="url(#hx)" /></svg></div>
    <Header />
    <main id="main" key={path}>
      {Page ? <>{path !== '/' && <PageHead route={route} />}<Page /></> : <section className="sec"><div className="wrap nf"><h1>404</h1><p>This page does not exist.</p><a className="btn gold" href="/">Back to home</a></div></section>}
    </main>
    <Footer /><CallFab /><ChatWidget />
  </>);
}
