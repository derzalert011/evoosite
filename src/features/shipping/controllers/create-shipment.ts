import { getShippoClient, getShippingOrigin, type ShippingOrigin } from '@/libs/shippo/shippo-client';
import type { ShippingDestination, ShippingPackage } from './get-shipping-rate';

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

  // Create address objects
  const fromAddress = {
    name: origin.name,
    street1: origin.street1,
    city: origin.city,
    state: origin.state,
    zip: origin.zip,
    country: origin.country,
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
    distance_unit: 'in',
    weight: packageDetails.weight,
    mass_unit: 'lb',
  };

  // Create shipment
  const shipment = await shippo.shipment.create({
    address_from: fromAddress,
    address_to: toAddress,
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
  const transaction = await shippo.transaction.create({
    rate: cheapestRate.object_id,
    async: false,
  });

  if (!transaction.label_url) {
    throw new Error('Failed to generate shipping label');
  }

  return {
    labelUrl: transaction.label_url,
    trackingNumber: transaction.tracking_number || '',
    rate: parseFloat(cheapestRate.amount),
  };
}