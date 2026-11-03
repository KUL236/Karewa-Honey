// Plain-language description of how honey is handled, written for this website. Check each line against your real practice before publishing.
export const STEPS = [
  { n: ['Sourcing and origin', 'स्रोत और उत्पत्ति'], d: ['We note the flower source and the place of every lot, for example mustard or babool, so the honey can be traced.', 'हम हर लॉट का फूलों का स्रोत और जगह दर्ज करते हैं, जैसे सरसों या बबूल, ताकि शहद की उत्पत्ति पता रहे।'] },
  { n: ['Checks on arrival', 'आने पर जाँच'], d: ['Each lot is checked for moisture (honey should be below 20%), a purity test report is kept, and the honey is looked at for wax, dirt or other foreign matter.', 'हर लॉट की नमी जाँची जाती है (शहद में नमी 20% से कम होनी चाहिए), शुद्धता की टेस्ट रिपोर्ट रखी जाती है, और मोम, मिट्टी या बाहरी चीज़ों के लिए देखा जाता है।'] },
  { n: ['Light filtering', 'हल्की छनाई'], d: ['Fine filtering removes wax, air bubbles and small debris so the honey is clear, while it stays natural.', 'बारीक छनाई से मोम, हवा के बुलबुले और छोटा कचरा निकल जाता है, ताकि शहद साफ़ रहे और प्राकृतिक भी रहे।'] },
  { n: ['Gentle handling', 'नरमी से सँभाल'], d: ['Honey is not boiled. If it ever needs warming to flow, the heat stays within safe limits and the time and temperature are written down.', 'शहद को उबाला नहीं जाता। यदि बहने के लिए कभी हल्की गर्मी देनी पड़े, तो वह सुरक्षित सीमा में रहती है और समय व तापमान लिखा जाता है।'] },
  { n: ['Filling and sealing', 'भराई और सीलिंग'], d: ['Clean, sanitised equipment and glass jars are used. Fill weight is checked, and caps and seals are checked so the jar is safe to open.', 'साफ़ और सैनिटाइज़ किए उपकरण और काँच के जार इस्तेमाल होते हैं। भराई का वज़न जाँचा जाता है, और ढक्कन व सील भी जाँचे जाते हैं।'] },
  { n: ['Batch code and label', 'बैच कोड और लेबल'], d: ['Every jar carries a batch code, packing date and best-before date, and the label follows the food rules.', 'हर जार पर बैच कोड, पैकिंग की तारीख और बेस्ट-बिफ़ोर तारीख होती है, और लेबल खाद्य नियमों के अनुसार होता है।'] },
  { n: ['Storage and dispatch', 'भंडारण और डिस्पैच'], d: ['Jars are kept in a cool, dry place away from direct sun, and older stock goes out first.', 'जार ठंडी, सूखी जगह पर सीधी धूप से दूर रखे जाते हैं, और पुराना स्टॉक पहले भेजा जाता है।'] }
];
export const BATCH_CHECKS = [
  ['Moisture is within the limit', 'नमी तय सीमा के अंदर है'],
  ['Colour, taste and aroma match the reference sample', 'रंग, स्वाद और सुगंध रेफ़रेंस सैंपल से मेल खाते हैं'],
  ['A sample of the batch is kept', 'हर बैच का एक सैंपल रखा जाता है']
];
export const HONEY_TYPES = [
  { n: ['Raw honey', 'कच्चा शहद'], d: ['Honey straight from extraction with only light filtering. It keeps its natural character.', 'निकालने के बाद सीधा शहद, जिसमें सिर्फ़ हल्की छनाई होती है। उसका प्राकृतिक स्वभाव बना रहता है।'] },
  { n: ['Filtered honey', 'छना हुआ शहद'], d: ['Honey passed through fine filtration to take out wax, bubbles and debris. It looks clear and even.', 'बारीक छनाई से मोम, बुलबुले और कचरा निकाला हुआ शहद। यह साफ़ और एक जैसा दिखता है।'] },
  { n: ['Multiflora honey', 'मल्टीफ्लोरा शहद'], d: ['Made from many kinds of flowers in a region or season. The taste is balanced, and it is the everyday honey for most homes.', 'किसी इलाके या मौसम के कई तरह के फूलों से बना शहद। स्वाद संतुलित होता है, और ज़्यादातर घरों में रोज़ का शहद यही है।'] },
  { n: ['Monofloral honey', 'मोनोफ्लोरल शहद'], d: ['Made mostly from one kind of flower. It has a clear taste and colour of its own, and its source is easy to trace.', 'ज़्यादातर एक ही तरह के फूल से बना शहद। इसका अपना साफ़ स्वाद और रंग होता है, और स्रोत पता करना आसान होता है।'] },
  { n: ['Mustard honey', 'सरसों का शहद'], d: ['From mustard flowers. It crystallises quickly and turns creamy, which is natural.', 'सरसों के फूलों से। यह जल्दी जमकर मलाईदार हो जाता है, जो प्राकृतिक है।'] },
  { n: ['Babool (juliflora) honey', 'बबूल (जूलीफ्लोरा) शहद'], d: ['From babool flowers of dry regions. It has its own taste and aroma and a darker colour.', 'शुष्क इलाकों के बबूल के फूलों से। इसका अपना स्वाद व सुगंध और गहरा रंग होता है।'] },
  { n: ['Acacia honey', 'अकेशिया शहद'], d: ['Light in colour and mild in taste, and it stays liquid for longer.', 'हल्के रंग और नरम स्वाद का, और देर तक तरल रहता है।'] },
  { n: ['Litchi honey', 'लीची शहद'], d: ['A fragrant, floral honey with a clear aroma.', 'फूलों जैसी महक वाला सुगंधित शहद।'] }
];
export const FARM_PHOTOS = [
  ['/assets/img/farm-sunset-frame.jpg', 'A frame of bees held up against the sunset over a sunflower field'],
  ['/assets/img/farm-apiary-frame.jpg', 'A beekeeper lifting a frame full of bees among hive boxes'],
  ['/assets/img/farm-bee-comb.jpg', 'A bee on a honeycomb'],
  ['/assets/img/farm-white-comb.jpg', 'Fresh white comb on a hive box'],
  ['/assets/img/farm-hanging-comb.jpg', 'A honeycomb hanging in the open'],
  ['/assets/img/farm-bee-cluster.jpg', 'A cluster of bees on a comb'],
  ['/assets/img/farm-sunflower.jpg', 'A sunflower with mountains behind']
];
