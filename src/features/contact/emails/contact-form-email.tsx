import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from '../../emails/tailwind.config';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactFormEmail({ name, email, message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-slate-500 px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[600px] overflow-hidden rounded-md bg-white'>
            <Section className='h-[120px] w-full bg-[#001B71] bg-center flex items-center justify-center'>
              <Heading className='mb-0 text-center text-[36px] font-bold text-white'>
                📧 New Contact Form Submission
              </Heading>
            </Section>
            <Section className='p-8'>
              <Heading as='h2' className='m-0 text-[24px] font-bold'>
                Message from {name}
              </Heading>

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Contact Information
                </Heading>
                <Text className='my-1 text-[14px]'>
                  <strong>Name:</strong> {name}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${email}`} className='text-blue-600 underline'>
                    {email}
                  </a>
                </Text>
              </Section>

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Message
                </Heading>
                <Text className='my-2 text-[14px] whitespace-pre-wrap'>{message}</Text>
              </Section>

              <Section className='my-6 p-4 bg-gray-50 border border-gray-200 rounded'>
                <Text className='my-1 text-[12px] text-gray-600'>
                  This email was sent from the contact form on Angelica's Organic EVOO website.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactFormEmail;