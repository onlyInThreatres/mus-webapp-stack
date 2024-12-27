-- Create a simple test table if it doesn't exist
create table if not exists public.test_health (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policy
alter table public.test_health enable row level security;

-- Allow read access to everyone
create policy "Test health is viewable by everyone"
    on public.test_health for select
    using (true);

-- Allow insert for authenticated users
create policy "Users can insert test health"
    on public.test_health for insert
    with check (auth.role() = 'authenticated'); 