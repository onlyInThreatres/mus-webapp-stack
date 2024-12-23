-- 🎯 Initial Schema Migration
-- Description: Sets up core tables for the SaaS application
-- Timestamp: 2024-03-XX-XXXXXX

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 📝 Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email CITEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    -- 🔒 Account status and verification
    is_verified BOOLEAN DEFAULT FALSE,
    -- ⚡ Performance optimization for queries
    search_terms TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(full_name, '') || ' ' || coalesce(email, ''))
    ) STORED,
    -- 📊 Audit fields
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 💳 Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    -- 🔒 Stripe specific fields
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    -- 📊 Subscription status
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
    price_id TEXT,
    quantity INTEGER,
    -- 📅 Important dates
    trial_ends_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    -- 📊 Audit fields
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 📝 Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    -- 📊 Event details
    event_type TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    description TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    -- 🔒 Security fields
    ip_address INET,
    user_agent TEXT,
    -- 📊 Timestamp (no updated_at as logs are immutable)
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 🔍 Create indexes for better query performance
CREATE INDEX IF NOT EXISTS profiles_search_terms_idx ON public.profiles USING GIN (search_terms);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON public.audit_logs (user_id);
CREATE INDEX IF NOT EXISTS audit_logs_event_type_idx ON public.audit_logs (event_type);

-- 📝 Add table comments
COMMENT ON TABLE public.profiles IS 'User profile information extending auth.users';
COMMENT ON TABLE public.subscriptions IS 'User subscription status and Stripe integration';
COMMENT ON TABLE public.audit_logs IS 'System-wide audit logging for security and compliance';

-- 🔄 Update triggers for timestamps
CREATE OR REPLACE FUNCTION public.fn_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to relevant tables
CREATE TRIGGER tr_profiles_update_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_update_timestamp();

CREATE TRIGGER tr_subscriptions_update_timestamp
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_update_timestamp();

-- 🔒 Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own audit logs"
    ON public.audit_logs FOR SELECT
    USING (auth.uid() = user_id); 