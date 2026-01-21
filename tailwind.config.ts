import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Brand colors from project_atom
        brand: {
          navy: '#001b71',
          yellow: '#f7d63a',
          burgundy: '#a42325',
        },
        cream: {
          50: '#fdf9eb',
          100: '#faf5e0',
          200: '#f5eed0',
        },
        navy: {
          50: '#e6e9f2',
          100: '#ccd3e5',
          200: '#99a7cb',
          300: '#667bb1',
          400: '#334f97',
          500: '#00237d',
          600: '#001b71',
          700: '#00155a',
          800: '#001044',
          900: '#000a2d',
        },
        gold: {
          50: '#fefcf0',
          100: '#fdf9e1',
          200: '#fbf3c3',
          300: '#f9eca5',
          400: '#f8e26e',
          500: '#f7d63a',
          600: '#e5c320',
          700: '#b89a19',
          800: '#8a7313',
          900: '#5c4d0d',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
        alt: ['var(--font-montserrat-alternates)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
