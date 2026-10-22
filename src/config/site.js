// Karewa Honey: business facts + marketplace links. Edit here (or in /admin.html, which overrides this live).
// RULE: never invent links, numbers or claims. Empty string = hidden on the website.
export const SITE = {
  brand: 'Karewa Honey',
  business: 'Narendra Enterprises',
  person: 'Narendra Meena',      // contact person for orders
  founder: 'Laturlal Meena',  // shown on the Founder page
  phone: '+91 96803 79821',
  email: 'karewabee@gmail.com',
  address: 'Kota, Rajasthan, India',
  gstin: '08BNUPK1271P1Z7',
  instagram: 'https://www.instagram.com/karewa_honey',
  youtube: 'https://www.youtube.com/@KAREWAHONEY-PuretesteofIndia',
  facebook: 'https://www.facebook.com/share/1PboymgTYD/',
  x: '', linkedin: '', telegram: '',   // add more social links here (shown only when filled)
  reel: ''
};

// Offers shown in the running strip ONLY if you fill them. Example: { en: 'FLAT 10% OFF ON AMAZON', hi: 'अमेज़न पर 10% की छूट' }
// Leave empty until the discount is real and live on the marketplace.
export const OFFERS = [];

export const SHOP = [
  { t: 'Karewa Pure Honey', th: 'कारेवा प्योर हनी', d: 'Pure honey in a classic glass jar. Turn the jar to read the label, front and back.', dh: 'क्लासिक कांच के जार में शुद्ध शहद। जार घुमाकर आगे-पीछे का लेबल पढ़ें।', pr: '₹349', sz: '500 g', szh: '500 ग्राम', img: '/assets/360/f00.webp', spin: true, u: 'https://amzn.in/d/09HjtJW1', f: 'https://www.flipkart.com/food-products/honey/karewa~brand/pr?sid=eat,lnz', z: '' },
  { t: 'Honey Bee Wax', th: 'हनी बी वैक्स (मोम)', d: '100% pure beeswax. Filtered and organic, chemical-free, as stated on the pack.', dh: '100% शुद्ध मधुमक्खी का मोम। पैक पर बताए अनुसार फ़िल्टर्ड, ऑर्गेनिक और केमिकल-फ्री।', pr: '₹649', sz: '1 kg', szh: '1 किलो', img: '/assets/img/beeswax.jpg', u: 'https://amzn.in/d/02iofLzq', f: 'https://www.flipkart.com/food-products/honey/karewa~brand/pr?sid=eat,lnz', z: '' }
];

// Certifications: shown ONLY when verified:true AND exact name AND (number or document). Fill from real documents.
export const CERTS = [
  { id: 'fssai', t: 'FSSAI', logo: '/assets/certs/fssai.png', name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'msme', t: 'MSME / Udyam', logo: '/assets/certs/msme.png', name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'iso', t: 'ISO', logo: '/assets/certs/iso.png', name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'hbb', t: 'National Bee Board', logo: '/assets/certs/nbb.png', name: '', number: '', authority: '', validity: '', doc: '', verified: false }
];

// Feedback photos (Videos page) and the silent background film behind "Our Honey". Admin -> Feedback & video overrides these.
export const MEDIA = {
  feedback: [{ img: '/assets/img/handover.jpg', cap: ['Customer feedback: a jar of Karewa Honey handed over in person', 'ग्राहकों की राय: कारेवा हनी का जार हाथों-हाथ'] }],
  bgvideo: '', bgoff: false
};
