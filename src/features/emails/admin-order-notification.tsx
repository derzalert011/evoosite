import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from './tailwind.config';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

interface AdminOrderNotificationEmailProps {
  orderNumber: string;
  customerName?: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  shippingAddress: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  shippingLabelUrls?: string[];
  shippingRate?: number;
  totalCost?: number;
  errors?: Array<{ service: string; error: string }>;
}

export function AdminOrderNotificationEmail({
  orderNumber,
  customerName,
  customerEmail,
  productName,
  quantity,
  shippingAddress,
  shippingLabelUrls = [],
  shippingRate,
  totalCost,
  errors = [],
}: AdminOrderNotificationEmailProps) {
  const hasErrors = errors.length > 0;
  const hasLabels = shippingLabelUrls.length > 0;

  return (
    <Html>
      <Head />
      <Preview>
        {hasErrors ? 'Order Received - Manual Processing Required' : 'New Order - Ready to Ship'}
      </Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-slate-500 px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[600px] overflow-hidden rounded-md bg-white'>
            <Section
              className={`h-[120px] w-full ${hasErrors ? 'bg-orange-600' : 'bg-[#001B71]'} bg-center flex items-center justify-center`}
            >
              <Heading className='mb-0 text-center text-[36px] font-bold text-white'>
                {hasErrors ? '⚠️ Order Received' : '📦 New Order'}
              </Heading>
            </Section>
            <Section className='p-8'>
              <Heading as='h2' className='m-0 text-[24px] font-bold'>
                Order #{orderNumber}
              </Heading>

              {hasErrors && (
                <Section className='my-6 p-4 bg-orange-50 border border-orange-200 rounded'>
                  <Heading as='h3' className='m-0 text-[18px] font-bold text-orange-800'>
                    ⚠️ Manual Processing Required
                  </Heading>
                  <Text className='my-2 text-[14px] text-orange-800'>
                    The following errors occurred during automatic processing:
                  </Text>
                  <ul className='list-disc pl-6'>
                    {errors.map((err, idx) => (
                      <li key={idx} className='text-[14px] text-orange-800'>
                        <strong>{err.service}:</strong> {err.error}
                      </li>
                    ))}
                  </ul>
                  <Text className='my-2 text-[14px] text-orange-800'>
                    Please process this order manually.
                  </Text>
                </Section>
              )}

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Customer Information
                </Heading>
                <Text className='my-1 text-[14px]'>
                  <strong>Name:</strong> {customerName || 'N/A'}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Email:</strong> {customerEmail}
                </Text>
              </Section>

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Order Details
                </Heading>
                <Text className='my-1 text-[14px]'>
                  <strong>Product:</strong> {productName}
                </Text>
                <Text className='my-1 text-[14px]'>
                  <strong>Quantity:</strong> {quantity} bottle{quantity > 1 ? 's' : ''}
                </Text>
                {totalCost && (
                  <Text className='my-1 text-[14px]'>
                    <strong>Total:</strong> ${(totalCost / 100).toFixed(2)}
                  </Text>
                )}
              </Section>

              <Section className='my-6'>
                <Heading as='h3' className='m-0 text-[18px] font-bold'>
                  Shipping Address
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
                {shippingAddress.country && (
                  <Text className='my-1 text-[14px]'>{shippingAddress.country}</Text>
                )}
              </Section>

              {hasLabels && (
                <Section className='my-6'>
                  <Heading as='h3' className='m-0 text-[18px] font-bold'>
                    Shipping Labels
                  </Heading>
                  <Text className='my-2 text-[14px]'>
                    {shippingLabelUrls.length} label{shippingLabelUrls.length > 1 ? 's' : ''} generated:
                  </Text>
                  {shippingLabelUrls.map((url, idx) => (
                    <Text key={idx} className='my-1 text-[14px]'>
                      <Link href={url} className='text-blue-600 underline'>
                        Label {idx + 1}
                      </Link>
                    </Text>
                  ))}
                  {shippingRate && (
                    <Text className='my-2 text-[14px]'>
                      <strong>Shipping Cost:</strong> ${shippingRate.toFixed(2)} (per label)
                    </Text>
                  )}
                </Section>
              )}

              {!hasLabels && !hasErrors && (
                <Section className='my-6 p-4 bg-yellow-50 border border-yellow-200 rounded'>
                  <Text className='my-1 text-[14px] text-yellow-800'>
                    ⚠️ Shipping labels were not generated. Please create them manually in Shippo.
                  </Text>
                </Section>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default AdminOrderNotificationEmail;