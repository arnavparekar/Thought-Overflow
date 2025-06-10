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
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="card-gradient rounded-2xl p-6 h-full hover:glow-effect transition-all duration-300">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-800/80 text-slate-300 rounded-md text-xs font-medium border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 text-slate-500 text-xs">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                📅 {formatDate(blog.published_at)}
              </span>
              <span className="flex items-center gap-1">
                ⏱️ {blog.reading_time} min
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-red-400">
                ❤️ {blog.likes}
              </span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}