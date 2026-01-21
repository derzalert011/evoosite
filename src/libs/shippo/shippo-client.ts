import shippo from 'shippo';

import { getEnvVar } from '@/utils/get-env-var';

let shippoClient: shippo.Shippo | null = null;

export function getShippoClient(): shippo.Shippo {
  if (!shippoClient) {
    const apiKey = getEnvVar(process.env.SHIPPO_API_KEY, 'SHIPPO_API_KEY');
    shippoClient = shippo({
      apiKeyToken: apiKey,
    });
  }
  
  return shippoClient;
}

export interface ShippingOrigin {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export function getShippingOrigin(): ShippingOrigin {
  return {
    name: getEnvVar(process.env.SHIPPO_ORIGIN_NAME, 'SHIPPO_ORIGIN_NAME'),
    street1: getEnvVar(process.env.SHIPPO_ORIGIN_STREET, 'SHIPPO_ORIGIN_STREET'),
    city: getEnvVar(process.env.SHIPPO_ORIGIN_CITY, 'SHIPPO_ORIGIN_CITY'),
    state: getEnvVar(process.env.SHIPPO_ORIGIN_STATE, 'SHIPPO_ORIGIN_STATE'),
    zip: getEnvVar(process.env.SHIPPO_ORIGIN_ZIP, 'SHIPPO_ORIGIN_ZIP'),
    country: process.env.SHIPPO_ORIGIN_COUNTRY || 'US',
  };
}