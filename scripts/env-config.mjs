// Runs before `vite` (dev + build). Copies the Supabase URL / anon key from env vars (.env or Netlify)
// into public/config.js, because admin.html and the site read window.KAREWA_CMS from that file.
// If the variables are missing, config.js is left untouched.
import { readFileSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';
const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'VITE_'), ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('VITE_'))) };
const clean = s => String(s || '').trim().replace(/^["']|["']$/g, '');
const url = clean(env.VITE_SUPABASE_URL), key = clean(env.VITE_SUPABASE_ANON_KEY);
if (!url || !key) { console.log('env-config: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set - config.js unchanged (Supabase admin/live content stay off).'); process.exit(0) }
if (!/^https:\/\/[^\s'"]+$/.test(url) || /['"\\\s]/.test(key)) { console.error('env-config: Supabase URL/key look invalid (URL must start with https://, key must have no spaces or quotes).'); process.exit(1) }
const f = 'public/config.js';
let s = readFileSync(f, 'utf8');
s = s.replace(/(url:\s*)'[^']*'/, `$1'${url}'`).replace(/(key:\s*)'[^']*'/, `$1'${key}'`);
writeFileSync(f, s); console.log('env-config: Supabase URL + key written to public/config.js');
