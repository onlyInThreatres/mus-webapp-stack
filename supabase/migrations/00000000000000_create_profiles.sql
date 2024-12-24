-- Enable required extensions
create extension if not exists "moddatetime" schema extensions;

-- Ensure schema exists
create schema if not exists public;

-- Create profiles table if it doesn't exist
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    username text unique,
    full_name text,
    avatar_url text,
    website text,
    
    constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

-- Create policies
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using ( true );

create policy "Users can insert their own profile"
    on profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update own profile"
    on profiles for update
    using ( auth.uid() = id );

-- Create indexes if they don't exist
create index if not exists profiles_username_idx on public.profiles(username);

-- Set up automatic timestamps
drop trigger if exists handle_updated_at on profiles;
create trigger handle_updated_at 
    before update on profiles
    for each row 
    execute procedure moddatetime (updated_at); 