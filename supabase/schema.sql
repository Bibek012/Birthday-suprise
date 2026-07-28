-- Run this in the Supabase SQL editor (or via the CLI) before going live.

create table if not exists public.birthday_locations (
  id uuid primary key default gen_random_uuid(),
  latitude double precision not null,
  longitude double precision not null,
  address text,
  created_at timestamptz not null default now()
);

-- Row Level Security: lock the table down by default.
alter table public.birthday_locations enable row level security;

-- Allow inserts from the anon key (used by the API route / browser),
-- but never allow the anon key to select, update, or delete rows.
create policy "Allow anonymous insert only"
  on public.birthday_locations
  for insert
  to anon
  with check (true);

-- No select/update/delete policies are created for "anon", so the public
-- key can write but never read back location data. Use the service role
-- key (server-side only, e.g. in Supabase Studio) to review entries.

-- Optional: automatically purge location data after 90 days.
-- create extension if not exists pg_cron;
-- select cron.schedule(
--   'purge-old-birthday-locations',
--   '0 3 * * *',
--   $$ delete from public.birthday_locations where created_at < now() - interval '90 days'; $$
-- );
