-- Create a function to safely create the profiles table if it doesn't exist
create or replace function create_profiles_if_not_exists()
returns void
language plpgsql
security definer
as $$
begin
  if not exists (select from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    create table public.profiles (
      id uuid primary key default uuid_generate_v4(),
      username text unique,
      email text unique,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Add RLS policies
    alter table public.profiles enable row level security;

    -- Allow read access to everyone
    create policy "Profiles are viewable by everyone"
      on profiles for select
      using (true);

    -- Allow insert/update for authenticated users only
    create policy "Users can insert their own profile"
      on profiles for insert
      with check (auth.role() = 'authenticated');

    create policy "Users can update own profile"
      on profiles for update
      using (auth.uid() = id);
  end if;
end;
$$; 