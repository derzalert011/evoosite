import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/queries/blog';

type Props = {
  params: Promise<{ slug: string }>;
};

// Blog fetches from Supabase (cookies); must run at request time
export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title:
      post.meta_title ||
      `${post.title} | Angelica's Organic EVOO`,
    description: post.meta_description || post.excerpt || undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description:
        post.meta_description || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.published_at || undefined,
      images: post.featured_image_url
        ? [post.featured_image_url]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description:
        post.meta_description || post.excerpt || undefined,
      images: post.featured_image_url
        ? [post.featured_image_url]
        : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author_name || "Angelica's Kitchen",
    },
    publisher: {
      '@type': 'Organization',
      name: "Angelica's Organic Olive Oil",
    },
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <article className='py-12 fade-in'>
        <div className='container-custom max-w-4xl'>
          {/* Back link */}
          <Link
            href='/blog'
            className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className='mb-8'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              {post.title}
            </h1>

            {/* Meta info */}
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
              <span>
                {post.author_name || "Angelica's Kitchen"}
              </span>
              {post.published_at && (
                <>
                  <span>•</span>
                  <time dateTime={post.published_at}>
                    {formatDate(post.published_at)}
                  </time>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-4'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured image */}
          {post.featured_image_url && (
            <div className='relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8'>
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                className='object-cover'
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className='prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
