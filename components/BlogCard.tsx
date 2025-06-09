'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Blog } from '@/types/blog'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  blog: Blog
  index: number
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="terminal-border rounded-lg p-6 hover:border-blue-500/50 transition-all"
    >
      <Link href={`/blog/${blog.slug}`}>
        <h2 className="text-xl font-bold mb-2 gradient-text hover:text-blue-400">
          {blog.title}
        </h2>
        <p className="text-gray-400 mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>{formatDate(blog.published_at)}</span>
            <span>{blog.reading_time} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <span>❤️ {blog.likes}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}