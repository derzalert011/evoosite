'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/features/products/components/quantity-selector';
import { checkStock } from '@/features/products/controllers/check-stock';
import { createCheckoutAction } from '@/features/pricing/actions/create-checkout-action';
import type { Price, ProductWithPrices } from '@/features/pricing/types';

interface ProductCheckoutButtonProps {
  product: ProductWithPrices;
  price: Price | undefined;
  maxQuantity: number;
  stockCount: number;
}

export function ProductCheckoutButton({
  product,
  price,
  maxQuantity,
  stockCount,
}: ProductCheckoutButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!price) {
    return (
      <div className='text-red-600'>
        This product is not available for purchase at this time.
      </div>
    );
  }

  const handleCheckout = async () => {
    setError(null);

    // Check stock before proceeding
    const stockCheck = await checkStock(product.id, quantity);
    if (!stockCheck.available) {
      setError(stockCheck.error || 'Product is no longer available');
      return;
    }

    startTransition(async () => {
      try {
        await createCheckoutAction({ price, quantity, productId: product.id });
      } catch (err: any) {
        setError(err.message || 'Failed to start checkout. Please try again.');
      }
    });
  };

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <QuantitySelector
        min={1}
        max={maxQuantity}
        defaultValue={1}
        onQuantityChange={setQuantity}
        disabled={isPending || stockCount === 0}
      />
      {error && (
        <div className='text-red-600 text-sm bg-red-50 p-3 rounded-md w-full'>{error}</div>
      )}
      <button
        onClick={handleCheckout}
        disabled={isPending || stockCount === 0}
        className='btn-primary flex items-center gap-2 flex-1 justify-center'
      >
        {isPending ? 'Processing...' : 'Reserve a Bottle'}
      </button>
    </div>
  );
}