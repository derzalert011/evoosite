import { getShippoClient, getShippingOrigin, type ShippingOrigin } from '@/libs/shippo/shippo-client';
import type { ShippingDestination, ShippingPackage } from './get-shipping-rate';

// Re-export for use in other modules
export type { ShippingDestination };

/**
 * Create a shipment and generate a shipping label
 * Returns the label URL and transaction object ID
 */
export async function createShipment(
  destination: ShippingDestination,
  packageDetails: ShippingPackage = {
    weight: '2.7',
    length: '15',
    width: '5',
    height: '5',
  }
): Promise<{ labelUrl: string; trackingNumber: string; rate: number }> {
  const shippo = getShippoClient();
  const origin = getShippingOrigin();

  // Debug logging to verify email/phone are set
  console.log('📦 Creating shipment with origin:', {
    name: origin.name,
    email: origin.email ? `${origin.email.substring(0, 3)}***` : 'MISSING',
    phone: origin.phone ? `${origin.phone.substring(0, 3)}***` : 'MISSING',
    city: origin.city,
    state: origin.state,
  });

  // Create address objects
  // USPS requires email and phone for sender address
  const fromAddress = {
    name: origin.name,
    street1: origin.street1,
    city: origin.city,
    state: origin.state,
    zip: origin.zip,
    country: origin.country,
    email: origin.email,
    phone: origin.phone,
  };

  const toAddress = {
    name: destination.name,
    street1: destination.street1,
    street2: destination.street2,
    city: destination.city,
    state: destination.state,
    zip: destination.zip,
    country: destination.country || 'US',
  };

  // Create parcel
  const parcel = {
    length: packageDetails.length,
    width: packageDetails.width,
    height: packageDetails.height,
    distanceUnit: 'in' as const,
    weight: packageDetails.weight,
    massUnit: 'lb' as const,
  };

  // Create shipment
  const shipment = await shippo.shipments.create({
    addressFrom: fromAddress,
    addressTo: toAddress,
    parcels: [parcel],
    async: false,
  });

  if (!shipment.rates || shipment.rates.length === 0) {
    throw new Error('No shipping rates available');
  }

  // Filter for USPS only and find cheapest rate
  const uspsRates = shipment.rates.filter((rate: any) => 
    rate.provider === 'USPS' || rate.servicelevel?.token?.includes('usps')
  );

  if (uspsRates.length === 0) {
    throw new Error('No USPS shipping rates available');
  }

  // Sort by amount (cheapest first) and select the first one
  const cheapestRate = uspsRates.sort((a: any, b: any) => 
    parseFloat(a.amount) - parseFloat(b.amount)
  )[0];

  // Purchase the label using the cheapest rate
  const transaction = await shippo.transactions.create({
    rate: cheapestRate.objectId,
    async: false,
  });

  // Check for transaction errors
  if (transaction.status === 'ERROR' || transaction.objectState === 'INVALID') {
    const errorMessages = transaction.messages || [];
    const errorText = errorMessages
      .map((msg: any) => `${msg.source || 'Shippo'}: ${msg.text || msg.code || 'Unknown error'}`)
      .join('; ') || 'Unknown error from Shippo';
    throw new Error(`Failed to generate shipping label: ${errorText}`);
  }

  if (!transaction.labelUrl) {
    const errorMessages = transaction.messages || [];
    const errorText = errorMessages.length > 0
      ? errorMessages.map((msg: any) => `${msg.source || 'Shippo'}: ${msg.text || msg.code || 'Unknown error'}`).join('; ')
      : 'No label URL returned';
    throw new Error(`Failed to generate shipping label: ${errorText}`);
  }

  return {
    labelUrl: transaction.labelUrl,
    trackingNumber: transaction.trackingNumber || '',
    rate: parseFloat(cheapestRate.amount),
  };
}