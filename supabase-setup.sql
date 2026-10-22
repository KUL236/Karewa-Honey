-- ============================================================
--  KAREWA HONEY - Supabase setup (run ONCE)
--  Supabase dashboard -> SQL Editor -> New query -> paste all -> Run
--  Safe to run again: it will not duplicate anything.
-- ============================================================

-- 1) Tables ---------------------------------------------------
create table if not exists public.site_content (
  key         text primary key,                 -- products, shop, hero, contact, images, lists, texts
  value       jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id)
);

create table if not exists public.admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.admins       enable row level security;

-- 2) Helper: is the logged-in user an admin? -------------------
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$ select exists (select 1 from public.admins a join auth.users u on u.id = a.user_id where a.user_id = auth.uid() and lower(u.email) = 'karewabee@gmail.com'); $$;

-- 3) Row Level Security ---------------------------------------
-- Everybody (website visitors) can READ content. Only admins can WRITE.
drop policy if exists "public read content"  on public.site_content;
drop policy if exists "admin insert content" on public.site_content;
drop policy if exists "admin update content" on public.site_content;
drop policy if exists "admin delete content" on public.site_content;
drop policy if exists "read own admin row"   on public.admins;

create policy "public read content"  on public.site_content for select using (true);
create policy "admin insert content" on public.site_content for insert to authenticated with check (public.is_admin());
create policy "admin update content" on public.site_content for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete content" on public.site_content for delete to authenticated using (public.is_admin());
create policy "read own admin row"   on public.admins       for select to authenticated using (user_id = auth.uid());

-- 4) Auto-stamp who/when changed a row ------------------------
create or replace function public.touch_site_content()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;

drop trigger if exists trg_touch_site_content on public.site_content;
create trigger trg_touch_site_content
  before insert or update on public.site_content
  for each row execute function public.touch_site_content();

-- 5) Storage bucket for photos / videos -----------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('site-media', 'site-media', true, 52428800)       -- 50 MB per file
on conflict (id) do update set public = true, file_size_limit = 52428800;

drop policy if exists "public read media"  on storage.objects;
drop policy if exists "admin upload media" on storage.objects;
drop policy if exists "admin update media" on storage.objects;
drop policy if exists "admin delete media" on storage.objects;

create policy "public read media"  on storage.objects for select using (bucket_id = 'site-media');
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin());
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());

-- 6) MAKE YOURSELF ADMIN --------------------------------------
-- First create your login: Authentication -> Users -> Add user -> Create new user
-- (enter email + password, tick "Auto Confirm User"). Then put THAT email below and run:
insert into public.admins (user_id)
select id from auth.users where lower(email) = 'karewabee@gmail.com'
on conflict do nothing;

-- Check: this should return 1 row with your email
-- select u.email from public.admins a join auth.users u on u.id = a.user_id;


-- ============================================================
--  ENQUIRIES (chatbot fallback form)  - added in v15. Safe to re-run.
--  Rows are written ONLY by the Netlify function (service-role key, server side).
--  Visitors/anon have NO access. Only logged-in admins can read / change status.
-- ============================================================
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  email         text,
  enquiry_type  text not null check (enquiry_type in ('Product Enquiry','Bulk Order','Wholesale / Distribution','Retail Order','Other')),
  message       text not null,
  source        text not null default 'chatbot',
  status        text not null default 'pending' check (status in ('pending','contacted','resolved')),
  ip_hash       text,
  user_agent    text,
  updated_at    timestamptz,
  updated_by    uuid references auth.users(id)
);
create index if not exists enquiries_created_idx on public.enquiries (created_at desc);
create index if not exists enquiries_phone_idx   on public.enquiries (phone, created_at desc);
create index if not exists enquiries_ip_idx      on public.enquiries (ip_hash, created_at desc);

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon;
revoke all on public.enquiries from authenticated;
grant select on public.enquiries to authenticated;
grant update (status, updated_at, updated_by) on public.enquiries to authenticated;
grant delete on public.enquiries to authenticated;

drop policy if exists "admin read enquiries"   on public.enquiries;
drop policy if exists "admin update enquiries" on public.enquiries;
drop policy if exists "admin delete enquiries" on public.enquiries;
create policy "admin read enquiries"   on public.enquiries for select to authenticated using (public.is_admin());
create policy "admin update enquiries" on public.enquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete enquiries" on public.enquiries for delete to authenticated using (public.is_admin());

create or replace function public.touch_enquiry() returns trigger language plpgsql as $$
begin new.updated_at := now(); new.updated_by := auth.uid(); return new; end $$;
drop trigger if exists trg_touch_enquiry on public.enquiries;
create trigger trg_touch_enquiry before update on public.enquiries for each row execute function public.touch_enquiry();
-- (Certifications are stored in site_content under key 'certs' and edited in admin.html -> Certifications.)
