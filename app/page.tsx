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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">$ echo "Welcome to DevBlog"</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Sharing code, insights, and the developer journey
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => filterByTag('all')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTag === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            all
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => filterByTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredBlogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </div>
  )
}