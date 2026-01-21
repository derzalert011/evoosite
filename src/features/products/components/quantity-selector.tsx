'use client';

import { useState } from 'react';
import { IoRemove, IoAdd } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface QuantitySelectorProps {
  min?: number;
  max: number;
  defaultValue?: number;
  onQuantityChange?: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  min = 1,
  max,
  defaultValue = 1,
  onQuantityChange,
  disabled = false,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    onQuantityChange?.(clampedValue);
  };

  return (
    <div className='flex items-center border border-navy-200 rounded'>
      <button
        type='button'
        onClick={handleDecrement}
        disabled={quantity <= min || disabled}
        className='p-3 hover:bg-cream-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <IoRemove className='w-5 h-5 text-navy-600' />
      </button>
      <span className='w-12 text-center font-medium'>{quantity}</span>
      <button
        type='button'
        onClick={handleIncrement}
        disabled={quantity >= max || disabled}
        className='p-3 hover:bg-cream-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <IoAdd className='w-5 h-5 text-navy-600' />
      </button>
    </div>
  );
}