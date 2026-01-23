import Stripe from 'stripe';

import { getEnvVar } from '@/utils/get-env-var';

// Lazy initialization to prevent errors during module load
let stripeInstance: Stripe | null = null;

export function getStripeAdmin(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(getEnvVar(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'), {
      // https://github.com/stripe/stripe-node#configuration
      apiVersion: '2023-10-16',
      // Register this as an official Stripe plugin.
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: "Angelica's Organic EVOO",
        version: '0.1.0',
      },
    });
    console.log('🔑 Stripe Admin client initialized');
  }
  return stripeInstance;
}

// For backwards compatibility - lazily get the instance
export const stripeAdmin = {
  get checkout() { return getStripeAdmin().checkout; },
  get customers() { return getStripeAdmin().customers; },
  get subscriptions() { return getStripeAdmin().subscriptions; },
  get products() { return getStripeAdmin().products; },
  get prices() { return getStripeAdmin().prices; },
  get invoices() { return getStripeAdmin().invoices; },
  get paymentIntents() { return getStripeAdmin().paymentIntents; },
  get billingPortal() { return getStripeAdmin().billingPortal; },
  get webhooks() { return getStripeAdmin().webhooks; },
};
