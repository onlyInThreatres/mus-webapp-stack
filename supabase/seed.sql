-- 🌱 Seed data for development
INSERT INTO auth.users (id, email) VALUES
  ('d0fc7220-d7d8-4a5d-9c4b-9f2bc0e23a2c', 'test@example.com');

INSERT INTO public.profiles (id, full_name, avatar_url) VALUES
  ('d0fc7220-d7d8-4a5d-9c4b-9f2bc0e23a2c', 'Test User', 'https://example.com/avatar.png');

INSERT INTO public.api_keys (user_id, name, key_hash) VALUES
  ('d0fc7220-d7d8-4a5d-9c4b-9f2bc0e23a2c', 'Test API Key', 'hash_value_here');

-- Add more seed data as needed... @TODO