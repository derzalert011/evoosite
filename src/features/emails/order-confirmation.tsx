import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from './tailwind.config';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName?: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  shippingAddress: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  productName,
  quantity,
  totalAmount,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Order Confirmation - Thank You for Your Order!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-slate-500 px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[464px] overflow-hidden rounded-md bg-white'>
            <Section className='h-[180px] w-full bg-[#001B71] bg-center flex items-center justify-center'>
              <Heading className='mb-0 text-center text-[36px] font-bold text-[#FDF9EB]'>
                Thank You for Your Order!
              </Heading>
            </Section>
            <Section className='p-8'>
              <Heading as='h2' className='m-0 text-[24px] font-bold'>
                Order #{orderNumber}
              </Heading>
              <Text className='my-6 text-[16px]'>
                {customerName ? `Hello ${customerName},` : 'Hello,'}
              </Text>
              <Text className='my-6 text-[16px]'>
                We've received your order and are preparing it with care. Here's a summary of what you ordered:
              </Text>

              <Section className='my-6 p-4 bg-gray-50 rounded'>
                <Text className='my-1 text-[14px]'>
                  <strong>Product:</strong> {productName}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Quantity:</strong> {quantity} bottle{quantity > 1 ? 's' : ''}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Total:</strong> ${(totalAmount / 100).toFixed(2)}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Shipping:</strong> Free
                </Text>
              </Section>

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Shipping To:
                </Heading>
                <Text className='my-1 text-[14px]'>
                  {shippingAddress.name || customerName}
                </Text>
                {shippingAddress.line1 && (
                  <Text className='my-1 text-[14px]'>{shippingAddress.line1}</Text>
                )}
                {shippingAddress.line2 && (
                  <Text className='my-1 text-[14px]'>{shippingAddress.line2}</Text>
                )}
                <Text className='my-1 text-[14px]'>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}
                </Text>
              </Section>

              <Text className='my-6 text-[16px]'>
                We'll send you another email with tracking information once your order ships. Expect delivery within 5-7 business days.
              </Text>

              <Text className='my-6 text-[16px]'>
                From our kitchen to yours — salud
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

export default OrderConfirmationEmail;