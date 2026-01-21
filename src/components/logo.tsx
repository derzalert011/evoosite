import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
}

export function Logo({ variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  const logoSrc = '/logo/icon.png';
  const textColor = isLight ? 'text-white' : 'text-navy-600';

  return (
    <Link href='/' className='flex w-fit items-center gap-3'>
      <Image
        src={logoSrc}
        alt="Angelica's Organic EVOO logo"
        width={isLight ? 56 : 48}
        height={isLight ? 56 : 48}
        priority
        quality={100}
        className='h-12 md:h-14 w-auto'
      />
    </Link>
  );
}
