import { getShippoClient, getShippingOrigin, type ShippingOrigin } from '@/libs/shippo/shippo-client';

export interface ShippingDestination {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ShippingPackage {
  weight: string; // in lbs
  length: string; // in inches
  width: string; // in inches
  height: string; // in inches
}

/**
 * Get the cheapest USPS shipping rate for a package
 */
export async function getShippingRate(
  destination: ShippingDestination,
  packageDetails: ShippingPackage = {
    weight: '2.7', // Default: 2.7 lbs per product_shipping_info.md
    length: '15',
    width: '5',
    height: '5',
  }
): Promise<{ rate: number; serviceLevel: string; objectId: string }> {
  const shippo = getShippoClient();
  const origin = getShippingOrigin();

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

  // Get rates
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

  // Sort by amount (cheapest first) and return the first one
  const cheapestRate = uspsRates.sort((a: any, b: any) => 
    parseFloat(a.amount) - parseFloat(b.amount)
  )[0];

  return {
    rate: parseFloat(cheapestRate.amount),
    serviceLevel: cheapestRate.servicelevel?.name || cheapestRate.servicelevel?.token || 'USPS Standard',
    objectId: cheapestRate.objectId,
  };
}