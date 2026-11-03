import { useLang } from '../lib/i18n';
import { MARKETS, okUrl } from '../lib/cms';
import { askChat } from './chatBus';
// All three marketplace buttons are always visible. A real https link opens the listing; with no link yet it opens the chat with order help.
export default function MarketButtons({ item, ask, className = '' }) {
  const { t } = useLang();
  return (
    <div className={'mk ' + className}>
      {MARKETS.map(m => okUrl(item && item[m[0]])
        ? <a key={m[0]} className={'btn ' + m[1]} href={item[m[0]]} target="_blank" rel="noopener noreferrer" aria-label={t(m[3], m[4]) + (item.t ? ' – ' + item.t : '')}>{t(m[3], m[4])}</a>
        : <button key={m[0]} type="button" className={'btn ' + m[1]} onClick={() => askChat(ask || 'How can I order Karewa Honey from ' + m[2] + '?')}>{t(m[3], m[4])}</button>)}
      {((item && item.x) || []).map((e, k) => okUrl(e.u) && <a key={e.n + k} className="btn line" href={e.u} target="_blank" rel="noopener noreferrer" aria-label={t('Buy on ' + e.n, e.n + ' पर खरीदें') + (item.t ? ' – ' + item.t : '')}>{t('Buy on ' + e.n, e.n + ' पर खरीदें')}</a>)}
    </div>
  );
}
