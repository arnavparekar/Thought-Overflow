import { notFound } from 'next/navigation'
import BlogPost from '@/components/BlogPost'
import { supabase } from '@/lib/supabase'
import { Blog } from '@/types/blog'

interface PageProps {
  params: { slug: string }
}

async function getBlog(slug: string): Promise<Blog | null> {
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()
  
  return data
}

export async function generateMetadata({ params }: PageProps) {
  const blog = await getBlog(params.slug)
  
  if (!blog) return { title: 'Blog Not Found' }
  
  return {
    title: blog.title,
    description: blog.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const blog = await getBlog(params.slug)
  
  if (!blog) {
    notFound()
  }
  
  return <BlogPost blog={blog} />
}