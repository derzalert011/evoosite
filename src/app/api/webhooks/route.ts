import Stripe from 'stripe';

import { upsertUserSubscription } from '@/features/account/controllers/upsert-user-subscription';
import { upsertPrice } from '@/features/pricing/controllers/upsert-price';
import { upsertProduct } from '@/features/pricing/controllers/upsert-product';
import { processOrder } from '@/features/orders/controllers/process-order';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { getEnvVar } from '@/utils/get-env-var';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  
  // Get webhook secret with proper error handling
  let webhookSecret: string;
  try {
    webhookSecret = getEnvVar(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET');
  } catch (error) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return Response.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    if (!sig) {
      console.error('Missing stripe-signature header');
      return Response.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }
    event = stripeAdmin.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`✅ Webhook received: ${event.type}`);
  } catch (error) {
    console.error('Webhook signature verification failed:', (error as any).message);
    return Response.json({ error: `Webhook Error: ${(error as any).message}` }, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProduct(event.data.object as Stripe.Product);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPrice(event.data.object as Stripe.Price);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await upsertUserSubscription({
            subscriptionId: subscription.id,
            customerId: subscription.customer as string,
            isCreateAction: false,
          });
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          console.log(`📦 Processing checkout session: ${checkoutSession.id}, mode: ${checkoutSession.mode}`);

          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await upsertUserSubscription({
              subscriptionId: subscriptionId as string,
              customerId: checkoutSession.customer as string,
              isCreateAction: true,
            });
          } else if (checkoutSession.mode === 'payment') {
            // Handle one-time payment orders
            console.log('🛒 Processing one-time payment order...');
            console.log(`   Customer email: ${checkoutSession.customer_details?.email || checkoutSession.customer_email || 'N/A'}`);
            console.log(`   Customer name: ${checkoutSession.customer_details?.name || 'N/A'}`);
            const result = await processOrder(checkoutSession);
            console.log(`✅ Order processed: ${result.orderId}, errors: ${result.errors.length}`);
            if (result.errors.length > 0) {
              console.error('⚠️ Order processing errors:', JSON.stringify(result.errors, null, 2));
            }
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error('❌ Webhook handler failed:', error);
      return Response.json({ error: 'Webhook handler failed', details: (error as any).message }, {
        status: 400,
      });
    }
  }
  console.log(`✅ Webhook processed successfully: ${event.type}`);
  return Response.json({ received: true });
}
