import type { Metadata } from 'next';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Shipping Policy - Angelica\'s Organic EVOO',
  description: 'Shipping policy and delivery information for Angelica\'s Organic EVOO orders.',
};

export default function ShippingPolicyPage() {
  return (
    <Container className='py-16'>
      <div className='max-w-3xl mx-auto prose prose-lg max-w-none'>
        <h1 className='text-4xl lg:text-5xl font-alt font-bold text-[#001B71] mb-8'>
          Shipping Policy
        </h1>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Free Shipping</h2>
          <p className='text-gray-700 leading-relaxed'>
            We offer free shipping on all orders within the United States. Shipping costs are included in the product price, so there are no additional charges at checkout.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Shipping Locations</h2>
          <p className='text-gray-700 leading-relaxed'>
            We currently ship to addresses within the United States only. International shipping is not available at this time.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Processing Time</h2>
          <p className='text-gray-700 leading-relaxed'>
            Orders are typically processed within 1-2 business days after payment confirmation. Each bottle is carefully prepared and packed with care before shipping.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Delivery Time</h2>
          <p className='text-gray-700 leading-relaxed'>
            Once your order ships, delivery typically takes 5-7 business days via USPS. You will receive a tracking number via email once your order has shipped, so you can follow its journey to your door.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Package Dimensions</h2>
          <p className='text-gray-700 leading-relaxed'>
            Each bottle is shipped in a secure box measuring 5x5x15 inches, weighing approximately 2.7 pounds. Multiple bottles are shipped individually to ensure safe delivery.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Tracking Your Order</h2>
          <p className='text-gray-700 leading-relaxed'>
            Once your order ships, you will receive an email with tracking information. You can use this to monitor your package's progress and estimated delivery date.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Delivery Issues</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you experience any issues with delivery, please contact us at{' '}
            <a href='mailto:hello@angelicas-evoo.com' className='text-[#001B71] hover:underline'>
              hello@angelicas-evoo.com
            </a>
            {' '}and we'll work with you to resolve the issue promptly.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Questions?</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you have any questions about shipping, please don't hesitate to{' '}
            <a href='/contact' className='text-[#001B71] hover:underline'>
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}