-- Create a simple health check function
create or replace function public.health_check()
returns boolean
language plpgsql
security definer
as $$
begin
  return true;
end;
$$;

-- Grant access to the health check function
grant execute on function public.health_check to anon;
grant execute on function public.health_check to authenticated; 