import type { Metadata } from 'next';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Return Policy - Angelica\'s Organic EVOO',
  description: 'Return and refund policy for Angelica\'s Organic EVOO orders.',
};

export default function ReturnPolicyPage() {
  return (
    <Container className='py-16'>
      <div className='max-w-3xl mx-auto prose prose-lg max-w-none'>
        <h1 className='text-4xl lg:text-5xl font-alt font-bold text-[#001B71] mb-8'>
          Return & Refund Policy
        </h1>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Our Commitment</h2>
          <p className='text-gray-700 leading-relaxed'>
            We want you to be completely satisfied with your purchase from Angelica's Organic EVOO. If you're not happy with your order, we're here to help.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Returns</h2>
          <p className='text-gray-700 leading-relaxed mb-4'>
            We accept returns within 30 days of delivery for unopened products in their original packaging. To initiate a return:
          </p>
          <ol className='list-decimal list-inside space-y-2 text-gray-700 ml-4'>
            <li>Contact us at{' '}
              <a href='mailto:hello@angelicas-evoo.com' className='text-[#001B71] hover:underline'>
                hello@angelicas-evoo.com
              </a>
              {' '}with your order number
            </li>
            <li>We'll provide you with return shipping instructions</li>
            <li>Once we receive the returned product, we'll process your refund</li>
          </ol>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Refunds</h2>
          <p className='text-gray-700 leading-relaxed'>
            Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned product. The original shipping cost is non-refundable unless the return is due to our error.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Damaged or Defective Products</h2>
          <p className='text-gray-700 leading-relaxed'>
            If your order arrives damaged or defective, please contact us immediately at{' '}
            <a href='mailto:hello@angelicas-evoo.com' className='text-[#001B71] hover:underline'>
              hello@angelicas-evoo.com
            </a>
            {' '}with photos of the damaged item and your order number. We'll arrange for a replacement or full refund, including return shipping costs.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Opened Products</h2>
          <p className='text-gray-700 leading-relaxed'>
            Due to the nature of our product, we cannot accept returns of opened bottles unless the product is defective or damaged. If you receive a defective product, please contact us immediately.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Cancellations</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you need to cancel your order, please contact us as soon as possible. Orders that have already shipped cannot be cancelled, but you may return the product according to our return policy.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Questions?</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you have any questions about returns or refunds, please{' '}
            <a href='/contact' className='text-[#001B71] hover:underline'>
              contact us
            </a>
            {' '}and we'll be happy to assist you.
          </p>
        </section>
      </div>
    </Container>
  );
}