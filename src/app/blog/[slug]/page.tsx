import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/container';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} - Blog | Angelica's Organic EVOO`,
    description: `Read ${slug} on Angelica's Organic EVOO blog.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Placeholder - blog posts will be managed via separate admin dashboard
  // This structure is ready for future content management integration

  return (
    <div className='py-12 fade-in'>
      <div className='container-custom'>
        <article className='max-w-3xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-extrabold uppercase text-navy-600 mb-8 tracking-wide'>
            {slug.replace(/-/g, ' ')}
          </h1>
          <div className='text-gray-500 mb-8'>
            <time>Coming soon</time>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
            <p className='text-gray-500'>This blog post is not yet available. Check back soon!</p>
          </div>
        </article>
      </div>
    </div>
  );
}