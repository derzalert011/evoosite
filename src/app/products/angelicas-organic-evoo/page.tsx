import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoCheckmark } from 'react-icons/io5';

import { BRAND_VOICE } from '@/lib/brand-config';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import { ProductGallery } from '@/features/products/components/product-gallery';
import { ProductDetails } from '@/features/products/components/product-details';
import { ProductDescription } from '@/features/products/components/product-description';
import { ProductCheckoutButton } from './product-checkout-button';

export const metadata: Metadata = {
  title: "Angelica's Organic EVOO - 100% Arbequina Olives | Premium Extra Virgin Olive Oil",
  description:
    "Ultra-premium organic extra virgin olive oil crafted from 100% Arbequina olives, grown organically in the USA. Low acidity (0.14%), high polyphenols (349). Only 60 bottles per harvest.",
  openGraph: {
    title: "Angelica's Organic EVOO - 100% Arbequina Olives",
    description:
      "Ultra-premium organic extra virgin olive oil crafted from 100% Arbequina olives, grown organically in the USA.",
    type: 'website',
    images: [
      {
        url: '/products/bottle front.jpg',
        width: 1200,
        height: 1200,
        alt: "Angelica's Organic Extra Virgin Olive Oil",
      },
    ],
  },
  alternates: {
    canonical: '/products/angelicas-organic-evoo',
  },
};

export default async function ProductPage() {
  let products: Awaited<ReturnType<typeof getProducts>>;
  
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    notFound();
  }

  const product = products[0]; // For now, we only have one product

  if (!product) {
    console.warn('No product found - products array:', products);
    notFound();
  }

  const metadata = productMetadataSchema.parse(product.metadata || {});
  const stockCount = metadata.stockCount ?? 0;
  const bottleSize = metadata.bottleSize || '500ml';
  const price = product.prices?.[0];
  const isOutOfStock = stockCount === 0;
  const maxQuantity = Math.min(stockCount, 20); // Max 20 bottles or stock limit

  // Product images - using images from public/products folder
  const productImages = [
    '/products/bottle front.jpg',
    '/products/bottle back.jpg',
    '/products/evoo shelf.jpg',
    '/products/evoo poor.jpg',
    '/products/olive oil.jpg',
  ].filter(Boolean);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || "Angelica's Organic Extra Virgin Olive Oil",
    description: product.description || BRAND_VOICE.identity.productName,
    image: productImages,
    brand: {
      '@type': 'Brand',
      name: "Angelica's",
    },
    offers: price
      ? {
          '@type': 'Offer',
          price: price.unit_amount ? (price.unit_amount / 100).toFixed(2) : '0',
          priceCurrency: price.currency?.toUpperCase() || 'USD',
          availability: isOutOfStock
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
          url: '/products/angelicas-organic-evoo',
        }
      : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className='py-12 fade-in'>
        <div className='container-custom'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <ol className='flex items-center gap-2 text-sm text-gray-500'>
              <li>
                <Link href='/' className='hover:text-navy-600'>
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className='text-navy-600 font-medium'>{product.name}</li>
            </ol>
          </nav>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Image Gallery */}
            <ProductGallery images={productImages} productName={product.name || 'EVOO'} />

            {/* Product Info */}
            <div className='lg:py-4'>
              <div className='mb-6'>
                <p className='text-gold-600 font-semibold mb-2 uppercase tracking-wide text-sm'>
                  Organic Extra Virgin
                </p>
                <h1 className='text-3xl md:text-4xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>
                  {product.name || "Angelica's Organic Extra Virgin Olive Oil"}
                </h1>
                {price && (
                  <p className='text-4xl font-bold text-navy-600 mb-4'>
                    ${((price.unit_amount || 0) / 100).toFixed(2)}
                  </p>
                )}
                <p className='text-gray-500'>500ml (16.9 fl oz) bottle</p>
              </div>

              <div className='mb-8'>
                <p className='text-gray-600 leading-relaxed'>
                  {product.description || BRAND_VOICE.productCharacteristics.tastingNotes.primary}
                </p>
              </div>

              <div className='bg-cream-100 rounded-lg p-6 mb-8'>
                <h3 className='font-bold uppercase text-navy-600 text-lg mb-4 tracking-wide'>Tasting Notes</h3>
                <p className='text-gray-600 italic'>
                  {BRAND_VOICE.productCharacteristics.tastingNotes.primary}
                </p>
              </div>

              {/* Chemical Characteristics */}
              <div className='grid grid-cols-3 gap-4 mb-8'>
                <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                  <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.acidity}</p>
                  <p className='text-sm text-gray-500'>Acidity</p>
                </div>
                <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                  <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.peroxides}</p>
                  <p className='text-sm text-gray-500'>Peroxides</p>
                </div>
                <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                  <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.polyphenols}</p>
                  <p className='text-sm text-gray-500'>Polyphenols</p>
                </div>
              </div>

              {/* Stock status */}
              <div className='mb-6'>
                {stockCount > 10 ? (
                  <p className='text-green-600 flex items-center gap-2 font-medium'>
                    <IoCheckmark className='w-5 h-5' /> In Stock
                  </p>
                ) : stockCount > 0 ? (
                  <p className='text-amber-600 font-medium'>Only {stockCount} left in stock</p>
                ) : (
                  <p className='text-red-600 font-medium'>Out of Stock</p>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              {!isOutOfStock && (
                <div className='mb-8'>
                  <ProductCheckoutButton
                    product={product}
                    price={price}
                    maxQuantity={maxQuantity}
                    stockCount={stockCount}
                  />
                </div>
              )}

              {/* Additional Info */}
              <div className='mt-8 pt-8 border-t border-navy-100 space-y-4 text-sm text-gray-600'>
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-cream-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <IoCheckmark className='w-4 h-4 text-navy-600' />
                  </div>
                  <p>Cold-pressed within 24 hours of harvest</p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-cream-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <IoCheckmark className='w-4 h-4 text-navy-600' />
                  </div>
                  <p>USDA Certified Organic</p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-cream-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <IoCheckmark className='w-4 h-4 text-navy-600' />
                  </div>
                  <p>Grown in California, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className='mt-16 pt-16 border-t border-navy-200'>
            <ProductDetails />
          </div>
        </div>
      </div>
    </>
  );
}