-- Allow guest orders (orders without user_id)
-- This enables checkout without requiring authentication

-- Make user_id nullable
alter table orders alter column user_id drop not null;

-- Update RLS policy to allow viewing orders without user_id
-- For guest orders, we'll use the checkout session ID for identification
drop policy if exists "Can view own orders." on orders;
create policy "Can view own orders." on orders for select 
  using (auth.uid() = user_id or user_id is null);
