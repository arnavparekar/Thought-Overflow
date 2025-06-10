'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Blog } from '@/types/blog'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface BlogPostProps {
  blog: Blog
}

export default function BlogPost({ blog }: BlogPostProps) {
  const [likes, setLikes] = useState(blog.likes)
  const [reactions, setReactions] = useState(blog.reactions)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [])

  const handleLike = async () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    
    await supabase
      .from('blogs')
      .update({ likes: newLikes })
      .eq('id', blog.id)
  }

  const handleReaction = async (emoji: string) => {
    const newReactions = { ...reactions }
    newReactions[emoji] = (newReactions[emoji] || 0) + 1
    setReactions(newReactions)
    
    await supabase
      .from('blogs')
      .update({ reactions: newReactions })
      .eq('id', blog.id)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all"
        style={{ width: `${readingProgress}%` }}
      />
      
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal-border rounded-lg p-8"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 gradient-text">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-400 mb-4">
            <div className="flex items-center gap-4">
              <span>{formatDate(blog.published_at)}</span>
              <span>{blog.reading_time} min read</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                ❤️ {likes}
              </button>
              
              <div className="flex gap-2">
                {['👍', '🔥', '💯', '🚀'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {emoji} {reactions[emoji] || 0}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  )
}