import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, type BlogPost } from '@/lib/queries/blog';

export const metadata: Metadata = {
  title: "Blog - Recipes & Stories | Angelica's Organic EVOO",
  description:
    "Read recipes, stories, and insights about olive oil from Angelica's Organic EVOO.",
  openGraph: {
    title: "Blog - Recipes & Stories | Angelica's Organic EVOO",
    description:
      "Read recipes, stories, and insights about olive oil from Angelica's Organic EVOO.",
    type: 'website',
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getCategoryLabel(category: BlogPost['category']): string {
  const labels = {
    recipe: 'Recipe',
    article: 'Article',
    story: 'Story',
    news: 'News',
  };
  return labels[category];
}

function getCategoryColor(category: BlogPost['category']): string {
  const colors = {
    recipe: 'bg-green-100 text-green-800',
    article: 'bg-blue-100 text-blue-800',
    story: 'bg-purple-100 text-purple-800',
    news: 'bg-yellow-100 text-yellow-800',
  };
  return colors[category];
}

// Blog fetches from Supabase (cookies); must run at request time
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPublishedPosts();

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

        {posts.length === 0 ? (
          /* Empty state */
          <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
            <p className='text-gray-500 text-lg'>No blog posts found.</p>
            <p className='text-sm text-gray-400 mt-2'>
              We&apos;re working on bringing you recipes, stories, and insights
              about our olive oil journey.
            </p>
          </div>
        ) : (
          /* Blog post grid */
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <article
                key={post.id}
                className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Featured image */}
                  {post.featured_image_url ? (
                    <div className='relative h-48 w-full'>
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <div className='h-48 w-full bg-gradient-to-br from-yellow-100 to-green-100 flex items-center justify-center'>
                      <span className='text-4xl'>🫒</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className='p-6'>
                    {/* Category badge */}
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-3 ${getCategoryColor(post.category)}`}
                    >
                      {getCategoryLabel(post.category)}
                    </span>

                    {/* Title */}
                    <h2 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2'>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <span>
                        {post.author_name || "Angelica's Kitchen"}
                      </span>
                      {post.published_at && (
                        <time dateTime={post.published_at}>
                          {formatDate(post.published_at)}
                        </time>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
