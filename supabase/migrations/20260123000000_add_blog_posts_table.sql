/**
 * BLOG_POSTS
 * Stores blog posts for the website. Posts can be created as drafts,
 * reviewed, and published. Designed to work with AI-generated content
 * that gets reviewed before publishing.
 */

-- Create enum for post status
create type post_status as enum ('draft', 'pending_review', 'published', 'archived');

-- Create enum for post category
create type post_category as enum ('recipe', 'article', 'story', 'news');

create table blog_posts (
  -- Primary key
  id uuid not null primary key default gen_random_uuid(),
  
  -- URL-friendly slug (must be unique)
  slug text not null unique,
  
  -- Post content
  title text not null,
  excerpt text, -- Short summary for previews and SEO meta description
  content text not null, -- Rich text HTML content
  featured_image_url text, -- Hero image
  
  -- Categorization
  category post_category not null default 'article',
  tags text[] default '{}', -- Array of tags for filtering
  
  -- SEO fields
  meta_title text, -- Custom SEO title (falls back to title if null)
  meta_description text, -- Custom meta description (falls back to excerpt if null)
  
  -- Status and workflow
  status post_status not null default 'draft',
  
  -- Authorship (nullable - AI-generated posts may not have an author)
  author_id uuid references auth.users,
  author_name text, -- Display name (can be "Angelica's Kitchen" for AI posts)
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone, -- When the post went live
  
  -- Agent metadata (for tracking AI-generated content)
  generated_by_agent boolean default false,
  agent_run_id uuid -- Reference to agent run (will link to agent_runs table later)
);

-- Enable RLS
alter table blog_posts enable row level security;

-- Public can read published posts
create policy "Public can view published posts" 
  on blog_posts for select 
  using (status = 'published');

-- Authenticated users can do everything (admin access)
create policy "Authenticated users have full access" 
  on blog_posts for all 
  using (auth.role() = 'authenticated');

-- Create indexes for common queries
create index blog_posts_slug_idx on blog_posts(slug);
create index blog_posts_status_idx on blog_posts(status);
create index blog_posts_category_idx on blog_posts(category);
create index blog_posts_published_at_idx on blog_posts(published_at desc);

-- Function to auto-update updated_at timestamp
create or replace function update_blog_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger blog_posts_updated_at
  before update on blog_posts
  for each row
  execute function update_blog_posts_updated_at();

-- Function to auto-set published_at when status changes to published
create or replace function set_blog_posts_published_at()
returns trigger as $$
begin
  if new.status = 'published' and old.status != 'published' then
    new.published_at = timezone('utc'::text, now());
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-set published_at
create trigger blog_posts_set_published_at
  before update on blog_posts
  for each row
  execute function set_blog_posts_published_at();
