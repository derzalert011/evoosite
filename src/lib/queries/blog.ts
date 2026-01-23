import { createSupabaseServerClient as createClient } from '@/libs/supabase/supabase-server-client';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  category: 'recipe' | 'article' | 'story' | 'news';
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  author_name: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function getPostsByCategory(
  category: BlogPost['category']
): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }

  return data || [];
}
