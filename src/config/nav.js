// Main menu (from the sitemap). Edit here. [English, Hindi, path]
import { EXTRAS } from '../data/extras';
export const NAV = [
  { label: ['About', 'हमारे बारे में'], sub: [['Who we are', 'हम कौन हैं', '/about'], ['Our founder', 'हमारे संस्थापक', '/founder'], ['Our timeline', 'हमारा सफ़र', '/timeline'], ['Our mission', 'हमारा मिशन', '/mission'], ['Our farms', 'हमारे फ़ार्म', '/farms'], ['Beekeeping migration routes', 'मधुमक्खी पालन के प्रवास मार्ग', '/migration-routes']] },
  { label: ['Products', 'उत्पाद'], all: ['All products', 'सभी उत्पाद', '/products'], sub: [['Natural honey', 'प्राकृतिक शहद', '/products/natural-honey']].concat(EXTRAS.map(p => [p.en, p.hi, '/products/' + p.slug])) },
  { label: ['For Clients', 'ग्राहकों के लिए'], sub: [['Request a quote', 'कोटेशन माँगें', '/request-quote'], ['Suggestion', 'सुझाव', '/suggestion']] },
  { label: ['Bee Pedia', 'बी पीडिया'], sub: [['You must know', 'ज़रूर जानें', '/bee-pedia/you-must-know'], ['Blog', 'ब्लॉग', '/bee-pedia/blog']] },
  { label: ['Contact', 'संपर्क'], path: '/contact' }
];
