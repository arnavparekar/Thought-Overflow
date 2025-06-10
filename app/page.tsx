'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import { Blog } from '@/types/blog'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false })
    
    if (data) {
      setBlogs(data)
      setFilteredBlogs(data)
      
      const tags = Array.from(new Set(data.flatMap(blog => blog.tags)))
      setAllTags(tags)
    }
  }

  const filterByTag = (tag: string) => {
    setSelectedTag(tag)
    if (tag === 'all') {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.tags.includes(tag)))
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="gradient-text">Welcome to DevBlog</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sharing insights, code adventures, and the journey of building amazing things
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center gap-4"
        >
          <div className="px-4 py-2 bg-slate-800/50 rounded-full text-emerald-400 font-mono text-sm border border-slate-700/50">
            💻 Code
          </div>
          <div className="px-4 py-2 bg-slate-800/50 rounded-full text-blue-400 font-mono text-sm border border-slate-700/50">
            🚀 Learn
          </div>
          <div className="px-4 py-2 bg-slate-800/50 rounded-full text-purple-400 font-mono text-sm border border-slate-700/50">
            🌟 Share
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => filterByTag('all')}
            className={`tag-chip ${
              selectedTag === 'all'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : ''
            }`}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => filterByTag(tag)}
              className={`tag-chip ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white border-blue-500'
                  : ''
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No posts found</h3>
          <p className="text-slate-500">Try adjusting your filter or check back later!</p>
        </motion.div>
      )}
    </div>
  )
}