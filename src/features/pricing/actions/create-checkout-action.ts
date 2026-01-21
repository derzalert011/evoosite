'use server';

import { redirect } from 'next/navigation';

import { getOrCreateCustomer } from '@/features/account/controllers/get-or-create-customer';
import { getSession } from '@/features/account/controllers/get-session';
import { checkStock } from '@/features/products/controllers/check-stock';
import { Price } from '@/features/pricing/types';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { getURL } from '@/utils/get-url';

export async function createCheckoutAction({
  price,
  quantity = 1,
  productId,
}: {
  price: Price;
  quantity?: number;
  productId?: string;
}) {
  // 1. Get the user from session
  const session = await getSession();

  if (!session?.user) {
    return redirect(`${getURL()}/signup`);
  }

  if (!session.user.email) {
    throw Error('Could not get email');
  }

  // 2. Validate stock if product ID is provided
  if (productId) {
    const stockCheck = await checkStock(productId, quantity);
    if (!stockCheck.available) {
      throw new Error(stockCheck.error || 'Product is not available');
    }
  }

  // 3. Validate quantity limits
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  if (quantity > 20) {
    throw new Error('Maximum order quantity is 20 bottles');
  }

  // 4. Retrieve or create the customer in Stripe
  const customer = await getOrCreateCustomer({
    userId: session.user.id,
    email: session.user.email,
  });

  // 5. Create a checkout session in Stripe with shipping
  const checkoutSession = await stripeAdmin.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    customer,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: price.id,
        quantity: quantity,
      },
    ],
    mode: 'payment', // Always payment for one-time purchases
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
    ],
    success_url: `${getURL()}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getURL()}/products/angelicas-organic-evoo`,
  });

  if (!checkoutSession || !checkoutSession.url) {
    throw Error('checkoutSession is not defined');
  }

  // 6. Redirect to checkout url
  redirect(checkoutSession.url);
}
