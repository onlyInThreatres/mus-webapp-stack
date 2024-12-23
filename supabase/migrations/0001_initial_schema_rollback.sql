-- 🔄 Rollback Initial Schema Migration

-- Drop triggers first
DROP TRIGGER IF EXISTS tr_profiles_update_timestamp ON public.profiles;
DROP TRIGGER IF EXISTS tr_subscriptions_update_timestamp ON public.subscriptions;

-- Drop function
DROP FUNCTION IF EXISTS public.fn_update_timestamp();

-- Drop tables (in correct order due to dependencies)
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.subscriptions;
DROP TABLE IF EXISTS public.profiles;

-- Drop extensions if no longer needed
-- Note: Be careful with these as other parts of the system might need them
-- DROP EXTENSION IF EXISTS "uuid-ossp";
-- DROP EXTENSION IF EXISTS "citext"; 