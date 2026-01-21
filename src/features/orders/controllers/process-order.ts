import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { createShipment, type ShippingDestination } from '@/features/shipping/controllers/create-shipment';
import { sendTransactionalEmail } from '@/libs/brevo/brevo-client';
import { getEnvVar } from '@/utils/get-env-var';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';

export async function processOrder(checkoutSession: Stripe.Checkout.Session) {
  const errors: Array<{ service: string; error: string }> = [];

  try {
    // 1. Retrieve full checkout session with line items
    const session = await stripeAdmin.checkout.sessions.retrieve(checkoutSession.id, {
      expand: ['line_items', 'customer', 'shipping_details'],
    });

    if (!session.line_items?.data || session.line_items.data.length === 0) {
      throw new Error('No line items found in checkout session');
    }

    const lineItem = session.line_items.data[0];
    const price = lineItem.price;
    if (!price || typeof price.product !== 'string') {
      throw new Error('Product information not found');
    }

    const productId = price.product;
    const quantity = lineItem.quantity || 1;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name;

    if (!customerEmail) {
      throw new Error('Customer email not found');
    }

    // 2. Get user ID from Stripe customer metadata
    let userId: string | null = null;
    if (typeof session.customer === 'string') {
      const customer = await stripeAdmin.customers.retrieve(session.customer);
      if (!customer.deleted && 'metadata' in customer && customer.metadata?.userId) {
        userId = customer.metadata.userId;
      } else {
        // Fallback: look up customer in Supabase by Stripe customer ID
        const { data: customerData } = await supabaseAdminClient
          .from('customers')
          .select('id')
          .eq('stripe_customer_id', session.customer)
          .maybeSingle();
        userId = customerData?.id || null;
      }
    }

    // 3. Extract shipping address
    const shippingAddress = session.shipping_details?.address;
    if (!shippingAddress) {
      throw new Error('Shipping address not found');
    }

    const shippingDestination: ShippingDestination = {
      name: session.shipping_details?.name || customerName || '',
      street1: shippingAddress.line1 || '',
      street2: shippingAddress.line2 || undefined,
      city: shippingAddress.city || '',
      state: shippingAddress.state || '',
      zip: shippingAddress.postal_code || '',
      country: shippingAddress.country || 'US',
    };

    // 4. Get product info
    const products = await getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // 5. Decrement stock
    const productMetadata = productMetadataSchema.parse(product.metadata || {});
    const currentStock = productMetadata.stockCount ?? 0;
    const newStock = Math.max(0, currentStock - quantity);

    // Update product in Stripe (which will sync to Supabase via webhook)
    try {
      await stripeAdmin.products.update(productId, {
        metadata: {
          ...(product.metadata && typeof product.metadata === 'object' && !Array.isArray(product.metadata) 
            ? product.metadata as Record<string, string>
            : {}),
          stock_count: newStock.toString(),
        },
      });
    } catch (error: any) {
      errors.push({ service: 'Stock Update', error: error.message });
    }

    // 6. Create order record
    // userId is optional for guest checkout
    // Convert Stripe Address to plain JSON object for storage
    const shippingAddressJson = {
      line1: shippingAddress.line1,
      line2: shippingAddress.line2 || null,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postal_code: shippingAddress.postal_code,
      country: shippingAddress.country,
    };

    const orderData = {
      user_id: userId || null, // Allow null for guest checkout
      stripe_checkout_session_id: session.id,
      product_id: productId,
      quantity,
      shipping_address: shippingAddressJson,
      shipping_label_urls: [] as string[],
      status: 'pending' as const,
    };

    const { data: order, error: orderError } = await supabaseAdminClient
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(`Failed to create order: ${orderError?.message}`);
    }

    // 7. Generate shipping labels (one per bottle)
    const shippingLabelUrls: string[] = [];
    let totalShippingCost = 0;

    for (let i = 0; i < quantity; i++) {
      try {
        const shipment = await createShipment(shippingDestination);
        shippingLabelUrls.push(shipment.labelUrl);
        totalShippingCost += shipment.rate;
      } catch (error: any) {
        errors.push({ service: `Shippo Label ${i + 1}`, error: error.message });
      }
    }

    // Update order with label URLs
    if (shippingLabelUrls.length > 0) {
      await supabaseAdminClient
        .from('orders')
        .update({
          shipping_label_urls: shippingLabelUrls,
          shipping_rate: totalShippingCost,
          status: shippingLabelUrls.length === quantity ? 'processing' : 'pending',
        })
        .eq('id', order.id);
    }

    // 8. Send customer email
    try {
      const welcomeEmailHtml = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Welcome to the Family!</h1>
            <p>Hello ${customerName || 'there'},</p>
            <p>Thank you for choosing Angelica's Organic Extra Virgin Olive Oil. We're thrilled to welcome you to our family.</p>
            <p>Your order (#${order.id.substring(0, 8)}) is being prepared with care. We'll send you a confirmation email once your bottle(s) are on their way.</p>
            <p>Each bottle is crafted with the same love and intention that Angelica brought to her kitchen. We hope it becomes a treasured part of your family's table.</p>
            <p>From our kitchen to yours — salud</p>
            <p>- The Angelica's Family</p>
          </body>
        </html>
      `;

      await sendTransactionalEmail({
        to: [{ email: customerEmail, name: customerName || undefined }],
        subject: "Welcome to the Family!",
        htmlContent: welcomeEmailHtml,
      });
      console.log(`✅ Customer email sent to: ${customerEmail}`);
    } catch (error: any) {
      console.error('❌ Failed to send customer email:', error);
      errors.push({ service: 'Customer Email', error: error.message || 'Unknown error' });
    }

    // 9. Send admin notification email
    try {
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>${errors.length > 0 ? '⚠️ Order Received - Manual Processing Required' : '📦 New Order'}</h1>
            <h2>Order #${order.id.substring(0, 8)}</h2>
            ${errors.length > 0 ? `
              <div style="background-color: #fff3cd; padding: 15px; border: 1px solid #ffc107; border-radius: 5px; margin: 20px 0;">
                <h3>⚠️ Manual Processing Required</h3>
                <p>The following errors occurred:</p>
                <ul>
                  ${errors.map(e => `<li><strong>${e.service}:</strong> ${e.error}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${customerName || 'N/A'}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <h3>Order Details</h3>
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${quantity} bottle${quantity > 1 ? 's' : ''}</p>
            <p><strong>Total:</strong> $${((session.amount_total || 0) / 100).toFixed(2)}</p>
            <h3>Shipping Address</h3>
            <p>${shippingDestination.name}</p>
            <p>${shippingDestination.street1}</p>
            ${shippingDestination.street2 ? `<p>${shippingDestination.street2}</p>` : ''}
            <p>${shippingDestination.city}, ${shippingDestination.state} ${shippingDestination.zip}</p>
            ${shippingLabelUrls.length > 0 ? `
              <h3>Shipping Labels</h3>
              ${shippingLabelUrls.map((url, idx) => `<p><a href="${url}">Label ${idx + 1}</a></p>`).join('')}
              <p><strong>Shipping Cost:</strong> $${totalShippingCost.toFixed(2)}</p>
            ` : '<p>⚠️ Shipping labels were not generated. Please create them manually in Shippo.</p>'}
          </body>
        </html>
      `;

      const adminEmail = getEnvVar(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL');
      console.log(`📧 Sending admin email to: ${adminEmail}`);
      await sendTransactionalEmail({
        to: [{ email: adminEmail }],
        subject: errors.length > 0 
          ? `⚠️ Order #${order.id.substring(0, 8)} - Manual Processing Required`
          : `📦 New Order #${order.id.substring(0, 8)}`,
        htmlContent: adminEmailHtml,
      });
      console.log(`✅ Admin email sent successfully to: ${adminEmail}`);
    } catch (error: any) {
      console.error('❌ Failed to send admin notification email:', error);
      if (error.response) {
        console.error('   Brevo API Response:', JSON.stringify(error.response.body, null, 2));
      }
      // Don't add to errors array - admin notification failure shouldn't block order
    }

    // 10. Update order with any processing errors
    if (errors.length > 0) {
      await supabaseAdminClient
        .from('orders')
        .update({
          processing_errors: errors,
          status: 'pending',
        })
        .eq('id', order.id);
    }

    return { orderId: order.id, errors };
  } catch (error: any) {
    console.error('Order processing error:', error);
    throw error;
  }
}