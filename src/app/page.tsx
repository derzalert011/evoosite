import Image from 'next/image';
import Link from 'next/link';
import { IoLeafOutline, IoMedalOutline, IoHeartOutline, IoArrowForward } from 'react-icons/io5';

import { BRAND_VOICE } from '@/lib/brand-config';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import { NewsletterSignup } from '@/features/newsletter/components/newsletter-signup';

export default async function HomePage() {
  const products = await getProducts();
  const product = products[0];

  return (
    <div className='fade-in'>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Product Showcase Section */}
      {product && <ProductShowcaseSection product={product} />}

      {/* About Section */}
      <AboutSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className='relative text-white overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/products/banner.jpg'
          alt=''
          fill
          className='object-cover'
          priority
        />
        {/* Dark overlay for text readability */}
        <div className='absolute inset-0 bg-navy-900/60'></div>
      </div>
      
      {/* Decorative blur elements */}
      <div className='absolute inset-0 opacity-20 z-0'>
        <div className='absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl'></div>
      </div>
      
      <div className='container-custom py-20 md:py-32 relative z-10'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <p className='text-gold-500 font-semibold mb-4 tracking-wide uppercase text-sm'>
              Premium Organic
            </p>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 uppercase tracking-wide'>
              Extra Virgin
              <span className='text-gold-500 block'>Olive Oil</span>
            </h1>
            <p className='text-lg text-white/90 mb-8 max-w-lg font-normal normal-case'>
              Crafted from 100% Arbequina olives grown in California's finest groves.
              Cold-pressed within hours of harvest for exceptional flavor and quality.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link href='/products/angelicas-organic-evoo' className='btn-primary inline-flex items-center gap-2'>
                Shop Now <IoArrowForward className='w-5 h-5' />
              </Link>
              <Link href='/contact' className='btn-outline border-white text-white hover:bg-white hover:text-navy-600'>
                Our Story
              </Link>
            </div>
          </div>
          <div className='relative flex justify-center'>
            <div className='w-64 h-80 md:w-80 md:h-96 bg-gradient-to-b from-gold-500/20 to-transparent rounded-full absolute blur-2xl'></div>
            <div className='relative'>
              <Image
                src='/products/evoo poor.jpg'
                alt="Angelica's Organic Extra Virgin Olive Oil being poured"
                width={384}
                height={512}
                className='w-72 md:w-96 h-auto rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='container-custom'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='text-center p-6'>
            <div className='w-16 h-16 bg-cream-50 rounded-full flex items-center justify-center mx-auto mb-4'>
              <IoLeafOutline className='w-8 h-8 text-navy-600' />
            </div>
            <h3 className='text-xl font-bold uppercase text-navy-600 mb-2 tracking-wide'>100% Organic</h3>
            <p className='text-gray-600 font-normal normal-case'>
              Certified organic Arbequina olives, grown without pesticides or chemicals.
            </p>
          </div>
          <div className='text-center p-6'>
            <div className='w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <IoMedalOutline className='w-8 h-8 text-gold-600' />
            </div>
            <h3 className='text-xl font-bold uppercase text-navy-600 mb-2 tracking-wide'>Award Winning</h3>
            <p className='text-gray-600 font-normal normal-case'>
              Recognized for exceptional quality with ultra-low acidity of just 0.14%.
            </p>
          </div>
          <div className='text-center p-6'>
            <div className='w-16 h-16 bg-cream-50 rounded-full flex items-center justify-center mx-auto mb-4'>
              <IoHeartOutline className='w-8 h-8 text-navy-600' />
            </div>
            <h3 className='text-xl font-bold uppercase text-navy-600 mb-2 tracking-wide'>Made with Love</h3>
            <p className='text-gray-600 font-normal normal-case'>
              Family tradition meets modern excellence in every bottle we produce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

async function ProductShowcaseSection({ product }: { product: any }) {
  const metadata = productMetadataSchema.parse(product.metadata || {});
  const price = product.prices?.[0];
  const stockCount = metadata.stockCount ?? 0;

  return (
    <section className='py-20 bg-cream-50'>
      <div className='container-custom'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='bg-white rounded-lg p-4 shadow-lg'>
            <Image
              src='/products/bottle back.jpg'
              alt={product.name}
              width={600}
              height={800}
              className='w-full h-auto rounded-lg'
            />
          </div>
          <div>
            <p className='text-gold-600 font-semibold mb-2 uppercase tracking-wide text-sm'>
              Featured Product
            </p>
            <h2 className='text-3xl md:text-4xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>
              {product.name || "Angelica's Organic Extra Virgin Olive Oil"}
            </h2>
            <p className='text-gray-600 mb-6 leading-relaxed font-normal normal-case'>
              {product.description || BRAND_VOICE.productCharacteristics.tastingNotes.primary}
            </p>

            <div className='grid grid-cols-3 gap-4 mb-8'>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.acidity}</p>
                <p className='text-sm text-gray-500 normal-case'>Acidity</p>
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.peroxides}</p>
                <p className='text-sm text-gray-500 normal-case'>Peroxides</p>
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm border border-navy-100'>
                <p className='text-2xl font-bold text-navy-600'>{BRAND_VOICE.productCharacteristics.chemicalProfile.polyphenols}</p>
                <p className='text-sm text-gray-500 normal-case'>Polyphenols</p>
              </div>
            </div>

            <div className='flex items-center gap-6 mb-8'>
              {price && (
                <>
                  <span className='text-4xl font-bold text-navy-600'>
                    ${((price.unit_amount || 0) / 100).toFixed(2)}
                  </span>
                  <span className='text-gray-500 normal-case'>500ml bottle</span>
                </>
              )}
            </div>

            <div className='flex flex-wrap gap-4'>
              <Link href='/products/angelicas-organic-evoo' className='btn-primary'>
                Reserve a Bottle
              </Link>
              <Link href='/products/angelicas-organic-evoo' className='btn-outline'>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className='py-20 bg-navy-600 text-white'>
      <div className='container-custom'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <Image
              src='/products/gma hands.jpg'
              alt="Grandmother Angelica's hands holding fresh olives"
              width={600}
              height={400}
              className='w-full h-auto rounded-lg shadow-xl'
            />
          </div>
          <div>
            <h2 className='text-3xl md:text-4xl font-extrabold uppercase text-gold-500 mb-6 tracking-wide'>
              A Family tradition bottled
            </h2>
            <div className='w-24 h-1 bg-gold-500 mb-8'></div>
            <p className='text-lg text-navy-100 mb-8 leading-relaxed font-normal normal-case'>
              Angelica's Olive Oil was born from a simple truth: the best meals aren't just made — they're shared. Inspired by our grandmother Angelica, who believed that food was love and olive oil was its soul, we set out to create an olive oil that honored her spirit and elevated everyday cooking.
            </p>
            <Link href='/contact' className='btn-primary inline-flex items-center gap-2'>
              Read Our Story <IoArrowForward className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <NewsletterSignup />
  );
}