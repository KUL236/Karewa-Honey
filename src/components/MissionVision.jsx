import { useLang } from '../lib/i18n';
export default function MissionVision() {
  const { t } = useLang();
  return (
    <section className="sec mv" id="mission"><div className="wrap mvg">
      <figure className="mvph rv"><img src="/assets/img/apiary.jpg" alt={t('A beekeeper at the Karewa Honey apiary holding a honeycomb frame', 'कारेवा हनी के मधुमक्खी फार्म पर छत्ते का फ्रेम पकड़े मधुमक्खी पालक')} loading="lazy" width="700" height="1054" /></figure>
      <div className="mvt">
        <article className="mvc rv"><h2>{t('Our Mission', 'हमारा मिशन')}</h2><p>{t('To bring pure, natural honey from the flowering fields of Rajasthan to every home, with careful handling and complete honesty about what is in the jar.', 'राजस्थान के फूलों वाले खेतों से शुद्ध, प्राकृतिक शहद हर घर तक पहुँचाना, ध्यान से संभाल और जार में क्या है इस बारे में पूरी ईमानदारी के साथ।')}</p></article>
        <article className="mvc rv"><h2>{t('Our Vision', 'हमारा विज़न')}</h2><p>{t('To be a honey brand that families and partners trust because they can see and verify what we say, while keeping bees, beekeepers and the land healthy for the next generation.', 'एक ऐसा शहद ब्रांड बनना जिस पर परिवार और साझेदार इसलिए भरोसा करें कि वे हमारी बात देख और जाँच सकते हैं, और मधुमक्खियाँ, मधुमक्खी पालक और ज़मीन अगली पीढ़ी के लिए स्वस्थ रहें।')}</p></article>
      </div>
    </div></section>
  );
}
