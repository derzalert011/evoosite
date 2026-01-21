import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from './tailwind.config';
import { BRAND_VOICE } from '@/lib/brand-config';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

interface WelcomeToFamilyEmailProps {
  customerName?: string;
  orderNumber?: string;
}

export function WelcomeToFamilyEmail({ customerName, orderNumber }: WelcomeToFamilyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Family!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-slate-500 px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[464px] overflow-hidden rounded-md bg-white'>
            <Section className='h-[255px] w-full bg-[#001B71] bg-center flex items-center justify-center'>
              <Heading className='mb-0 text-center text-[48px] font-bold text-[#FDF9EB]'>
                Welcome to the Family!
              </Heading>
            </Section>
            <Section className='p-8'>
              <Heading as='h2' className='m-0 text-[24px] font-bold'>
                {customerName ? `Hello ${customerName},` : 'Hello,'}
              </Heading>
              <Text className='my-6 text-[16px]'>
                Thank you for choosing Angelica's Organic Extra Virgin Olive Oil. We're thrilled to welcome you to our family.
              </Text>
              <Text className='my-6 text-[16px]'>
                Your order{orderNumber ? ` (#${orderNumber})` : ''} is being prepared with care. We'll send you a confirmation email once your bottle(s) are on their way.
              </Text>
              <Text className='my-6 text-[16px]'>
                Each bottle is crafted with the same love and intention that Angelica brought to her kitchen. We hope it becomes a treasured part of your family's table.
              </Text>
              <Text className='my-6 text-[16px]'>
                From our kitchen to yours — salud
              </Text>
              <Text className='my-6 text-[14px] text-gray-600 italic'>
                - The Angelica's Family
              </Text>
            </Section>
          </Container>
          <Container className='mx-auto mt-4'>
            <Section className='text-center'>
              <Text className='m-0 text-xs text-white'>
                Questions about your order?{' '}
                <Link className='text-center text-xs text-white underline' href={`${baseUrl}/contact`}>
                  Contact us
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WelcomeToFamilyEmail;