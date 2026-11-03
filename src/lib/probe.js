// Lets /admin.html read the website\'s built-in (original) content so it can show "original" values next to your edits.
import { SITE, SHOP, CERTS, MEDIA } from '../config/site';
import { PRODUCTS } from '../data/products';
import { EXTRAS } from '../data/extras';
import { STEPS, HONEY_TYPES } from '../data/process';
import { SLIDES } from '../components/Hero';
window.__cms = { ready: true, img: p => p || '', texts: () => [],
  defaults: () => ({ P: PRODUCTS, SHOP, HS: SLIDES, CT: SITE, CERTS, V: [], MQ: [], MEDIA, X: EXTRAS, PR: STEPS, HT: HONEY_TYPES }) };
