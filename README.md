# Karewa Honey (React + Vite, Netlify)  v17

Website: https://karewahoney.com   |   Admin + enquiry email: Karewabee@gmail.com

## Pages (each opens on its own URL)
`/` Home, `/honey`, `/shop`, `/about`, `/quality` (How do we assure quality?), `/certificates`, `/founder` (Founder, Mission, Vision), `/gallery`, `/videos`, `/wholesale`, `/faq`, `/contact`.
Titles, descriptions and the menu come from one file: `src/config/routes.js`.

## Deploy (GitHub -> Netlify)
1. Push this folder to GitHub, import it in Netlify (settings are read from `netlify.toml`).
2. Build runs `vite build` and then `scripts/seo.mjs`, which writes `sitemap.xml` and a real HTML file for every page.
3. Enquiry email: follow `EMAILJS-SETUP.md`.
4. Admin panel (optional, for editing products, prices, contact, certificates): run `supabase-setup.sql`, put `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env` / Netlify env vars (copied into `public/config.js` automatically at build), then open `/admin.html`. Only the account Karewabee@gmail.com can enter (checked in the page and in the database).

## Google
Search Console -> add `https://karewahoney.com` -> Sitemaps -> submit `sitemap.xml`. `robots.txt` already points to it.

## Where to edit
- `src/config/site.js` business info, shop items, marketplace links, certificates (admin overrides live).
- `src/config/emailjs.js` EmailJS ids. `src/lib/emailjs.js` sends every enquiry.
- `src/lib/ar.js` Arabic dictionary (English text -> Arabic). Missing lines show in English.
- `src/components/*` one file per section, `src/styles/*` design (`extra.css` = dark mode, RTL, bees).

## Rules built in
- No fake links or claims: certificates appear only when verified with a name and a number or document.
- An enquiry is shown as sent only after EmailJS confirms it.
- Marketplace buttons are always visible; with no link yet they show "Coming soon".

## Admin panel: test on localhost (v23)
1. Supabase (free) -> New project. SQL Editor -> paste `supabase-setup.sql` -> Run.
2. Authentication -> Users -> Add user: email `karewabee@gmail.com` + a password, tick "Auto Confirm User". Run the SQL once more (step 6 makes it admin).
3. Authentication -> URL Configuration: add `http://localhost:5173` to Redirect URLs (needed only for "Forgot password").
4. Project Settings -> API: copy Project URL + anon key into `public/config.js`.
5. `npm install` then `npm run dev`. Admin: http://localhost:5173/admin.html  Website: http://localhost:5173
6. Edit something in admin -> "Save & publish" -> reload the website tab.
Tabs: Home banner (slides), Honey products, Marketplace shop, Feedback & video (feedback photos + background video), Contact & links, Certifications, Account.
Only the account karewabee@gmail.com can enter. Never put a service_role key in config.js.

## v26 additions
- Fonts: Poppins (headings) + Lato (body). Icons: `lucide-react` (run `npm install` once, commit the updated package-lock.json).
- Admin (/admin.html) new tabs, all ADD-only (originals stay): Gallery photos, FAQ, Offers strip, More videos. Contact tab also has X, LinkedIn, Telegram links.
- No new SQL needed: they use the same `site_content` table (keys: gallery, faq, offers, videos).
- Marketplace shop tab: "+ Add new platform" (name + https link) per product; button shows on Shop page and footer only when the link is valid.

## v28
- Only Amazon + Flipkart order buttons (Flipkart brand page link is the default). Zepto removed.
- New logo (assets/img/logo.png), transparent floating header (no strip), blurred honeycomb background, Aravali-style footer.
- New menu from the sitemap: About, Products (11 items), For Clients (Request a quote, Suggestion), Bee Pedia, Contact + Free Samples button/page.
- New pages: timeline, mission, farms, migration routes, products hub + product pages, free samples form, quote, suggestion, myths, blog, privacy, terms, disclaimer.
- Languages: English, Hindi, Arabic (hand-written) + German, French, Italian, Dutch, Swedish, Norwegian, Danish, Icelandic, Japanese, Korean, Chinese via Google Translate.
- Admin new tabs: More products (add/edit/hide), Timeline, Farms, Migration routes, Blog posts, Languages, Enquiries.
