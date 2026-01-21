'use server';

import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';

export async function checkStock(productId: string, requestedQuantity: number): Promise<{
  available: boolean;
  stockCount?: number;
  error?: string;
}> {
  if (requestedQuantity <= 0) {
    return { available: false, error: 'Quantity must be greater than 0' };
  }

  if (requestedQuantity > 20) {
    return { available: false, error: 'Maximum order quantity is 20 bottles' };
  }

  const products = await getProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return { available: false, error: 'Product not found' };
  }

  const metadata = productMetadataSchema.parse(product.metadata || {});
  const stockCount = metadata.stockCount ?? 0;

  if (stockCount === 0) {
    return { available: false, stockCount: 0, error: 'Product is out of stock' };
  }

  if (stockCount < requestedQuantity) {
    return {
      available: false,
      stockCount,
      error: `Only ${stockCount} bottle${stockCount === 1 ? '' : 's'} available`,
    };
  }

  return { available: true, stockCount };
}