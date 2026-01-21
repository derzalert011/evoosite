import type { Metadata } from 'next';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Privacy Policy - Angelica\'s Organic EVOO',
  description: 'Privacy policy for Angelica\'s Organic EVOO website.',
};

export default function PrivacyPolicyPage() {
  return (
    <Container className='py-16'>
      <div className='max-w-3xl mx-auto prose prose-lg max-w-none'>
        <h1 className='text-4xl lg:text-5xl font-alt font-bold text-[#001B71] mb-8'>
          Privacy Policy
        </h1>

        <p className='text-gray-700 leading-relaxed mb-8'>
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Introduction</h2>
          <p className='text-gray-700 leading-relaxed'>
            Angelica's Organic EVOO ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Information We Collect</h2>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>Personal Information</h3>
          <p className='text-gray-700 leading-relaxed mb-4'>
            We collect information that you provide directly to us, including:
          </p>
          <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4'>
            <li>Name and contact information (email address, phone number, shipping address)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Account information if you create an account</li>
            <li>Newsletter subscription preferences</li>
          </ul>

          <h3 className='text-xl font-semibold text-gray-800 mb-2'>Automatically Collected Information</h3>
          <p className='text-gray-700 leading-relaxed'>
            We may automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>How We Use Your Information</h2>
          <p className='text-gray-700 leading-relaxed mb-4'>
            We use the information we collect to:
          </p>
          <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and shipping updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you marketing communications if you've subscribed to our newsletter (you can unsubscribe at any time)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Information Sharing</h2>
          <p className='text-gray-700 leading-relaxed'>
            We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and conducting business, such as payment processors (Stripe), email service providers (Brevo), and shipping providers (Shippo). These third parties are contractually obligated to keep your information confidential and secure.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Data Security</h2>
          <p className='text-gray-700 leading-relaxed'>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Your Rights</h2>
          <p className='text-gray-700 leading-relaxed mb-4'>
            Depending on your location, you may have the following rights:
          </p>
          <ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your information</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Cookies and Tracking</h2>
          <p className='text-gray-700 leading-relaxed'>
            We use cookies and similar tracking technologies to analyze website traffic and improve your experience. You can control cookies through your browser settings.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Children's Privacy</h2>
          <p className='text-gray-700 leading-relaxed'>
            Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Changes to This Policy</h2>
          <p className='text-gray-700 leading-relaxed'>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-alt font-bold text-[#001B71] mb-4'>Contact Us</h2>
          <p className='text-gray-700 leading-relaxed'>
            If you have questions about this Privacy Policy, please contact us at{' '}
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