import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { ProductWithPrices } from '../types';

export async function getProducts(): Promise<ProductWithPrices[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices', ascending: true });

  if (error) {
    console.error('Error fetching products:', error.message);
    console.error('Error details:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('No products found in database');
    return [];
  }

  // Filter out products without active prices on the client side
  const productsWithActivePrices = data
    .map((product) => ({
      ...product,
      prices: (product.prices || []).filter((price: any) => price.active === true),
    }))
    .filter((product) => product.prices.length > 0) as ProductWithPrices[];

  return productsWithActivePrices;
}
