'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className='aspect-square bg-gray-200 rounded-lg flex items-center justify-center'>
        <span className='text-gray-400'>No images available</span>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='space-y-4'>
      {/* Main image with navigation arrows */}
      <div className='relative bg-white rounded-lg overflow-hidden shadow-lg aspect-square'>
        <Image
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className='object-cover'
          priority={selectedImage === 0}
          sizes='(max-width: 768px) 100vw, 50vw'
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors'
              aria-label='Previous image'
            >
              <IoChevronBack className='w-6 h-6 text-navy-600' />
            </button>
            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors'
              aria-label='Next image'
            >
              <IoChevronForward className='w-6 h-6 text-navy-600' />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail grid */}
      {images.length > 1 && (
        <div className='flex gap-3 justify-center'>
          {images.map((image, index) => (
            <button
              key={index}
              type='button'
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? 'border-navy-600'
                  : 'border-transparent hover:border-navy-300'
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={64}
                height={64}
                className='w-full h-full object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}