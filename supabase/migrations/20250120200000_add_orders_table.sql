/**
 * ORDERS
 * Note: Orders are created when checkout sessions are completed via Stripe webhooks.
 */
create table orders (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  stripe_checkout_session_id text not null unique,
  product_id text references products not null,
  quantity integer not null check (quantity > 0),
  -- Shipping address stored as JSON
  shipping_address jsonb not null,
  -- Array of shipping label URLs (one per bottle)
  shipping_label_urls text[] default array[]::text[],
  -- Shipping rate/cost from Shippo
  shipping_rate numeric(10, 2),
  -- Processing errors stored as JSON
  processing_errors jsonb,
  -- Order status
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'shipped', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table orders enable row level security;
create policy "Can view own orders." on orders for select using (auth.uid() = user_id);

-- Create index for faster lookups
create index orders_user_id_idx on orders(user_id);
create index orders_checkout_session_id_idx on orders(stripe_checkout_session_id);
create index orders_status_idx on orders(status);

-- Add shipping_address field to users table for reuse
alter table users add column shipping_address jsonb;

/**
 * Function to update updated_at timestamp
 */
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_orders_updated_at before update on orders
  for each row execute function update_updated_at_column();