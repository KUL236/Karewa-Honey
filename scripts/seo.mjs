// Runs after `vite build`: writes sitemap.xml and one real HTML file per page (dist/honey/index.html ...)
// with its own <title>, description and canonical, so Google can index every page separately.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { ROUTES, SITE_URL } from '../src/config/routes.js';
const base = readFileSync('dist/index.html', 'utf8'), today = new Date().toISOString().slice(0, 10);
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const r of ROUTES) {
  const url = SITE_URL + (r.path === '/' ? '/' : r.path);
  let h = base.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(r.desc)}">`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(r.title)}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`);
  if (r.path !== '/') { mkdirSync('dist' + r.path, { recursive: true }); writeFileSync('dist' + r.path + '/index.html', h) } else writeFileSync('dist/index.html', h);
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` + ROUTES.map(r => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n') + '\n</urlset>\n';
writeFileSync('dist/sitemap.xml', xml); console.log('SEO: wrote', ROUTES.length, 'pages + sitemap.xml');
