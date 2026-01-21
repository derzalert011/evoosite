import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';

import { Navigation } from './navigation';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alternates',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Angelica's Organic EVOO - Premium Extra Virgin Olive Oil",
  description:
    "Ultra-premium organic extra virgin olive oil crafted from 100% Arbequina olives, grown organically in the USA. Only 60 bottles per harvest. From our kitchen to yours — salud",
  keywords: ['organic olive oil', 'extra virgin olive oil', 'Arbequina olives', 'premium olive oil', 'artisan olive oil'],
};

export default function RootLayout({ children }: PropsWithChildren) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang='en'>
      <head>
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={cn('font-sans antialiased', montserrat.variable, montserratAlternates.variable)}>
        <div className='min-h-screen flex flex-col'>
          <Navigation />
          <main className='flex-grow'>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-navy-600 text-white'>
      <div className='container-custom py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='md:col-span-2'>
            <Link href='/'>
              <Image
                src='/logo/Angelicas Olive Oil 2.png'
                alt="Angelica's Olive Oil"
                width={200}
                height={80}
                className='h-auto w-auto max-w-[200px]'
                priority
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-bold uppercase text-gold-500 text-sm tracking-wide mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-navy-200 hover:text-white transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/products/angelicas-organic-evoo'
                  className='text-navy-200 hover:text-white transition-colors'
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link href='/blog' className='text-navy-200 hover:text-white transition-colors'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-navy-200 hover:text-white transition-colors'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-bold uppercase text-gold-500 text-sm tracking-wide mb-4'>
              Contact
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/contact' className='text-navy-200 hover:text-white transition-colors'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-12 pt-8 border-t border-navy-500 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-navy-200 text-sm'>
            &copy; {currentYear} Pazos Foods LLC. All Rights Reserved
          </p>
          <div className='flex items-center gap-4'>
            <Link href='/privacy-policy' className='text-navy-300 hover:text-white text-sm transition-colors'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
