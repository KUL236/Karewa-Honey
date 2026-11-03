-- Karewa Honey: customer feedback. Run once in Supabase -> SQL Editor (safe to run again).
-- Visitors can SEND feedback (it stays hidden). You approve it in admin -> Customer feedback, then it shows on the site.
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 60),
  city text check (city is null or char_length(city) <= 60),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 5 and 600),
  approved boolean not null default false
);
create index if not exists feedback_created_idx on public.feedback (created_at desc);
alter table public.feedback enable row level security;

drop policy if exists "feedback: anyone can send" on public.feedback;
create policy "feedback: anyone can send" on public.feedback for insert to anon, authenticated with check (approved = false);

drop policy if exists "feedback: public reads approved" on public.feedback;
create policy "feedback: public reads approved" on public.feedback for select to anon, authenticated using (approved = true or public.is_admin());

drop policy if exists "feedback: admin updates" on public.feedback;
create policy "feedback: admin updates" on public.feedback for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "feedback: admin deletes" on public.feedback;
create policy "feedback: admin deletes" on public.feedback for delete to authenticated using (public.is_admin());

grant insert, select on public.feedback to anon;
grant select, insert, update, delete on public.feedback to authenticated;
