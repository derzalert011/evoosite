import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { BRAND_VOICE } from '@/lib/brand-config';

export const metadata: Metadata = {
  title: 'Order Confirmation - Thank You! | Angelica\'s Organic EVOO',
  description: 'Your order has been confirmed. Thank you for choosing Angelica\'s Organic Extra Virgin Olive Oil.',
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    redirect('/');
  }

  try {
    const session = await stripeAdmin.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'shipping_details'],
    });

    if (!session.line_items?.data || session.line_items.data.length === 0) {
      redirect('/');
    }

    const lineItem = session.line_items.data[0];
    const productName = lineItem.description || "Angelica's Organic EVOO";
    const quantity = lineItem.quantity || 1;
    const totalAmount = session.amount_total || 0;
    const customerName = session.customer_details?.name;
    const shippingAddress = session.shipping_details?.address;

    return (
      <Container className='py-16'>
        <div className='max-w-2xl mx-auto text-center'>
          <div className='mb-8'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <IoCheckmark className='w-12 h-12 text-green-600' />
            </div>
            <h1 className='text-4xl lg:text-5xl font-alt font-bold text-[#001B71] mb-4'>
              Thank You for Your Order!
            </h1>
            <p className='text-lg text-gray-600'>
              We've received your order and are preparing it with care.
            </p>
          </div>

          <div className='bg-gray-50 rounded-lg p-6 mb-8 text-left'>
            <h2 className='text-2xl font-alt font-bold mb-4'>Order Summary</h2>
            <div className='space-y-3 mb-4'>
              <div className='flex justify-between'>
                <span className='text-gray-700'>Product:</span>
                <span className='font-semibold'>{productName}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-700'>Quantity:</span>
                <span className='font-semibold'>{quantity} bottle{quantity > 1 ? 's' : ''}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-700'>Shipping:</span>
                <span className='font-semibold text-green-600'>Free</span>
              </div>
              <div className='border-t border-gray-300 pt-3 flex justify-between text-lg'>
                <span className='font-semibold'>Total:</span>
                <span className='font-bold text-[#001B71]'>${(totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {shippingAddress && (
            <div className='bg-gray-50 rounded-lg p-6 mb-8 text-left'>
              <h3 className='text-xl font-alt font-bold mb-3'>Shipping To:</h3>
              <div className='text-gray-700 space-y-1'>
                <p className='font-semibold'>{customerName || 'N/A'}</p>
                {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
                {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                <p>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}
                </p>
                {shippingAddress.country && <p>{shippingAddress.country}</p>}
              </div>
            </div>
          )}

          <div className='mb-8'>
            <p className='text-gray-700 mb-4'>
              We'll send you another email with tracking information once your order ships. Expect delivery within 5-7 business days.
            </p>
            <p className='text-lg text-gray-700 italic'>
              {BRAND_VOICE.signatureClosings.emails}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild variant='sexy' className='bg-[#F7D63A] text-[#001B71] hover:bg-[#F7D63A]/90'>
              <Link href='/products/angelicas-organic-evoo'>Continue Shopping</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/account'>View Account</Link>
            </Button>
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error('Error retrieving order:', error);
    redirect('/');
  }
}