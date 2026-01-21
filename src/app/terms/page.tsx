import type { Metadata } from 'next';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Terms of Service - Angelica\'s Organic EVOO',
  description: 'Terms of service for Angelica\'s Organic EVOO website.',
};

export default function TermsPage() {
  return (
    <Container className='py-16'>
      <div className='max-w-3xl mx-auto prose prose-lg max-w-none'>
        <h1 className='text-4xl lg:text-5xl font-alt font-bold text-[#001B71] mb-8'>
          Terms of Service
        </h1>

        <p className='text-gray-700 leading-relaxed mb-8'>
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Agreement to Terms</h2>
          <p className='text-gray-700 leading-relaxed'>
            By accessing and using Angelica's Organic EVOO website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Use License</h2>
          <p className='text-gray-700 leading-relaxed'>
            Permission is granted to temporarily access the materials on Angelica's Organic EVOO's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Product Information</h2>
          <p className='text-gray-700 leading-relaxed'>
            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. Prices and availability are subject to change without notice.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Orders and Payment</h2>
          <p className='text-gray-700 leading-relaxed mb-4'>
            By placing an order, you agree to:
          </p>
          <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
            <li>Provide accurate and complete information</li>
            <li>Pay all charges incurred by your account</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
          <p className='text-gray-700 leading-relaxed mt-4'>
            All payments are processed securely through Stripe. We do not store your credit card information.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Limited Availability</h2>
          <p className='text-gray-700 leading-relaxed'>
            Our products are produced in small batches with limited availability. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Limitation of Liability</h2>
          <p className='text-gray-700 leading-relaxed'>
            In no event shall Angelica's Organic EVOO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Revisions</h2>
          <p className='text-gray-700 leading-relaxed'>
            Angelica's Organic EVOO may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Governing Law</h2>
          <p className='text-gray-700 leading-relaxed'>
            These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Contact Information</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href='mailto:hello@angelicas-evoo.com' className='text-[#001B71] hover:underline'>
              hello@angelicas-evoo.com
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}