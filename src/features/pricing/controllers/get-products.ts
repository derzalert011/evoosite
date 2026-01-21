import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { ProductWithPrices } from '../types';

export async function getProducts(): Promise<ProductWithPrices[]> {
  const supabase = await createSupabaseServerClient();

  // Simplified query without ordering by metadata (which might be null)
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true);

  if (error) {
    console.error('Error fetching products:', error.message);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('No products found in database');
    return [];
  }

  // Filter out products without active prices on the client side
  const productsWithActivePrices: ProductWithPrices[] = (data as any[])
    .map((product: any) => {
      const filteredPrices = (product.prices || []).filter((price: any) => price?.active === true);
      return {
        ...product,
        prices: filteredPrices,
      } as ProductWithPrices;
    })
    .filter((product: ProductWithPrices) => product.prices.length > 0)
    // Sort by metadata index if available, otherwise by name
    .sort((a, b) => {
      const aIndex = (a.metadata as any)?.index ?? 999;
      const bIndex = (b.metadata as any)?.index ?? 999;
      if (aIndex !== bIndex) return aIndex - bIndex;
      return (a.name || '').localeCompare(b.name || '');
    });

  return productsWithActivePrices;
}
