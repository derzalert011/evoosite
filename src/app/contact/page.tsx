import Image from 'next/image';
import type { Metadata } from 'next';

import { ContactForm } from '@/features/contact/components/contact-form';

export const metadata: Metadata = {
  title: 'About Us - Angelica\'s Organic EVOO',
  description: 'Learn about Angelica\'s Organic EVOO and get in touch with us.',
};

export default function ContactPage() {
  return (
    <div className='fade-in'>
      {/* Hero Section */}
      <section className='relative text-white py-20 md:py-32 overflow-hidden'>
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
          <div className='absolute top-20 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl'></div>
          <div className='absolute bottom-20 left-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl'></div>
        </div>
        
        <div className='container-custom relative z-10 text-center'>
          <p className='text-gold-500 font-semibold mb-4 tracking-wide uppercase text-sm'>
            ABOUT US
          </p>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 uppercase tracking-wide'>
            A Family tradition bottled
          </h1>
        </div>
      </section>

      {/* About Us Section */}
      <section className='py-20 bg-cream-50'>
        <div className='container-custom'>
          <div className='grid md:grid-cols-2 gap-12 items-start'>
            <div className='relative'>
              <Image
                src='/products/olive tree.jpg'
                alt='Olive grove in California'
                width={600}
                height={600}
                className='w-full h-auto max-h-[600px] object-cover rounded-lg shadow-xl'
              />
            </div>
            <div>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Angelica's Olive Oil was born from a simple truth: the best meals aren't just made — they're shared. Inspired by our grandmother Angelica, who believed that food was love and olive oil was its soul, we set out to create an olive oil that honored her spirit and elevated everyday cooking.
              </p>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Our oil is made from 100% organic Arbequina olives, sustainably grown in the USA. Known for their smooth, fruity flavor and golden hue, Arbequina olives bring a delicate richness to every dish — whether drizzled over roasted vegetables, spooned onto crusty bread, or used to fry the perfect egg.
              </p>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                We don't take shortcuts. Our olives are harvested with care, cold-pressed for purity, and bottled with intention. Every drop of Angelica's is rich in antioxidants and polyphenols, and low in acidity — making it as nourishing as it is delicious.
              </p>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                At its heart, Angelica's is about more than olive oil. It's about preserving the legacy of food made with love. About gathering around the table. And about making even the simplest moments feel a little more special.
              </p>
              <p className='text-gray-600 leading-relaxed font-semibold'>
                From our kitchen to yours — salud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-20 bg-white'>
        <div className='container-custom'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div>
              <h2 className='text-3xl md:text-4xl font-extrabold uppercase text-navy-600 mb-6 tracking-wide'>
                Get in Touch
              </h2>
              <div className='w-24 h-1 bg-gold-500 mb-8'></div>
              <p className='text-gray-600 mb-8 leading-relaxed'>
                We'd love to hear from you! Whether you have questions about our oil,
                want to share a recipe, or just want to say hello — reach out anytime.
              </p>

              <div className='space-y-6'>
                <div>
                  <h4 className='font-bold text-navy-600 uppercase tracking-wide mb-2'>Email</h4>
                  <a href='mailto:hello@angelicas-evoo.com' className='text-gray-600 hover:text-navy-600 transition-colors'>
                    hello@angelicas-evoo.com
                  </a>
                </div>
                <div>
                  <h4 className='font-bold text-navy-600 uppercase tracking-wide mb-2'>Location</h4>
                  <p className='text-gray-600'>
                    Paso Robles, California<br />
                    <span className='text-sm text-gray-500'>Heart of California Wine Country</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}