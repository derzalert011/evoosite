/**
 * Script to manually sync Stripe products and prices to Supabase
 * Run this with: npm run sync:stripe
 * 
 * Make sure your .env.local file has:
 * - STRIPE_SECRET_KEY
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables!');
  console.error('Required: STRIPE_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function syncStripeToSupabase() {
  console.log('🔄 Syncing Stripe products and prices to Supabase...\n');

  try {
    // Fetch all active products from Stripe
    const products = await stripe.products.list({ active: true, limit: 100 });
    
    console.log(`Found ${products.data.length} product(s) in Stripe\n`);

    for (const product of products.data) {
      console.log(`📦 Processing product: ${product.name} (${product.id})`);

      // Upsert product
      const { error: productError } = await supabase
        .from('products')
        .upsert({
          id: product.id,
          active: product.active,
          name: product.name,
          description: product.description ?? null,
          image: product.images?.[0] ?? null,
          metadata: product.metadata,
        });

      if (productError) {
        console.error(`❌ Error upserting product ${product.id}:`, productError);
        continue;
      }

      console.log(`✅ Product synced: ${product.name}`);

      // Fetch prices for this product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 100,
      });

      console.log(`   Found ${prices.data.length} price(s) for this product`);

      for (const price of prices.data) {
        const { error: priceError } = await supabase.from('prices').upsert({
          id: price.id,
          product_id: typeof price.product === 'string' ? price.product : price.product.id,
          active: price.active,
          description: price.nickname ?? null,
          unit_amount: price.unit_amount,
          currency: price.currency,
          type: (price.type === 'recurring' ? 'recurring' : 'one_time') as 'one_time' | 'recurring',
          interval: (price.recurring?.interval as 'day' | 'week' | 'month' | 'year' | null) ?? null,
          interval_count: price.recurring?.interval_count ?? null,
          trial_period_days: price.recurring?.trial_period_days ?? null,
          metadata: price.metadata,
        });

        if (priceError) {
          console.error(`❌ Error upserting price ${price.id}:`, priceError);
        } else {
          console.log(`   ✅ Price synced: ${price.id} (${(price.unit_amount || 0) / 100} ${price.currency.toUpperCase()})`);
        }
      }

      console.log('');
    }

    console.log('✨ Sync complete!');
  } catch (error) {
    console.error('❌ Error syncing:', error);
    process.exit(1);
  }
}

syncStripeToSupabase();
