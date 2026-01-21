'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className='bg-navy-600 text-white sticky top-0 z-50 shadow-lg'>
      <div className='container-custom'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo */}
          <Logo variant='light' />

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8 uppercase text-sm font-semibold tracking-wide'>
            <Link
              href='/'
              className={`hover:text-gold-500 transition-colors ${
                isActive('/') ? 'text-gold-500' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href='/products/angelicas-organic-evoo'
              className={`hover:text-gold-500 transition-colors ${
                isActive('/products/angelicas-organic-evoo') ? 'text-gold-500' : ''
              }`}
            >
              Shop
            </Link>
            <Link
              href='/blog'
              className={`hover:text-gold-500 transition-colors ${
                pathname.startsWith('/blog') ? 'text-gold-500' : ''
              }`}
            >
              Blog
            </Link>
            <Link
              href='/contact'
              className={`hover:text-gold-500 transition-colors ${
                pathname === '/contact' ? 'text-gold-500' : ''
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className='hidden md:block'>
            <Link
              href='/products/angelicas-organic-evoo'
              className='btn-primary inline-flex items-center'
            >
              Reserve a Bottle
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger className='md:hidden p-2 hover:bg-navy-700 rounded-lg transition-colors'>
              {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </SheetTrigger>
            <SheetContent className='w-full bg-navy-600 text-white'>
              <SheetHeader>
                <Logo variant='light' />
                <SheetDescription className='py-8 flex flex-col gap-4 uppercase text-sm font-semibold tracking-wide'>
                  <Link
                    href='/'
                    className='hover:text-gold-500 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href='/products/angelicas-organic-evoo'
                    className='hover:text-gold-500 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href='/blog'
                    className='hover:text-gold-500 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href='/contact'
                    className='hover:text-gold-500 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href='/products/angelicas-organic-evoo'
                    className='btn-primary inline-flex items-center justify-center mt-4'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reserve a Bottle
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
