-- Cria Tu Handmade: the blog, in its own schema of the shared "tiago-apps" Supabase project.
--
-- To apply: Supabase dashboard → SQL Editor → paste and run. Then:
--   1. Settings → API → Data API → Exposed schemas: add `criatu`.
--   2. Authentication → Users: create (or pick) the user who writes the blog, and run
--        insert into criatu.admins (user_id) select id from auth.users where email = '<that email>';
-- Everyone can read posts. Only users listed in criatu.admins can write them
-- (auth users are shared by every app in this project, so being signed in is not enough).

create schema if not exists criatu;

create table if not exists criatu.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists criatu.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table criatu.posts enable row level security;
alter table criatu.admins enable row level security;   -- no policies: unreachable through the API

create or replace function criatu.is_admin() returns boolean
  language sql stable security definer set search_path = ''
  as $$ select exists (select 1 from criatu.admins a where a.user_id = auth.uid()) $$;

grant usage on schema criatu to anon, authenticated;
grant select on criatu.posts to anon, authenticated;
grant insert, update, delete on criatu.posts to authenticated;
grant execute on function criatu.is_admin() to anon, authenticated;

drop policy if exists "anyone can read posts" on criatu.posts;
create policy "anyone can read posts" on criatu.posts for select using (true);

drop policy if exists "admins write posts" on criatu.posts;
create policy "admins write posts" on criatu.posts for all to authenticated
  using (criatu.is_admin()) with check (criatu.is_admin());
