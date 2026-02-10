-- =============================================
-- Supabase SQL-skjema for Oppstart med Skar Digital
-- Kjør dette i Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Kunder-tabell
create table clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  share_token text unique not null,
  created_at timestamptz not null default now()
);

-- Oppstartsskjema-tabell (en rad per kunde, lagrer hele skjema som JSONB)
create table onboarding_forms (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  form_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint unique_client_form unique (client_id)
);

-- Index for rask oppslag
create index idx_onboarding_forms_client_id on onboarding_forms(client_id);

-- Auto-oppdater updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_onboarding_forms_updated_at
  before update on onboarding_forms
  for each row
  execute function update_updated_at_column();

-- Row Level Security: åpen tilgang (ingen auth)
alter table clients enable row level security;
alter table onboarding_forms enable row level security;

create policy "Allow all on clients"
  on clients for all
  using (true)
  with check (true);

create policy "Allow all on onboarding_forms"
  on onboarding_forms for all
  using (true)
  with check (true);
