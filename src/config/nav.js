// Main menu (from the sitemap). Edit here. [English, Hindi, path]
import { EXTRAS } from '../data/extras';
export const NAV = [
  { label: ['About', 'हमारे बारे में'], path: '/about', sub: [['Who we are', 'हम कौन हैं', '/about'], ['Our founder', 'हमारे संस्थापक', '/founder'], ['Our timeline', 'हमारा सफ़र', '/timeline'], ['Our mission', 'हमारा मिशन', '/mission'], ['Our farms', 'हमारे फ़ार्म', '/farms'], ['Beekeeping migration routes', 'मधुमक्खी पालन के प्रवास मार्ग', '/migration-routes']] },
  { label: ['Products', 'उत्पाद'], path: '/products', all: ['All products', 'सभी उत्पाद', '/products'], sub: [['Natural honey', 'प्राकृतिक शहद', '/products/natural-honey']].concat(EXTRAS.map(p => [p.en, p.hi, '/products/' + p.slug])) },
  { label: ['Our Process', 'हमारी प्रक्रिया'], path: '/our-process', sub: [['How we process honey', 'हम शहद कैसे प्रोसेस करते हैं', '/our-process'], ['Honey types explained', 'शहद के प्रकार', '/honey-types']] },
  { label: ['Bee Pedia', 'बी पीडिया'], path: '/bee-pedia/you-must-know', sub: [['You must know', 'ज़रूर जानें', '/bee-pedia/you-must-know', [['Honey purity testing parameters', 'शहद की शुद्धता जाँच के मानक', '/quality#quality'], ['How do we assure quality of honey?', 'हम शहद की गुणवत्ता कैसे पक्की करते हैं?', '/quality'], ['Common myths about honey', 'शहद के बारे में आम भ्रम', '/bee-pedia/you-must-know']]], ['Blog', 'ब्लॉग', '/bee-pedia/blog']] },
  { label: ['For Clients', 'ग्राहकों के लिए'], path: '/request-quote', sub: [['Request a quote', 'कोटेशन माँगें', '/request-quote'], ['Suggestion', 'सुझाव', '/suggestion'], ['Feedback', 'फ़ीडबैक', '/feedback']] },
  { label: ['Contact', 'संपर्क'], path: '/contact' }
];
