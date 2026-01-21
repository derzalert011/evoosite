import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Blog - Recipes & Stories | Angelica\'s Organic EVOO',
  description: 'Read recipes, stories, and insights about olive oil from Angelica\'s Organic EVOO.',
  openGraph: {
    title: 'Blog - Recipes & Stories | Angelica\'s Organic EVOO',
    description: 'Read recipes, stories, and insights about olive oil from Angelica\'s Organic EVOO.',
    type: 'website',
  },
};

export default function BlogPage() {
  // For now, this is a placeholder structure ready for future blog posts
  // Blog posts will be managed via separate admin dashboard and agent

  return (
    <div className='py-12 fade-in'>
      <div className='container-custom'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>
            Blog
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Recipes, stories, and tips about premium olive oil
          </p>
        </div>

        {/* Placeholder for future blog posts */}
        <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
          <p className='text-gray-500 text-lg'>No blog posts found.</p>
          <p className='text-sm text-gray-400 mt-2'>
            We're working on bringing you recipes, stories, and insights about our olive oil journey.
          </p>
        </div>
      </div>
    </div>
  );
}