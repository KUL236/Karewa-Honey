-- Karewa Honey: save website enquiries in the database (admin -> Enquiries). Run once in Supabase -> SQL Editor.
-- (Run supabase-setup.sql first if you have not, because it creates the enquiries table.)
-- ===== ENQUIRIES FROM THE WEBSITE FORMS (v30). Run once. Safe to re-run. =====
-- Lets every website form (free sample, quote, suggestion, wholesale, chatbot, contact) leave a copy in admin -> Enquiries.
-- Visitors cannot read or write the table directly; they can only call this one checked function.
do $$ declare c record; begin
  for c in select conname from pg_constraint where conrelid = 'public.enquiries'::regclass and contype = 'c' and pg_get_constraintdef(oid) ilike '%enquiry_type%' loop
    execute format('alter table public.enquiries drop constraint %I', c.conname);
  end loop;
end $$;
alter table public.enquiries add constraint enquiries_enquiry_type_check check (enquiry_type in ('Product Enquiry','Bulk Order','Wholesale / Distribution','Retail Order','Other','Free Sample Request','Quote Request','Suggestion'));

create or replace function public.submit_enquiry(p_name text, p_phone text, p_email text, p_type text, p_message text, p_source text default 'website')
returns void language plpgsql security definer set search_path = public as $$
begin
  if char_length(coalesce(trim(p_name), '')) not between 2 and 80 then raise exception 'invalid name'; end if;
  if char_length(coalesce(trim(p_phone), '')) not between 5 and 30 then raise exception 'invalid phone'; end if;
  if char_length(coalesce(trim(p_message), '')) not between 2 and 1800 then raise exception 'invalid message'; end if;
  if p_type not in ('Product Enquiry','Bulk Order','Wholesale / Distribution','Retail Order','Other','Free Sample Request','Quote Request','Suggestion') then p_type := 'Other'; end if;
  if (select count(*) from public.enquiries where phone = trim(p_phone) and created_at > now() - interval '1 hour') >= 5 then raise exception 'rate_limited'; end if;
  insert into public.enquiries (name, phone, email, enquiry_type, message, source)
  values (trim(p_name), trim(p_phone), nullif(trim(coalesce(p_email, '')), ''), p_type, trim(p_message), case when p_source = 'chatbot' then 'chatbot' else 'website' end);
end $$;
revoke all on function public.submit_enquiry(text, text, text, text, text, text) from public;
grant execute on function public.submit_enquiry(text, text, text, text, text, text) to anon, authenticated;
