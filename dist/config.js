/* Karewa Honey - site configuration. Everything here is PUBLIC (shipped to the browser).
   NEVER put service_role / AI / secret keys here. Those go in Netlify environment variables. */

/* 1) Supabase (admin panel + live content). Project Settings -> API -> Project URL + anon/publishable key */
window.KAREWA_CMS = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  key: 'YOUR_ANON_PUBLIC_KEY'
};

/* 2) Marketplace listing URLs. Use ONLY real product-page links (https://...).
      Empty ''  ->  that marketplace button is hidden automatically (no fake / dead buttons).
      Amazon links already come from the shop list; add Flipkart / Zepto links here (or in admin.html -> Amazon shop).
      Order matches the shop list: [0] Karewa Pure Honey 500 g, [1] Honey Bee Wax 1 kg. */
window.KAREWA_MARKET = [
  { flipkart: '', zepto: '' },   // Karewa Pure Honey 500 g
  { flipkart: '', zepto: '' }    // Honey Bee Wax 1 kg
];

/* 3) Certifications & Registrations. A card is shown on the website ONLY when verified:true AND a number or document is given.
      Fill from the REAL certificate / registration documents. Leave verified:false until you have checked the document.
      (You can also manage these in admin.html -> Certifications; admin values override this file.)
      doc: path or https link to the uploaded certificate (PDF / image), e.g. 'assets/docs/fssai.pdf' */
window.KAREWA_CERTS = [
  { id: 'fssai',  name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'msme',   name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'iso',    name: '', number: '', authority: '', validity: '', doc: '', verified: false },
  { id: 'hbb',    name: '', number: '', authority: '', validity: '', doc: '', verified: false }
];
